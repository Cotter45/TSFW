import { clsx } from "@core/clsx";
import Button, { ButtonProps } from "./Button";

type DropdownProps = JSX.IntrinsicElements["div"] & {
  align?: "end" | "top" | "bottom" | "left" | "right";
  hover?: boolean;
  open?: boolean;
  class?: string;
};

export function Dropdown({
  align,
  hover = false,
  open = false,
  class: className,
  children,
}: DropdownProps) {
  const dropdownClasses = clsx(
    "dropdown",
    align && `dropdown-${align}`,
    hover && "dropdown-hover",
    open && "dropdown-open",
    className
  );

  return <div class={dropdownClasses}>{children}</div>;
}

type DropdownTriggerProps = ButtonProps & {
  class?: string;
};

export function DropdownTrigger({
  children,
  class: className,
  ...props
}: DropdownTriggerProps) {
  return (
    <Button class={className} {...props}>
      {children}
    </Button>
  );
}

type DropdownListProps = JSX.IntrinsicElements["ul"] & {
  class?: string;
};

export function DropdownList({
  children,
  class: className,
}: DropdownListProps) {
  const contentClasses = clsx(
    "dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow",
    className
  );

  return (
    <ul tabIndex={0} class={contentClasses}>
      {children}
    </ul>
  );
}

type DropdownItemProps = JSX.IntrinsicElements["li"] & {
  class?: string;
  onClick?: () => void;
};

export function DropdownItem({
  children,
  class: className,
  onClick,
}: DropdownItemProps) {
  return (
    <li class={className}>
      <a onClick={onClick}>{children}</a>
    </li>
  );
}
