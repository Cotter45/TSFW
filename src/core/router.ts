import { Logger } from "./logger";
import type { RoutePaths } from "./routes";
import { createState, createPersistentState, storageTypes } from "./state";
import { updateMeta } from "./utils";

const logger = new Logger("TSFW Router");

export let notFoundComponent: () => HTMLElement = () => {
	const notFoundElement = document.createElement("div");
	notFoundElement.innerHTML =
		"<h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p>";
	return notFoundElement;
};

type CacheType = (typeof storageTypes)[number];

type LoaderFunction<T> = (
	params?: Record<string, string>,
	query?: URLSearchParams,
	signal?: AbortSignal,
) => Promise<T>;

export interface TSFWProps<
	Params extends Record<string, any> | null = Record<string, string>,
	SearchParams extends URLSearchParams | null = URLSearchParams,
	Data = any | null,
> {
	params: Params;
	searchParams: SearchParams;
	data: Data;
	error: Error | null;
}

type SyncComponent = (props: TSFWProps) => HTMLElement;

type AsyncComponent = (
	props: TSFWProps & { signal?: AbortSignal },
) => Promise<HTMLElement | { default: HTMLElement | SyncComponent } | any>;

interface Route<T = any> {
	component: SyncComponent | AsyncComponent;
	loader?: LoaderFunction<T>;
	fallback?: SyncComponent | AsyncComponent;
	cacheLoader?: CacheType;
	cacheKey?: string;
	ttl?: number;
	pathPattern: RegExp;
	paramNames: string[];
	parentComponent?: SyncComponent | AsyncComponent;
	meta?:
		| Record<string, string>
		| ((ctx: {
				params: Record<string, string>;
				data: T;
		  }) => Record<string, string>);
}

export const routes: Route[] = [];
export let rootElement: HTMLElement;

let activeRouteController: AbortController | null = null;

export function initRouter(root: HTMLElement) {
	rootElement = root;
	window.addEventListener("popstate", handleRoute);
	handleRoute();
}

export const routerState = createState<{ path: RoutePaths }>("route", {
	path: "/",
});

interface RegisterRouteOptions<T = any> {
	path: string;
	component: SyncComponent | AsyncComponent;
	loader?: LoaderFunction<T>;
	fallback?: SyncComponent | AsyncComponent;
	cacheLoader?: CacheType;
	cacheKey?: string;
	ttl?: number;
	children?: RegisterRouteOptions[];
	meta?:
		| Record<string, string>
		| ((ctx: {
				params: Record<string, string>;
				data: T;
		  }) => Record<string, string>);
}

const invalidPathCharacters = /[^a-zA-Z0-9_/:-]/g;

export function registerRoutes<T>(
	{
		path,
		component,
		loader,
		fallback,
		cacheLoader = "none",
		cacheKey = path,
		ttl = 60000, // Default TTL of 1 minute
		children = [],
		meta = {},
	}: RegisterRouteOptions<T>,
	parentPath = "",
	parentComponent?: SyncComponent | AsyncComponent,
) {
	if (
		!path ||
		typeof path !== "string" ||
		!path.startsWith("/") ||
		path.endsWith(":")
	) {
		throw new Error(`Invalid path: ${path}`);
	}

	if (invalidPathCharacters.test(path)) {
		throw new Error(`Invalid path: ${path}`);
	}

	if (!component || typeof component !== "function") {
		throw new Error(`Invalid component: ${component}`);
	}

	if (fallback && typeof fallback !== "function") {
		throw new Error(`Invalid fallback component: ${fallback}`);
	}

	if (loader && typeof loader !== "function") {
		throw new Error(`Invalid loader function: ${loader}`);
	}

	if (cacheLoader && typeof cacheLoader !== "string") {
		throw new Error(`Invalid cache loader type: ${cacheLoader}`);
	}

	if (!storageTypes.includes(cacheLoader)) {
		throw new Error(`Invalid cache loader type: ${cacheLoader}`);
	}

	if (cacheKey && typeof cacheKey !== "string") {
		throw new Error(`Invalid cache key: ${cacheKey}`);
	}

	if (ttl && typeof ttl !== "number") {
		throw new Error(`Invalid TTL: ${ttl}`);
	}

	if (ttl && ttl < 0) {
		throw new Error(`Invalid TTL: ${ttl}`);
	}

	const fullPath = `${parentPath}${path}`
		.replace(/\/+/g, "/")
		.replaceAll("//", "/");

	const { pathPattern, paramNames } = generatePathPattern(fullPath);

	const route: Route<T> = {
		component,
		loader,
		fallback,
		cacheLoader,
		cacheKey: cacheKey.replaceAll("//", "/"),
		ttl,
		pathPattern: parentComponent ? pathPattern : /^$/,
		paramNames,
		parentComponent,
		meta,
	};

	routes.push(route);

	for (const child of children) {
		registerRoutes(
			{
				...child,
				cacheKey:
					child.cacheKey || `${fullPath}${child.path}`.replaceAll("//", "/"),
			},
			fullPath,
			component,
		);
	}
}

export function setNotFoundComponent(component: () => HTMLElement) {
	notFoundComponent = component;
}

export function generatePathPattern(path: string) {
	const paramNames: string[] = [];
	const pathPattern = new RegExp(
		`${path.replace(/:([^/]+)/g, (_, paramName) => {
			paramNames.push(paramName);
			return "([^/]+)";
		})}$`,
	);
	return { pathPattern, paramNames };
}

export function resolvePath(
	path: string,
	params: Record<string, string>,
): string {
	return path.replace(/:([^/]+)/g, (_, key) => params[key] || "");
}

export function navigateTo(
	path: RoutePaths,
	params: Record<string, string> = {},
	searchParams: Record<string, string> = {},
	scrollTop = true,
) {
	const resolvedPath = resolvePath(path, params);
	const query = new URLSearchParams(searchParams).toString();
	const fullPath = query ? `${resolvedPath}?${query}` : resolvedPath;

	window.history.pushState({}, "", fullPath);
	handleRoute();

	window.dispatchEvent(new CustomEvent("routechange", { detail: fullPath }));

	if (scrollTop) {
		window.scrollTo(0, 0);
	}
}

export async function handleRoute() {
	if (activeRouteController) activeRouteController.abort();
	activeRouteController = new AbortController();

	const { signal } = activeRouteController;

	let path = window.location.pathname;
	if (path.length > 1 && path.endsWith("/")) {
		path = path.slice(0, -1);
	}
	const searchParams = new URLSearchParams(window.location.search);

	for (const route of routes) {
		const match = path.match(route.pathPattern);
		if (match) {
			const params = route.paramNames.reduce(
				(acc, name, index) => {
					acc[name] = match[index + 1];
					return acc;
				},
				{} as Record<string, string>,
			);

			if (route.meta && typeof route.meta === "object") {
				updateMeta(route.meta);
			}

			await renderRouteHierarchy(route, searchParams, params, signal);
			return;
		}
	}

	const rootRoute = routes.find(
		(route) =>
			route.pathPattern.source === "^$" ||
			route.pathPattern.source === "^(/)?$",
	);

	if (path === "/" && rootRoute) {
		await renderRouteHierarchy(rootRoute, searchParams, {}, signal);
		return;
	}

	await render(notFoundComponent, false, {
		params: {},
		searchParams,
		data: null,
		error: null,
	});
}

export async function renderRouteHierarchy(
	route: Route,
	searchParams: URLSearchParams,
	params: Record<string, string>,
	signal: AbortSignal,
) {
	const routeHierarchy: Route[] = [];
	let currentRoute: Route | undefined = route;

	if (signal.aborted) {
		return;
	}

	if (!isInitialRender) {
		rootElement.style.opacity = "0";

		const { component, loader, fallback, cacheLoader, cacheKey, ttl } = route;

		const cacheState = await getCacheState(
			cacheKey || route.pathPattern.source,
			cacheLoader!,
		);
		let data = cacheState.getState().data;

		if (fallback && !data) {
			await render(fallback, true, {
				params,
				searchParams,
				data: null,
				error: null,
				signal,
			});
		}

		if (loader && !data) {
			const isExpired = data && cacheState.getState().expires < Date.now();
			if (!data || isExpired) {
				try {
					data = await loader(params, searchParams, signal);
					cacheState.setState({
						data,
						error: null,
						expires: Date.now() + (ttl || 60000),
					});
				} catch (err) {
					if (signal.aborted) {
						return;
					}
					logger.error("Error loading data:", err);
					cacheState.setState({
						data: null,
						error: err as Error,
					});
					return;
				}
			}
		}

		const finalState = cacheState.getState();
		await render(component, true, {
			params,
			searchParams,
			data: finalState.data,
			error: finalState.error,
			signal,
		});

		if (typeof route.meta === "function") {
			updateMeta(route.meta({ params, data }));
		}

		rootElement.style.opacity = "1";
	}

	while (currentRoute) {
		routeHierarchy.unshift(currentRoute);
		currentRoute = routes.find(
			(r) => r.component === currentRoute?.parentComponent,
		);
	}

	let outletElement: HTMLElement | null = rootElement;

	rootElement.style.opacity = "0";

	for (const currentRoute of routeHierarchy) {
		const { component, loader, fallback, cacheLoader, cacheKey, ttl } =
			currentRoute;

		const cacheState = await getCacheState(
			cacheKey || route.pathPattern.source,
			cacheLoader!,
		);
		let data = cacheState.getState().data;

		if (fallback && !data) {
			await render(fallback, outletElement !== rootElement, {
				params,
				searchParams,
				data: null,
				error: null,
				signal,
			});
		}

		if (loader && !data) {
			const isExpired = data && cacheState.getState().expires < Date.now();
			if (!data || isExpired) {
				try {
					data = await loader(params, searchParams, signal);
					cacheState.setState({
						data,
						error: null,
						expires: Date.now() + (ttl || 60000),
					});
				} catch (err) {
					if (signal.aborted) {
						return;
					}
					logger.error("Error loading data:", err);
					cacheState.setState({
						data: null,
						error: err as Error,
					});
					return;
				}
			}
		}

		const finalState = cacheState.getState();
		await render(component, outletElement !== rootElement, {
			params,
			searchParams,
			data: finalState.data,
			error: finalState.error,
			signal,
		});

		const outlets = outletElement?.querySelectorAll("[data-outlet]");
		if (outlets && outlets.length > 0) {
			outletElement = outlets[outlets.length - 1] as HTMLElement;
		} else {
			outletElement = null;
		}

		if (typeof route.meta === "function") {
			updateMeta(route.meta({ params, data }));
		}
	}

	rootElement.style.opacity = "1";

	setTimeout(() => {
		routerState.setState({ path: window.location.pathname as RoutePaths });
	}, 0);
}

export async function resolveComponent(
	component: SyncComponent | AsyncComponent,
	props: {
		params: Record<string, string>;
		searchParams: URLSearchParams;
		data: any;
		error: Error | null;
		signal?: AbortSignal;
	},
): Promise<HTMLElement> {
	try {
		const result =
			typeof component === "function" ? await component(props) : component;

		if (result instanceof HTMLElement) return result;

		if (result && typeof result === "object" && "default" in result) {
			const defaultExport = result.default;

			if (typeof defaultExport === "function") {
				const element = defaultExport(props);
				if (!(element instanceof HTMLElement)) {
					throw new Error(
						"The default export function did not return a valid HTMLElement.",
					);
				}
				return element;
			} else if (defaultExport instanceof HTMLElement) {
				return defaultExport;
			} else {
				throw new Error(
					"Default export must be an HTMLElement or a function returning HTMLElement.",
				);
			}
		}

		throw new Error(
			"Component must return an HTMLElement, an object with a default export, or a function returning an HTMLElement.",
		);
	} catch (error) {
		throw new Error(
			`Error resolving component: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);
	}
}

let isInitialRender = true;

export function setInitialRender(value: boolean) {
	isInitialRender = value;
}

export async function render(
	component: SyncComponent | AsyncComponent | (() => HTMLElement),
	isChild: boolean,
	props: {
		params: Record<string, string>;
		searchParams: URLSearchParams;
		data: any;
		error: Error | null;
		signal?: AbortSignal;
	},
) {
	const renderContent = async () => {
		const element = await resolveComponent(component, { ...props });
		if (props.signal?.aborted) return;

		if (isChild) {
			const outlets = rootElement.querySelectorAll("[data-outlet]");
			const lastOutlet = outlets[outlets.length - 1];

			if (lastOutlet) {
				lastOutlet.innerHTML = "";
				lastOutlet.appendChild(element);
			} else {
				if (!rootElement) {
					throw new Error("Root element not found.");
				}

				if (rootElement) {
					rootElement.innerHTML = "";
					rootElement.appendChild(element);
				}
			}
		} else if (isInitialRender) {
			if (!rootElement) {
				const tryForRoot = document.getElementById("app");

				if (tryForRoot) {
					rootElement = tryForRoot;
				} else {
					rootElement = document.body;
				}

				if (!rootElement) {
					throw new Error("Root element not found.");
				}
			} else {
				rootElement.innerHTML = "";
				rootElement.appendChild(element);
			}
		}
	};

	if (isInitialRender) {
		await renderContent();
		isInitialRender = false;
	} else if (document.startViewTransition) {
		document.startViewTransition(() => renderContent());
	} else {
		fallbackRender(component, isChild, props);
	}
}

export function fallbackRender(
	component: SyncComponent | AsyncComponent | (() => HTMLElement),
	isChild: boolean,
	props: {
		params: Record<string, string>;
		searchParams: URLSearchParams;
		data: any;
		error: Error | null;
		signal?: AbortSignal;
	},
) {
	resolveComponent(component, { ...props })
		.then((element) => {
			if (props.signal?.aborted) return;

			if (isChild) {
				const outlets = rootElement.querySelectorAll("[data-outlet]");
				const lastOutlet = outlets[outlets.length - 1];

				if (lastOutlet) {
					lastOutlet.innerHTML = "";
					lastOutlet.appendChild(element);
				}
			} else if (isInitialRender) {
				rootElement.innerHTML = "";
				rootElement.appendChild(element);
			}
		})
		.catch((error) => {
			if (props.signal?.aborted) {
				// Do nothing
			} else {
				logger.error("Fallback render error:", error);
			}
		});
}

export async function getCacheState<T>(key: string, cacheType: CacheType) {
	switch (cacheType) {
		case "memory":
			return createState<{
				data: T | null;
				expires: number;
				error: Error | null;
			}>(key, { data: null, expires: 0, error: null });
		case "local":
			return createPersistentState<{
				data: T | null;
				expires: number;
				error: Error | null;
			}>(key, "local", {
				data: null as T | null,
				expires: 0,
				error: null,
			});
		case "session":
			return createPersistentState<{
				data: T | null;
				expires: number;
				error: Error | null;
			}>(key, "session", {
				data: null as T | null,
				expires: 0,
				error: null,
			});
		case "idb":
			return createPersistentState<{
				data: T | null;
				expires: number;
				error: Error | null;
			}>(key, "idb", { data: null, expires: 0, error: null });
		default:
			return createState<{
				data: T | null;
				expires: number;
				error: Error | null;
			}>(key, { data: null, expires: 0, error: null });
	}
}
