import { clsx } from "@core/clsx";
import type { RoutePaths } from "@core/routes";
import { navigateTo, routerState } from "@core/router";

interface LinkProps extends Omit<JSX.IntrinsicElements["a"], "className"> {
	class?: string;
	href: RoutePaths;
}

export function Link({
	href,
	children,
	className,
	onclick,
	...rest
}: LinkProps) {
	const handleClick = (event: MouseEvent) => {
		if (!href.startsWith("http")) {
			event.preventDefault();
			navigateTo(href);

			if (onclick) {
				onclick();
			}
		}
	};

	routerState.subscribe((state, oldState) => {
		if (state.path !== oldState.path) {
			const links = document.querySelectorAll("a");
			for (const link of Array.from(links)) {
				if (link.getAttribute("href") === state.path) {
					link.setAttribute("aria-current", "page");
					link.classList.add("!text-primary");
				} else {
					link.removeAttribute("aria-current");
					link.classList.remove("!text-primary");
				}
			}
		}
	}, "tsfw-link");

	const isActive = window.location.pathname === href;
	const activeClass = isActive ? "!text-primary" : "";

	return (
		<a
			href={href}
			onClick={handleClick}
			class={clsx(
				"text-base py-1 transition-colors duration-200 ease-in-out hover:underline",
				activeClass,
				className,
			)}
			aria-current={isActive ? "page" : undefined}
			{...rest}
		>
			{children}
		</a>
	);
}

type ExternalLinkProps = Omit<LinkProps, "href"> & {
	href: string;
};

export function ExternalLink({
	href,
	children,
	className,
	...rest
}: ExternalLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener"
			class={clsx(
				"text-base py-1 transition-colors duration-200 ease-in-out hover:underline",
				className,
			)}
			{...rest}
		>
			{children}
		</a>
	);
}
