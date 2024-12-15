// src/components/ui/Button.tsx
import { clsx } from "@core/clsx";
import { navigateTo } from "@core/router";

import type { RoutePaths } from "@core/routes";

export type ButtonColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "link"
  | "outline";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  href?: RoutePaths;
  externalHref?: string;
  color?: ButtonColor;
  size?: "lg" | "md" | "sm" | "xs";
  variant?: "wide" | "block" | "circle" | "square";
  glass?: boolean;
  noAnimation?: boolean;
  active?: boolean;
  disabled?: boolean;
  class?: string;
  onClick?: () => void | void;
  children: JSX.Element | string;
}

export function Button({
  children,
  href,
  externalHref,
  color = "primary",
  size = "md",
  variant,
  glass = false,
  noAnimation = false,
  active = false,
  disabled = false,
  class: className,
  ...props
}: ButtonProps) {
  const classes = clsx([
    "btn", // Base class
    `btn-${color}`, // Color options
    `btn-${size}`, // Size options
    variant && `btn-${variant}`, // Variant options (e.g., wide, block, circle, square)
    glass && "glass",
    noAnimation && "no-animation",
    active && "btn-active",
    disabled && "btn-disabled",
    className,
  ]);

  if (externalHref) {
    return (
      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        class={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          navigateTo(href);
        }}
        class={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button class={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
