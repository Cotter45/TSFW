import { clsx } from "@core/clsx";

type FieldsetProps = JSX.IntrinsicElements["fieldset"];

export function Fieldset({
  class: className,
  children,
  ...props
}: FieldsetProps) {
  return (
    <fieldset
      {...props}
      className={clsx(
        className,
        "[&>*+[data-slot=control]]:mt-6 [&>[data-slot=text]]:mt-1"
      )}
    >
      {children}
    </fieldset>
  );
}

type LegendProps = JSX.IntrinsicElements["legend"];

export function Legend({ class: className, children, ...props }: LegendProps) {
  return (
    <legend
      data-slot="legend"
      {...props}
      className={clsx(
        className,
        "text-base/6 font-semibold text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
      )}
    >
      {children}
    </legend>
  );
}

type FieldGroupProps = JSX.IntrinsicElements["div"];

export function FieldGroup({
  class: className,
  children,
  ...props
}: FieldGroupProps) {
  return (
    <div
      data-slot="control"
      {...props}
      className={clsx(className, "space-y-8")}
    >
      {children}
    </div>
  );
}

type FieldTextProps = JSX.IntrinsicElements["div"];

export function Field({ className, children, ...props }: FieldTextProps) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "[&>[data-slot=label]+[data-slot=control]]:mt-3",
        "[&>[data-slot=label]+[data-slot=description]]:mt-1",
        "[&>[data-slot=description]+[data-slot=control]]:mt-3",
        "[&>[data-slot=control]+[data-slot=description]]:mt-3",
        "[&>[data-slot=control]+[data-slot=error]]:mt-3",
        "[&>[data-slot=label]]:font-medium"
      )}
    >
      {children}
    </div>
  );
}

type LabelProps = JSX.IntrinsicElements["label"];

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      {...props}
      className={clsx(
        className,
        "select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
      )}
    >
      {children}
    </label>
  );
}

type DescriptionProps = JSX.IntrinsicElements["p"];

export function Description({
  className,
  children,
  ...props
}: DescriptionProps) {
  return (
    <p
      data-slot="description"
      {...props}
      className={clsx(
        className,
        "text-base/6 text-zinc-500 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-zinc-400"
      )}
    >
      {children}
    </p>
  );
}

type ErrorMessageProps = JSX.IntrinsicElements["p"];

export function ErrorMessage({
  className,
  children,
  ...props
}: ErrorMessageProps) {
  return (
    <p
      data-slot="error"
      {...props}
      className={clsx(
        className,
        "text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500"
      )}
    >
      {children}
    </p>
  );
}
