import { clsx } from "@core/clsx";
import { createState } from "@core/state";
import { getElement } from "@core/utils";

type CheckboxGroupProps = JSX.IntrinsicElements["div"];

export function CheckboxGroup({
  class: className,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <div
      data-slot="control"
      {...props}
      class={clsx(
        className,
        "space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-5",
        "has-[[data-slot=description]]:space-y-6 [&_[data-slot=label]]:has-[[data-slot=description]]:font-medium"
      )}
    >
      {children}
    </div>
  );
}

type CheckboxFieldProps = JSX.IntrinsicElements["div"];

export function CheckboxField({
  class: className,
  children,
  ...props
}: CheckboxFieldProps) {
  return (
    <div
      data-slot="field"
      {...props}
      class={clsx(
        className,
        "grid grid-cols-[1.125rem_1fr] items-center gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",
        "[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:justify-self-center",
        "[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1 [&>[data-slot=label]]:justify-self-start",
        "[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2",
        "[&_[data-slot=label]]:has-[[data-slot=description]]:font-medium"
      )}
    >
      {children}
    </div>
  );
}

const base = [
  "relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4",
  "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow",
  "before:group-data-[checked]:bg-[--checkbox-checked-bg]",
  "dark:before:hidden",
  "dark:bg-white/5 dark:group-data-[checked]:bg-[--checkbox-checked-bg]",
  "border border-zinc-950/15 group-data-[checked]:border-transparent group-data-[checked]:group-data-[hover]:border-transparent group-data-[hover]:border-zinc-950/30 group-data-[checked]:bg-[--checkbox-checked-border]",
  "dark:border-white/15 dark:group-data-[checked]:border-white/5 dark:group-data-[checked]:group-data-[hover]:border-white/5 dark:group-data-[hover]:border-white/30",
  "after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_theme(colors.white/15%)]",
  "dark:after:-inset-px dark:after:hidden dark:after:rounded-[0.3125rem] dark:group-data-[checked]:after:block",
  "group-data-[focus]:outline group-data-[focus]:outline-2 group-data-[focus]:outline-offset-2 group-data-[focus]:outline-emerald-500",
  "group-data-[disabled]:opacity-50",
  "group-data-[disabled]:border-zinc-950/25 group-data-[disabled]:bg-zinc-950/5 group-data-[disabled]:[--checkbox-check:theme(colors.zinc.950/50%)] group-data-[disabled]:before:bg-transparent",
  "dark:group-data-[disabled]:border-white/20 dark:group-data-[disabled]:bg-white/[2.5%] dark:group-data-[disabled]:[--checkbox-check:theme(colors.white/50%)] dark:group-data-[disabled]:group-data-[checked]:after:hidden",
  "forced-colors:[--checkbox-check:HighlightText] forced-colors:[--checkbox-checked-bg:Highlight] forced-colors:group-data-[disabled]:[--checkbox-check:Highlight]",
  "dark:forced-colors:[--checkbox-check:HighlightText] dark:forced-colors:[--checkbox-checked-bg:Highlight] dark:forced-colors:group-data-[disabled]:[--checkbox-check:Highlight]",
];

const colors = {
  "dark/zinc": [
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
    "dark:[--checkbox-checked-bg:theme(colors.zinc.600)]",
  ],
  "dark/white": [
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
    "dark:[--checkbox-check:theme(colors.zinc.900)] dark:[--checkbox-checked-bg:theme(colors.white)] dark:[--checkbox-checked-border:theme(colors.zinc.950/15%)]",
  ],
  white:
    "[--checkbox-check:theme(colors.zinc.900)] [--checkbox-checked-bg:theme(colors.white)] [--checkbox-checked-border:theme(colors.zinc.950/15%)]",
  dark: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
  zinc: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.600)] [--checkbox-checked-border:theme(colors.zinc.700/90%)]",
  red: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.red.600)] [--checkbox-checked-border:theme(colors.red.700/90%)]",
  orange:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.orange.500)] [--checkbox-checked-border:theme(colors.orange.600/90%)]",
  amber:
    "[--checkbox-check:theme(colors.amber.950)] [--checkbox-checked-bg:theme(colors.amber.400)] [--checkbox-checked-border:theme(colors.amber.500/80%)]",
  yellow:
    "[--checkbox-check:theme(colors.yellow.950)] [--checkbox-checked-bg:theme(colors.yellow.300)] [--checkbox-checked-border:theme(colors.yellow.400/80%)]",
  lime: "[--checkbox-check:theme(colors.lime.950)] [--checkbox-checked-bg:theme(colors.lime.300)] [--checkbox-checked-border:theme(colors.lime.400/80%)]",
  green:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.green.600)] [--checkbox-checked-border:theme(colors.green.700/90%)]",
  emerald:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.emerald.600)] [--checkbox-checked-border:theme(colors.emerald.700/90%)]",
  teal: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.teal.600)] [--checkbox-checked-border:theme(colors.teal.700/90%)]",
  cyan: "[--checkbox-check:theme(colors.cyan.950)] [--checkbox-checked-bg:theme(colors.cyan.300)] [--checkbox-checked-border:theme(colors.cyan.400/80%)]",
  sky: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.sky.500)] [--checkbox-checked-border:theme(colors.sky.600/80%)]",
  blue: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.blue.600)] [--checkbox-checked-border:theme(colors.blue.700/90%)]",
  indigo:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.indigo.500)] [--checkbox-checked-border:theme(colors.indigo.600/90%)]",
  violet:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.violet.500)] [--checkbox-checked-border:theme(colors.violet.600/90%)]",
  purple:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.purple.500)] [--checkbox-checked-border:theme(colors.purple.600/90%)]",
  fuchsia:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.fuchsia.500)] [--checkbox-checked-border:theme(colors.fuchsia.600/90%)]",
  pink: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.pink.500)] [--checkbox-checked-border:theme(colors.pink.600/90%)]",
  rose: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.rose.500)] [--checkbox-checked-border:theme(colors.rose.600/90%)]",
};

type Color = keyof typeof colors;
type CheckboxProps = JSX.IntrinsicElements["input"] & {
  name: string;
  color?: Color;
  onChange?: (checked: boolean) => void;
};

export function Checkbox({
  color = "dark/zinc",
  class: className,
  name,
  checked,
  onChange,
  ...props
}: CheckboxProps) {
  const uniqueId = Math.random().toString(36).substring(2, 15);

  const state = createState(uniqueId, {
    checked: checked ?? false,
  });

  state.subscribe((newState) => {
    const group = getElement(`#${uniqueId}`);

    if (!group) {
      return;
    }

    if (newState.checked) {
      group.dataset.checked = "true";
    } else {
      delete group.dataset.checked;
    }
  });

  return (
    <label
      id={uniqueId}
      class={clsx(className, "group inline-flex focus:outline-none")}
      data-checked={checked ? "true" : "false"}
    >
      <input
        {...props}
        name={name}
        type="checkbox"
        class="hidden"
        checked={checked}
        onChange={(e: Event) => {
          const target = e.target as HTMLInputElement;
          onChange?.(target.checked);

          state.setState({ checked: target.checked });
        }}
      />

      <span className={clsx(base, colors[color])}>
        <svg
          class="size-4 stroke-white opacity-0 group-data-[checked]:opacity-100 sm:h-3.5 sm:w-3.5"
          view-box="0 0 14 14"
          fill="none"
        >
          <path
            class="opacity-100 group-data-[indeterminate]:opacity-0"
            d="M3 8L6 11L11 3.5"
            stroke-width={2}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </label>
  );
}
