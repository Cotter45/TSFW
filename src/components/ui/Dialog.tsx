import { createState, TSFWState } from "@core/state";
import { clsx } from "@core/clsx";
import { Heading, Text } from "./Text";
import { Button } from "./Button";

const sizes = {
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
};

const variants = {
  center: {},
  left: {
    position: "absolute",
    left: "0",
    top: "0",
    minHeight: "100dvh",
    borderRadius: "0px 8px 8px 0px",
  },
  right: {
    position: "absolute",
    right: "0",
    top: "0",
    minHeight: "100vh",
    borderRadius: "8px 0px 0px 8px",
  },
  top: {
    position: "absolute",
    top: "0",
    left: "0",
    borderRadius: "0px 0px 8px 8px",
  },
  bottom: {
    position: "absolute",
    bottom: "0",
    left: "0",
    borderRadius: "8px 8px 0px 0px",
  },
};

// Define the dialog state type
interface DialogState {
  isOpen: boolean;
}

// Explicitly type the dialogStates map to store states of type TSFWState<DialogState>
const dialogStates = new Map<string, TSFWState<DialogState>>();

// Helper function to get or create the dialog state for a unique ID
function getDialogState(id: string): TSFWState<DialogState> {
  if (!dialogStates.has(id)) {
    dialogStates.set(id, createState<DialogState>(id, { isOpen: false }));
  }
  return dialogStates.get(id)!;
}

export function openDialog(id: string) {
  const state = getDialogState(id);
  state.setState({ isOpen: true });
}

export function closeDialog(id: string) {
  if (!dialogStates.has(id)) return;
  if (!dialogStates.get(id)!.getState().isOpen) return;

  const root = document.getElementById(`dialog-root-${id}`);
  if (root) {
    const dialogElement = root.firstChild as HTMLElement;
    if (dialogElement) {
      dialogElement.classList.add("dialog-exit-active");
      setTimeout(() => {
        getDialogState(id).setState({ isOpen: false });
        root.innerHTML = "";
      }, 300);
    }
  }
}

export function Dialog({
  size = "lg",
  variant = "center",
  id = "dialog",
  className,
  children,
}: {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  id: string;
  className?: string;
  children: any;
}) {
  const dialogState = getDialogState(id);

  dialogState.subscribe((state) => {
    let root = document.getElementById(`dialog-root-${id}`);
    if (!root) {
      root = document.createElement("div");
      root.id = `dialog-root-${id}`;
      document.body.appendChild(root);
    }

    if (state.isOpen && !root.hasChildNodes()) {
      const dialogElement = (
        <div
          className={clsx(
            "dialog-backdrop fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dialog-enter z-[1000]",
            className
          )}
          onClick={() => closeDialog(id)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          tabIndex={-1}
        >
          <div
            style={{
              width: `calc(min(${sizes[size]} , 95vw))`,
              maxWidth: `calc(min(${sizes[size]} , 95vw))`,
              ...variants[variant],
            }}
            className="dialog-content p-6 md:p-10 bg-white shadow-sm border border-zinc-950/5 dark:bg-zinc-900 dark:border-white/10 overflow-x-hidden overflow-y-auto rounded-lg max-h-screen"
            onClick={(e: MouseEvent) => e.stopPropagation()}
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      );

      root.appendChild(dialogElement);
      requestAnimationFrame(() => {
        (root.firstChild as HTMLElement)?.classList.add("dialog-enter-active");
        focusFirstElement(dialogElement as HTMLElement);
      });

      // Close on Escape key
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") closeDialog(id);
      };
      document.addEventListener("keydown", handleEscape);

      // Cleanup Escape listener
      return () => document.removeEventListener("keydown", handleEscape);
    } else if (!state.isOpen && root.hasChildNodes()) {
      root.innerHTML = "";
    }
  });

  return null;
}

function focusFirstElement(dialogElement: HTMLElement) {
  const focusableSelectors = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];
  const focusableElements = dialogElement.querySelectorAll(
    focusableSelectors.join(", ")
  );
  (focusableElements[0] as HTMLElement)?.focus();
}

export function DialogTitle({
  className,
  children,
}: {
  className?: string;
  children: any;
}) {
  return (
    <Heading id="dialog-title" className={clsx("dialog-title", className)}>
      {children}
    </Heading>
  );
}

export function DialogDescription({
  className,
  children,
}: {
  className?: string;
  children: any;
}) {
  return (
    <Text
      id="dialog-description"
      className={clsx("dialog-description mt-1 text-sm", className)}
    >
      {children}
    </Text>
  );
}

export function DialogBody({
  className,
  children,
}: {
  className?: string;
  children: any;
}) {
  return <div className={clsx("dialog-body mt-6", className)}>{children}</div>;
}

export function DialogActions({
  className,
  children,
}: {
  className?: string;
  children: any;
}) {
  return (
    <div
      className={clsx("dialog-actions mt-8 flex justify-end gap-4", className)}
    >
      {children}
    </div>
  );
}

export function DialogTrigger({
  children,
  className,
  id,
}: {
  id: string;
  children: any;
  className?: string;
}) {
  return (
    <Button
      variant="plain"
      class={clsx("dialog-trigger-btn", className)}
      onClick={() => openDialog(id)}
    >
      {children}
    </Button>
  );
}
