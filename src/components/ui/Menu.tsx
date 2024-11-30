import { clsx } from "@core/clsx";
import { routerState } from "@core/router";

type MenuProps = JSX.IntrinsicElements["ul"] & {
	vertical?: boolean;
	horizontal?: boolean;
	compact?: boolean;
	class?: string;
	children: JSX.Element | JSX.Element[] | string;
};

export function Menu({
	vertical = true,
	horizontal = false,
	compact = false,
	class: className,
	children,
	...props
}: MenuProps) {
	const menuClasses = clsx(
		"menu space-y-2",
		vertical && "menu-vertical",
		horizontal && "menu-horizontal",
		compact && "menu-compact",
		className,
	);

	return (
		<ul class={menuClasses} {...props}>
			{children}
		</ul>
	);
}

type MenuItemProps = JSX.IntrinsicElements["li"] & {
	active?: boolean;
	disabled?: boolean;
	class?: string;
	children: JSX.Element | JSX.Element[] | string;
};

export function MenuItem({
	active = false,
	disabled = false,
	class: className,
	children,
	...props
}: MenuItemProps) {
	const menuItemClasses = clsx(
		"menu-item",
		active && "active",
		disabled && "disabled",
		className,
	);

	return (
		<li class={menuItemClasses} {...props}>
			{children}
		</li>
	);
}

type SubMenuProps = JSX.IntrinsicElements["li"] & {
	title: string;
	class?: string;
	basePath?: string;
	children: JSX.Element | JSX.Element[] | string;
};

export function SubMenu({
	title,
	class: className,
	basePath,
	children,
	...props
}: SubMenuProps) {
	const subMenuClasses = clsx("menu-item mb-2", className);

	routerState.subscribe((state) => {
		const route = state.path;

		if (basePath && route.startsWith(basePath)) {
			const details = document.getElementById(title);
			if (details) {
				details.setAttribute("open", "true");
			}
		}
	}, `submenu-${title}`);

	return (
		<li class={subMenuClasses} {...props}>
			<details id={title}>
				<summary
					class={clsx(
						"text-base text-zinc-600 py-1 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-200 transition-colors duration-200 ease-in-out",
					)}
				>
					{title}
				</summary>
				<ul class="space-y-1 !mt-2">{children}</ul>
			</details>
		</li>
	);
}
