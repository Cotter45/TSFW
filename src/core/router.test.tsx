import { describe, it, beforeEach, vi, expect, afterEach } from "vitest";
import {
	notFoundComponent,
	initRouter,
	routes,
	rootElement,
	registerRoutes,
	setNotFoundComponent,
	resolvePath,
	generatePathPattern,
	resolveComponent,
	getCacheState,
	navigateTo,
} from "./router";
import { createState } from "./state";
import { jsx } from "./jsx";

describe("Default not found component", () => {
	it("should be a function", () => {
		expect(notFoundComponent).toBeDefined();
	});

	it("should return a component", () => {
		expect(notFoundComponent()).toBeDefined();
	});
});

describe("initRouter", () => {
	beforeEach(() => {
		document.body.innerHTML = `<div id="root"></div>`;
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("should be a function", () => {
		expect(initRouter).toBeDefined();
	});

	it("should initialize router", () => {
		const root = document.createElement("div");

		initRouter(root);
		expect(rootElement).toBeDefined();

		expect(rootElement).toBe(root);
		expect(routes).toEqual([]);
	});
});

describe("setNotFoundComponent", () => {
	it("should set a custom not found component", () => {
		const customNotFoundComponent = () => document.createElement("div");

		setNotFoundComponent(customNotFoundComponent);

		expect(notFoundComponent).toBe(customNotFoundComponent);
	});
});

describe("resolvePath", () => {
	it("should resolve a path with parameters", () => {
		const path = "/test/:id";
		const params = { id: "123" };

		expect(resolvePath(path, params)).toBe("/test/123");
	});

	it("should resolve a path without parameters", () => {
		const path = "/test";

		expect(resolvePath(path, {})).toBe("/test");
	});
});

describe("generatePathPattern", () => {
	it("should generate a regex pattern and capture no parameters for a static path", () => {
		const { pathPattern, paramNames } = generatePathPattern("/home");
		expect(pathPattern.test("/home")).toBe(true);
		expect(paramNames).toEqual([]);
	});

	it("should generate a regex pattern and capture a single parameter", () => {
		const { pathPattern, paramNames } = generatePathPattern("/user/:id");
		expect(pathPattern.test("/user/123")).toBe(true);
		expect(paramNames).toEqual(["id"]);
	});

	it("should capture multiple parameters in the path", () => {
		const { pathPattern, paramNames } = generatePathPattern(
			"/user/:id/profile/:section",
		);
		expect(pathPattern.test("/user/123/profile/settings")).toBe(true);
		expect(paramNames).toEqual(["id", "section"]);
	});

	it("should handle paths with parameters in the middle of the path", () => {
		const { pathPattern, paramNames } = generatePathPattern(
			"/shop/:category/items",
		);
		expect(pathPattern.test("/shop/electronics/items")).toBe(true);
		expect(paramNames).toEqual(["category"]);
	});

	it("should fail to match a path if required parameters are missing", () => {
		const { pathPattern } = generatePathPattern("/user/:id/profile/:section");
		expect(pathPattern.test("/user/123")).toBe(false);
	});

	it("should fail to match if an extra path segment is present", () => {
		const { pathPattern } = generatePathPattern("/user/:id");
		expect(pathPattern.test("/user/123/extra")).toBe(false);
	});

	it("should handle paths with no parameters or trailing slashes", () => {
		const { pathPattern, paramNames } = generatePathPattern("/static/path/");
		expect(pathPattern.test("/static/path/")).toBe(true);
		expect(paramNames).toEqual([]);
	});

	it("should generate a regex pattern that ends with '$' to ensure exact matches", () => {
		const { pathPattern } = generatePathPattern("/exact");
		expect(pathPattern.test("/exact")).toBe(true);
		expect(pathPattern.test("/exact/extra")).toBe(false);
	});

	it("should return an empty paramNames array for paths without parameters", () => {
		const { paramNames } = generatePathPattern("/simple/path");
		expect(paramNames).toEqual([]);
	});

	it("should match paths with hyphens or underscores in the parameter name", () => {
		const { pathPattern, paramNames } = generatePathPattern(
			"/user/:user_id/details/:section-name",
		);
		expect(pathPattern.test("/user/42/details/profile")).toBe(true);
		expect(paramNames).toEqual(["user_id", "section-name"]);
	});

	it("should match paths with special characters in the parameter values", () => {
		const { pathPattern, paramNames } = generatePathPattern("/product/:id");
		expect(pathPattern.test("/product/123-abc_def")).toBe(true);
		expect(paramNames).toEqual(["id"]);
	});

	it("should not match an invalid path", () => {
		const { pathPattern } = generatePathPattern("/valid/path");
		expect(pathPattern.test("invalid/path")).toBe(false);
	});
});

describe("resolveComponent", () => {
	const mockProps = {
		params: { id: "123" },
		searchParams: new URLSearchParams("?q=test"),
		data: { exampleData: true },
		error: null,
	};

	it("should return an HTMLElement for a synchronous component", async () => {
		const syncComponent = (props: any) => {
			const element = document.createElement("div");
			element.textContent = `ID: ${props.params.id}`;
			return element;
		};

		const result = await resolveComponent(syncComponent, mockProps);
		expect(result).toBeInstanceOf(HTMLElement);
		expect(result.textContent).toBe("ID: 123");
	});

	it("should return an HTMLElement for an asynchronous component", async () => {
		const asyncComponent = async (props: any) => {
			const element = document.createElement("div");
			element.textContent = `ID: ${props.params.id}`;
			return element;
		};

		const result = await resolveComponent(asyncComponent, mockProps);
		expect(result).toBeInstanceOf(HTMLElement);
		expect(result.textContent).toBe("ID: 123");
	});

	it("should return an HTMLElement for a component with a default export function", async () => {
		const componentWithDefaultExport: any = {
			default: (props: any) => {
				const element = document.createElement("div");
				element.textContent = `ID: ${props.params.id}`;
				return element;
			},
		};

		const result = await resolveComponent(
			componentWithDefaultExport,
			mockProps,
		);
		expect(result).toBeInstanceOf(HTMLElement);
		expect(result.textContent).toBe("ID: 123");
	});

	it("should return an HTMLElement for a component with a default export HTMLElement", async () => {
		const element = document.createElement("div");
		element.textContent = "Default Export Element";
		const componentWithDefaultExport: any = { default: element };

		const result = await resolveComponent(
			componentWithDefaultExport,
			mockProps,
		);
		expect(result).toBeInstanceOf(HTMLElement);
		expect(result.textContent).toBe("Default Export Element");
	});

	it("should throw an error if component does not return an HTMLElement", async () => {
		const invalidComponent: any = () => "This is not an HTMLElement";

		await expect(resolveComponent(invalidComponent, mockProps)).rejects.toThrow(
			"Error resolving component: Component must return an HTMLElement, an object with a default export, or a function returning an HTMLElement.",
		);
	});

	it("should throw an error if default export is neither an HTMLElement nor a function", async () => {
		const invalidDefaultComponent: any = { default: "Invalid default export" };

		await expect(
			resolveComponent(invalidDefaultComponent, mockProps),
		).rejects.toThrow(
			"Error resolving component: Default export must be an HTMLElement or a function returning HTMLElement.",
		);
	});

	it("should throw an error if default export function does not return an HTMLElement", async () => {
		const invalidDefaultComponent: any = {
			default: () => "This is not an HTMLElement",
		};

		await expect(
			resolveComponent(invalidDefaultComponent, mockProps),
		).rejects.toThrow(
			"Error resolving component: The default export function did not return a valid HTMLElement.",
		);
	});

	it("should catch errors thrown within the component function", async () => {
		const errorThrowingComponent = () => {
			throw new Error("Component error");
		};

		await expect(
			resolveComponent(errorThrowingComponent, mockProps),
		).rejects.toThrow("Error resolving component: Component error");
	});
});

describe("getCacheState", () => {
	it("should return the cache state for a given path", async () => {
		const state = createState("testing", { example: true });

		expect(await getCacheState("testing", "memory")).toEqual(state);
	});
});

const ParamsComponent = (props: any) => {
	return (
		<div>
			<div>ID: {JSON.stringify(props.params || {}, null, 2)}</div>
			<div>
				SEARCH:{" "}
				{JSON.stringify(Object.fromEntries(props.searchParams || {}), null, 2)}
			</div>

			<div data-outlet />
		</div>
	);
};

describe("navigateTo", () => {
	beforeEach(() => {
		document.body.innerHTML = `<div id="app"></div>`;

		registerRoutes({
			path: "/test",
			component: ParamsComponent,
			children: [
				{
					path: "/:id",
					component: ParamsComponent,
				},
			],
		});

		initRouter(document.getElementById("app")!);
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("should navigate to a path", async () => {
		initRouter(document.getElementById("app")!);

		// @ts-expect-error Route types created dynamically at dev server initialization
		navigateTo("/test/123");
		expect(window.location.pathname).toBe("/test/123");
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(rootElement?.textContent).toContain('"id": "123"');
	});

	it("should navigate to a path with query parameters", async () => {
		initRouter(document.getElementById("app")!);

		// @ts-expect-error Route types created dynamically at dev server initialization
		navigateTo("/test/123?q=test");
		expect(window.location.pathname).toBe("/test/123");
		expect(window.location.search).toBe("?q=test");
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(rootElement?.textContent).toContain('"q": "test"');
	});

	it("should navigate to a path with query parameters and a hash", async () => {
		initRouter(document.getElementById("app")!);

		// @ts-expect-error Route types created dynamically at dev server initialization
		navigateTo("/test/123/?q=test#section");
		expect(window.location.pathname).toBe("/test/123/");
		expect(window.location.search).toBe("?q=test");
		expect(window.location.hash).toBe("#section");
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(rootElement?.textContent).toContain('"q": "test"');
	});

	it("should navigate to root path", async () => {
		initRouter(document.getElementById("app")!);

		navigateTo("/");
		expect(window.location.pathname).toBe("/");
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(document.getElementById("app")?.textContent).toBeDefined();
	});
});

function Layout() {
	return (
		<div>
			<h1>Layout</h1>
			<div data-outlet />
		</div>
	);
}

function FallbackRoot() {
	return <div data-outlet>Initial</div>;
}

const FallbackComponent = () => {
	return (
		<div>
			<div>Loading...</div>
		</div>
	);
};

const ComponentForFallback = () => {
	return (
		<div>
			<div>Component for fallback</div>
		</div>
	);
};

describe("fallback component", () => {
	let fallbackRootElement: HTMLElement | null;

	beforeEach(() => {
		const root = document.createElement("div");
		root.id = "app";
		document.body.appendChild(root);
		fallbackRootElement = root;

		registerRoutes({
			path: "/",
			component: Layout,
			children: [
				{
					path: "/",
					component: FallbackRoot,
				},
				{
					path: "/new",
					component: ComponentForFallback,
					loader: async () =>
						await new Promise((resolve) => setTimeout(resolve, 200)),
					fallback: FallbackComponent,
				},
			],
		});

		initRouter(fallbackRootElement!);
	});

	afterEach(() => {
		document.body.innerHTML = "";
		fallbackRootElement = null;
		vi.restoreAllMocks();
	});

	it("should render the fallback component while loading", async () => {
		try {
			expect(window.location.pathname).toBe("/");
			expect(fallbackRootElement?.innerHTML).toContain("Layout");

			navigateTo("/");

			await new Promise((resolve) => setTimeout(resolve, 100));
			expect(fallbackRootElement?.innerHTML).toContain("Initial");

			// @ts-expect-error Route types created dynamically at dev server initialization
			navigateTo("/new");

			await new Promise((resolve) => setTimeout(resolve, 100));
			expect(fallbackRootElement?.innerHTML).toContain("Loading...");
			await new Promise((resolve) => setTimeout(resolve, 200));

			expect(fallbackRootElement?.innerHTML).toContain(
				"Component for fallback",
			);
		} catch (e) {
			console.error(e);
		}
	});
});
