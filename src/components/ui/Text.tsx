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
			aria-label={ariaLabel}
			{...rest}
			class={clsx("text-base/6 text-base-content/80 sm:text-sm/6", className)}
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
			aria-level="1"
			aria-label={ariaLabel}
			{...rest}
			class={clsx("text-2xl/6 font-bold text-base-content", className)}
		>
			{children}
		</h1>
	);
}

export function SubHeading({
	class: className,
	children,
	ariaLabel,
	level = 2,
	...rest
}: ITextProps) {
	let Tag = `h${level}` as "h2" | "h3" | "h4" | "h5" | "h6";

	if (level < 2 || level > 6) {
		Tag = "h2";
	}

	return (
		<Tag
			data-slot="sub-heading"
			aria-level="2"
			aria-label={ariaLabel}
			{...rest}
			class={clsx("text-lg/6 font-bold text-base-content", className)}
		>
			{children}
		</Tag>
	);
}
