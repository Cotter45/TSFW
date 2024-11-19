import { navigateTo, routerState } from "@core/router";
import { clsx } from "@core/clsx";
import { RoutePaths } from "@core/routes";
import { TouchTarget } from "./Button";

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
      links.forEach((link) => {
        if (link.getAttribute("href") === state.path) {
          link.setAttribute("aria-current", "page");
          link.classList.add(
            "!text-emerald-600",
            "dark:!text-emerald-400",
            "hover:!text-emerald-400",
            "dark:hover:!text-emerald-400"
          );
        } else {
          link.removeAttribute("aria-current");
          link.classList.remove(
            "!text-emerald-600",
            "dark:!text-emerald-400",
            "hover:!text-emerald-400",
            "dark:hover:!text-emerald-400"
          );
        }
      });
    }
  }, "tsfw-link");

  const isActive = window.location.pathname === href;
  const activeClass = isActive
    ? "!text-emerald-600 dark:!text-emerald-400 hover:!text-emerald-400 dark:hover:!text-emerald-400"
    : "";

  return (
    <a
      href={href}
      onClick={handleClick}
      class={clsx(
        "text-base text-zinc-500 py-1 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200 ease-in-out",
        activeClass,
        className
      )}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      <TouchTarget>{children}</TouchTarget>
    </a>
  );
}
