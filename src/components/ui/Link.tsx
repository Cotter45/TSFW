import { navigateTo } from "@core/router";
import { clsx } from "@core/clsx";
import { RoutePaths } from "@core/routes";
import { TouchTarget } from "./Button";

class CustomLink extends HTMLElement {
  static get observedAttributes() {
    return ["href"];
  }

  private href: RoutePaths | undefined = undefined;
  private activeClass = "!text-emerald-600 dark:!text-emerald-400";
  private defaultClass =
    "text-left text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.updateActiveClass();

    const button = this.shadowRoot?.querySelector("button");
    if (button) {
      button.setAttribute("tabindex", "0");
      button.addEventListener("click", this.handleClick);
      button.addEventListener("keydown", this.handleKeyDown);
    }

    window.addEventListener("routechange", this.updateActiveClass);
    window.addEventListener("popstate", this.updateActiveClass);
  }

  disconnectedCallback() {
    const button = this.shadowRoot?.querySelector("button");
    button?.removeEventListener("click", this.handleClick);
    button?.removeEventListener("keydown", this.handleKeyDown);

    window.removeEventListener("routechange", this.updateActiveClass);
    window.removeEventListener("popstate", this.updateActiveClass);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: RoutePaths
  ) {
    if (name === "href") {
      this.href = newValue;
      this.updateActiveClass();
    }
  }

  private handleClick = (event: Event) => {
    event.preventDefault();
    if (this.href) {
      navigateTo(this.href);
      this.updateActiveClass();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.handleClick(event);
    }
  };

  private updateActiveClass = () => {
    const path = window.location.pathname;
    const isRootLink = this.href === "/";
    const isActive = isRootLink
      ? path === this.href
      : path.startsWith(this.href ?? "");

    const button = this.shadowRoot?.querySelector("button");

    if (button) {
      button.className = clsx(this.defaultClass, isActive && this.activeClass);

      if (isActive) {
        button.style.color = "#059669";
        button.scrollIntoView({ behavior: "smooth", block: "nearest" });
        button.setAttribute("aria-current", "page");
      } else {
        button.style.color = "";
        button.removeAttribute("aria-current");
      }
    }
  };

  private render() {
    const button = document.createElement("button");
    button.className = clsx(this.defaultClass);
    button.innerHTML = `<slot></slot>`;
    button.setAttribute("aria-label", this.getAttribute("href") || "Link");

    const style = document.createElement("style");
    style.textContent = `
      button { all: inherit; cursor: pointer; outline: none; }
      button:focus-visible { box-shadow: 0 0 0 2px #059669; border-radius: 4px; }
      .active { color: #059669; }
    `;

    this.shadowRoot?.append(style, button);
  }
}

customElements.define("custom-link", CustomLink);

interface LinkProps extends Omit<JSX.IntrinsicElements["a"], "className"> {
  class?: string;
  href: RoutePaths;
}

export function Link({ class: className, children, href, ...rest }: LinkProps) {
  return (
    <custom-link
      class={clsx("w-full text-zinc-600 dark:text-zinc-400 p-1", className)}
      href={href}
      {...rest}
    >
      <TouchTarget>{children}</TouchTarget>
    </custom-link>
  );
}
