import { clsx } from "@core/clsx";

type AvatarProps = JSX.IntrinsicElements["div"] & {
	size?: "w-8" | "w-12" | "w-16" | "w-20" | "w-24" | "w-32";
	shape?:
		| "rounded"
		| "rounded-full"
		| "rounded-xl"
		| "mask-squircle"
		| "mask-hexagon"
		| "mask-triangle";
	presence?: "online" | "offline";
	placeholder?: boolean;
	ring?: boolean;
	ringColor?: string;
	ringOffsetColor?: string;
	ringOffsetSize?: string;
	class?: string;
};

export function Avatar({
	size = "w-24",
	shape = "rounded-full",
	presence,
	placeholder = false,
	ring = false,
	ringColor = "ring-primary",
	ringOffsetColor = "ring-offset-base-100",
	ringOffsetSize = "ring-offset-2",
	class: className,
	children,
	...props
}: AvatarProps) {
	const avatarClasses = clsx(
		"avatar",
		presence,
		placeholder && "placeholder",
		className,
	);

	const contentClasses = clsx(
		size,
		shape,
		ring && `ring ${ringColor} ${ringOffsetColor} ${ringOffsetSize}`,
	);

	return (
		<div class={avatarClasses} {...props}>
			<div class={contentClasses}>{children}</div>
		</div>
	);
}

type AvatarGroupProps = JSX.IntrinsicElements["div"] & {
	spaceX?: string;
	rtl?: boolean;
	class?: string;
};

export function AvatarGroup({
	children,
	spaceX = "-space-x-6",
	rtl = false,
	class: className,
	...props
}: AvatarGroupProps) {
	const groupClasses = clsx(
		"avatar-group",
		spaceX,
		rtl && "rtl:space-x-reverse",
		className,
	);

	return (
		<div class={groupClasses} {...props}>
			{children}
		</div>
	);
}
