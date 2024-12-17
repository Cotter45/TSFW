import { clsx } from "@core/clsx";

const loadingColors = [
	"primary",
	"secondary",
	"accent",
	"neutral",
	"info",
	"success",
	"warning",
	"error",
] as const;

export function Loading({
	color = "primary",
}: {
	color?: (typeof loadingColors)[number];
}) {
	const textColor = `text-${color}`;

	return <span class={clsx("loading loading-spinner", textColor)} />;
}
