import { createState } from "@core/state";
import { clsx } from "@core/clsx";
import { SubHeading, Text } from "./Text";

interface AccordionPanelState {
  isOpen: boolean;
}

const createAccordionPanelState = (id: string) =>
  createState<AccordionPanelState>(`accordion-panel-${id}`, { isOpen: false });

export function AccordionPanel({
  id,
  title,
  children,
  class: className,
}: {
  id: string;
  title: string;
  children: any;
  class?: string;
}) {
  const panelState = createAccordionPanelState(id);

  const togglePanel = () => {
    const { isOpen } = panelState.getState();
    panelState.setState({ isOpen: !isOpen });

    const icon = document.getElementById(`accordion-icon-${id}`);

    if (icon) {
      icon.classList.toggle("rotate-180");
    }
  };

  panelState.subscribe((state) => {
    const content = document.getElementById(`accordion-content-${id}`);
    if (content) {
      content.style.maxHeight = state.isOpen
        ? `${content.scrollHeight}px`
        : "0";
      content.style.opacity = state.isOpen ? "1" : "0";
    }
  });

  return (
    <div
      className={clsx(
        "accordion-panel border-b border-zinc-200 dark:border-zinc-600",
        className
      )}
    >
      <button
        className={clsx(
          "accordion-header w-full text-left p-2 flex justify-between items-center",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:rounded-md",
          "data-[disabled]:opacity-50"
        )}
        onClick={togglePanel}
        aria-expanded={panelState.getState().isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
      >
        <SubHeading
          id={`accordion-title-${id}`}
          class="!font-medium !text-base line-clamp-3 max-w-[95%]"
        >
          {title}
        </SubHeading>
        <div className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
          <svg
            id={`accordion-icon-${id}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={clsx("size-4 transition-transform duration-300", {
              "rotate-180": panelState.getState().isOpen,
            })}
            aria-hidden="true"
            focusable="false"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>
      <div
        id={`accordion-content-${id}`}
        className="accordion-content overflow-hidden transition-all duration-300 ease-in-out"
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        style={{ maxHeight: 0, opacity: 0 }}
      >
        <Text class="px-1 pb-2">{children}</Text>
      </div>
    </div>
  );
}

export function Divider() {
  return <hr className="border-t border-zinc-600 dark:border-zinc-400 my-4" />;
}

export function Accordion({
  panels,
  class: className,
}: {
  class?: string;
  panels: { id: string; title: string; content: any }[];
}) {
  return (
    <div class={clsx("accordion", className)}>
      {panels.map((panel) => (
        <AccordionPanel id={panel.id} title={panel.title}>
          {panel.content}
        </AccordionPanel>
      ))}
    </div>
  );
}
