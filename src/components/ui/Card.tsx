import { clsx } from "@core/clsx";

type CardProps = JSX.IntrinsicElements["div"] & {
	bordered?: boolean;
	compact?: boolean;
	side?: boolean;
	imageFull?: boolean;
	glass?: boolean;
	class?: string;
};

export function Card({
	bordered = false,
	compact = false,
	side = false,
	imageFull = false,
	glass = false,
	class: className,
	children,
	...props
}: CardProps) {
	const cardClasses = clsx(
		"card bg-base-300 p-4 shadow-md dark:shadow-black rounded-lg",
		bordered && "card-bordered",
		compact && "card-compact !p-0",
		side && "card-side",
		imageFull && "image-full",
		glass && "glass",
		className,
	);

	return (
		<div class={cardClasses} {...props}>
			{children}
		</div>
	);
}

type CardBodyProps = JSX.IntrinsicElements["div"] & {
	class?: string;
};

export function CardBody({
	children,
	class: className,
	...props
}: CardBodyProps) {
	const cardBodyClasses = clsx("card-body p-3", className);

	return (
		<div class={cardBodyClasses} {...props}>
			{children}
		</div>
	);
}

type CardTitleProps = JSX.IntrinsicElements["h2"] & {
	class?: string;
};

export function CardTitle({
	children,
	class: className,
	...props
}: CardTitleProps) {
	const cardTitleClasses = clsx("card-title", className);

	return (
		<h2 class={cardTitleClasses} {...props}>
			{children}
		</h2>
	);
}

type CardActionsProps = JSX.IntrinsicElements["div"] & {
	class?: string;
};

export function CardActions({
	children,
	class: className,
	...props
}: CardActionsProps) {
	const cardActionsClasses = clsx("card-actions", className);

	return (
		<div class={cardActionsClasses} {...props}>
			{children}
		</div>
	);
}

type CardFigureProps = JSX.IntrinsicElements["figure"] & {
	class?: string;
};

export function CardFigure({
	children,
	class: className,
	...props
}: CardFigureProps) {
	const cardFigureClasses = clsx("card-figure", className);

	return (
		<figure class={cardFigureClasses} {...props}>
			{children}
		</figure>
	);
}
