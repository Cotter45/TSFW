import { clsx } from "@core/clsx";
import { createState } from "@core/state";
import type { RoutePaths } from "@core/routes";

import { Link } from "./Link";
import { addElement, diffStates, getElement, removeElement } from "@core/utils";

interface IToastProps {
  id: string;
  title: string;
  description: string;
  link?: {
    href: RoutePaths;
    text: string;
  };
  type: "success" | "error" | "warning" | "info";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  timeout?: number; // Custom timeout in milliseconds
}

const createToastState = () =>
  createState<{
    toasts: IToastProps[];
    defaultDuration: number;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  }>("toast-state", {
    toasts: [],
    defaultDuration: 5000,
    position: "top-right",
  });

const toastState = createToastState();

export const toast = {
  success(
    title: string,
    description: string,
    link?: IToastProps["link"],
    timeout?: number
  ) {
    addToast({
      id: generateId(),
      title,
      description,
      link,
      type: "success",
      timeout,
      position: toastState.getState().position,
    });
  },
  error(
    title: string,
    description: string,
    link?: IToastProps["link"],
    timeout?: number
  ) {
    addToast({
      id: generateId(),
      title,
      description,
      link,
      type: "error",
      timeout,
      position: toastState.getState().position,
    });
  },
  warning(
    title: string,
    description: string,
    link?: IToastProps["link"],
    timeout?: number
  ) {
    addToast({
      id: generateId(),
      title,
      description,
      link,
      type: "warning",
      timeout,
      position: toastState.getState().position,
    });
  },
  info(
    title: string,
    description: string,
    link?: IToastProps["link"],
    timeout?: number
  ) {
    addToast({
      id: generateId(),
      title,
      description,
      link,
      type: "info",
      timeout,
      position: toastState.getState().position,
    });
  },
};

function generateId() {
  return `toast-${Math.random().toString(36).substr(2, 9)}`;
}

function addToast(toast: IToastProps) {
  const currentToasts = toastState.getState().toasts;
  const defaultDuration = toastState.getState().defaultDuration;
  toastState.setState({ toasts: [...currentToasts, toast] });

  const timeout = toast.timeout || defaultDuration;
  setTimeout(() => removeToast(toast.id), timeout);
}

function removeToast(toastId: string) {
  const toasts = toastState.getState().toasts;
  const toast = toasts.find((toast) => toast.id === toastId);
  const position = toast?.position;

  const toastElement = getElement(`#${toastId}`);

  if (toastElement) {
    if (position?.includes("left")) {
      toastElement.classList.add("toast-left-exit");
    } else if (position?.includes("right")) {
      toastElement.classList.add("toast-right-exit");
    }

    setTimeout(() => {
      removeElement(`#${toastId}`);
      const currentToasts = toastState.getState().toasts;
      toastState.setState({
        toasts: currentToasts.filter((toast) => toast.id !== toastId),
      });
    }, 250);
  }
}

export function Toast({
  id,
  title,
  description,
  link,
  type,
  position,
}: IToastProps) {
  return (
    <div
      id={id}
      class={clsx(
        "fade_in relative toast-enter-active rounded-md p-4 shadow-md mb-4 transition-transform transform w-[calc(100dvw-2rem)] sm:max-w-[25rem]",
        type === "success" && "bg-green-50 text-green-700",
        type === "error" && "bg-red-50 text-red-700",
        type === "warning" && "bg-yellow-50 text-yellow-700",
        type === "info" && "bg-blue-50 text-blue-700",
        position?.includes("left") && "toast-left",
        position?.includes("right") && "toast-right"
      )}
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <p class="ml-2 font-medium">{title}</p>
        </div>
        {link && (
          <Link
            href={link.href}
            class="text-sm absolute top-0 left-0 w-full h-full"
          >
            <div class="absolute top-3 right-5">{link.text}</div>
          </Link>
        )}
      </div>
      <p class="mt-2 text-sm">{description}</p>
    </div>
  );
}

export function GlobalToastContainer({
  duration = 5000,
  position = "top-right",
}: {
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  if (duration !== toastState.getState().defaultDuration) {
    toastState.setState({ defaultDuration: duration });
  }

  if (position !== toastState.getState().position) {
    toastState.setState({ position });
  }

  toastState.subscribe((state, previousState) => {
    const container = getElement("#toast-container");
    if (container) {
      // Diff the current state with the previous state
      const { added, removed } = diffStates(
        state.toasts,
        previousState?.toasts || [],
        "id"
      );

      // Remove old toasts
      for (const removedToast of removed) {
        const toastElement = getElement(`#${removedToast.id}`);
        if (toastElement) {
          removeElement(`#${removedToast.id}`);
        }
      }

      // Add new toasts
      for (const newToast of added) {
        const toastElement = (
          <Toast
            id={newToast.id}
            title={newToast.title}
            description={newToast.description}
            link={newToast.link}
            type={newToast.type}
            position={position}
          />
        );
        addElement("#toast-container", toastElement);
      }
    }
  });

  return <ToastContainer position={position} />;
}

export function ToastContainer({
  position = "top-right",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  return (
    <div
      id="toast-container"
      class={clsx(
        "fixed z-[1000] flex flex-col",
        position === "top-left" && "top-4 left-4",
        position === "top-right" && "top-4 right-4",
        position === "bottom-left" && "bottom-4 left-4",
        position === "bottom-right" && "bottom-4 right-4"
      )}
    />
  );
}
