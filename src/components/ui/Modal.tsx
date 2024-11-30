import { clsx } from "@core/clsx";
import Button, { type ButtonProps } from "./Button";

type ModalProps = JSX.IntrinsicElements["dialog"] & {
	position?: "top" | "bottom" | "middle";
	open?: boolean;
	class?: string;
	children: any;
};

export function Modal({
	position = "middle",
	open = false,
	class: className,
	children,
	...props
}: ModalProps) {
	const modalClasses = clsx(
		"modal",
		position && `modal-${position}`,
		open && "modal-open",
		className,
	);

	return (
		<dialog class={modalClasses} {...props}>
			{children}

			<ModalBackdrop onClose={() => closeModal("myModal")} />
		</dialog>
	);
}

type ModalBoxProps = JSX.IntrinsicElements["div"] & {
	class?: string;
	children: any;
};

export function ModalBox({
	children,
	class: className,
	...props
}: ModalBoxProps) {
	const modalBoxClasses = clsx(
		"modal-box bg-white dark:bg-zinc-900",
		className,
	);

	return (
		<div class={modalBoxClasses} {...props}>
			{children}

			<form method="dialog">
				<button
					type="button"
					class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					onclick={() => closeModal("myModal")}
				>
					✕
				</button>
			</form>
		</div>
	);
}

type ModalActionProps = JSX.IntrinsicElements["div"] & {
	class?: string;
};

export function ModalAction({
	children,
	class: className,
	...props
}: ModalActionProps) {
	const modalActionClasses = clsx("modal-action", className);

	return (
		<div class={modalActionClasses} {...props}>
			{children}
		</div>
	);
}

type ModalBackdropProps = JSX.IntrinsicElements["div"] & {
	onClose?: () => void;
	class?: string;
};

export function ModalBackdrop({
	onClose,
	class: className,
	children,
	...props
}: ModalBackdropProps) {
	const modalBackdropClasses = clsx("modal-backdrop", className);

	return (
		<div class={modalBackdropClasses} onClick={onClose} {...props}>
			{children}
		</div>
	);
}

type ModalTriggerProps = ButtonProps & {
	id: string;
};

export function ModalTrigger({ id, children, ...props }: ModalTriggerProps) {
	return (
		<Button onClick={() => openModal(id)} {...props}>
			{children}
		</Button>
	);
}

export const openModal = (id: string) => {
	const modal = document.getElementById(id) as HTMLDialogElement;
	modal?.showModal();
};

export const closeModal = (id: string) => {
	const modal = document.getElementById(id) as HTMLDialogElement;
	modal?.close();
};
