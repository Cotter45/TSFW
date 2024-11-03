import { clsx } from "@core/clsx";

interface ITextProps extends Omit<JSX.IntrinsicElements["p"], "className"> {
  class?: string;
  ariaLabel?: string;
}

export function Text({
  class: className,
  children,
  ariaLabel,
  ...rest
}: ITextProps) {
  return (
    <p
      data-slot="text"
      role="paragraph"
      aria-label={ariaLabel}
      {...rest}
      class={clsx(
        "text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Heading({
  class: className,
  children,
  ariaLabel,
  ...rest
}: ITextProps) {
  return (
    <h1
      data-slot="heading"
      role="heading"
      aria-level="1"
      aria-label={ariaLabel}
      {...rest}
      class={clsx(
        "text-2xl/6 font-bold text-zinc-900 dark:text-zinc-100",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function SubHeading({
  class: className,
  children,
  ariaLabel,
  ...rest
}: ITextProps) {
  return (
    <h2
      data-slot="sub-heading"
      role="heading"
      aria-level="2"
      aria-label={ariaLabel}
      {...rest}
      class={clsx(
        "text-lg/6 font-bold text-zinc-800 dark:text-zinc-200",
        className
      )}
    >
      {children}
    </h2>
  );
}
