// src/components/App.tsx
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";

import { Link } from "@components/ui/Link";
import { Heading, Text } from "@components/ui/Text";
import { documentationLinks, DocsLinks } from "@components/DocsLinks";
import { ThemeController } from "@components/ui/ThemeController";
import { Modal, ModalBox, ModalTrigger } from "@components/ui/Modal";
import { Menu, MenuItem, SubMenu } from "@components/ui/Menu";
import { clsx } from "@core/clsx";

export default function App() {
  const regex =
    /(text|bg|border)-(teal-|gray-)(100|200|300|400|500|600|700|800|900)(?:$|^|)/gi;

  Prism.hooks.add("after-highlight", function (env) {
    env.highlightedCode = env.highlightedCode.replace(regex, function (match) {
      return `<span class="inline-flex w-3 h-3 rounded ring-1 ring-gray-900/30 mr-1"></span>${match}`;
    });

    env.element.innerHTML = env.highlightedCode;
  });

  setTimeout(() => {
    Prism.highlightAll();
  }, 100);

  return (
    <div class="relative w-full min-h-screen flex flex-col md:flex-row px-2 pb-24 md:px-0 md:pt-2 md:pr-2 md:pb-2 bg-zinc-100 dark:bg-zinc-950">
      <div class="w-full max-w-full md:max-w-[300px] min-w-[300px]">
        {/* Sidebar for larger screens */}
        <div class="sticky top-1 left-0 max-w-0 max-h-0 md:max-h-screen overflow-y-auto overflow-x-hidden md:w-full md:max-w-full md:flex flex-col gap-2 -my-1 rounded-r-md md:pb-4 md:p-4">
          <Heading>TSFW</Heading>
          <Routes />

          <ToggleThemeButton />

          <a
            href="https://www.buymeacoffee.com/cotter45"
            target="_blank"
            rel="noreferrer"
            class="flex gap-2 bg-emerald-600 !text-white items-center justify-center px-8 py-2 rounded-md mx-4 mt-2"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              role="img"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.645 7.472c2.1.53 4.779.8 8.008.8 3.299 0 5.918-.27 8.008-.8 2.23-.52 3.299-1.22 3.299-1.88 0-.47-.48-.93-1.35-1.28.2.13.35.35.35.59 0 .67-1.01 1.22-3.039 1.68-1.88.41-4.279.7-7.198.7-2.82 0-5.329-.29-7.138-.68-1.95-.48-2.97-1-2.97-1.68 0-.28.13-.52.52-.8-1.22.47-1.88.87-1.88 1.47.07.68 1.16 1.36 3.39 1.88zm4.689-2.16c2.27-.2 2.929-1.659 5.588-1.899 1.31-.1 2.14.16 2.23.62.08.43-.57.72-1.36.78-1.09.11-1.54-.28-1.63-.65-.81.09-.94.43-.9.67.09.46 1.07.92 2.75.76 1.9-.15 2.54-.9 2.38-1.65-.2-.98-1.66-1.8-4.28-1.55-3.359.3-3.339 1.86-5.628 2.05-.94.09-1.46-.13-1.55-.5-.06-.37.4-.55.94-.59.5-.05 1.11.04 1.4.2.21-.11.28-.22.26-.35-.1-.35-.79-.5-1.66-.44-1.7.15-1.7.91-1.64 1.25.17.87 1.48 1.45 3.1 1.3zm11.417 3.84c-2.1.49-4.779.809-8.008.809-3.3 0-5.989-.34-8.078-.8-1.88-.48-2.88-1.01-3.23-1.56.18 1.23.49 2.42.89 3.55-.48.3-.91.67-1.3 1.17a4.519 4.519 0 00-1.019 3.098 3.6 3.599 0 001.42 2.62c.87.68 1.81.88 2.879.68.41-.07.87-.28 1.29-.42-.88 0-1.62-.28-2.36-.87a3.55 3.549 0 01-1.49-2.42c-.2-.94 0-1.81.53-2.579.12-.15.25-.28.39-.4.3.73.62 1.45.98 2.12.81 1.23 1.62 2.299 2.43 3.459.35.68.58 1.35.74 2.019a3.899 3.899 0 002.229 1.5c1.15.4 2.35.58 3.579.51h.13a10.197 10.197 0 003.689-.52 4.179 4.179 0 002.16-1.49h.07c.13-.67.35-1.34.67-2.02.799-1.17 1.619-2.229 2.419-3.458A20.995 20.993 0 0024 7.612c-.43.6-1.44 1.13-3.25 1.54z"></path>
            </svg>
            <Text class="!text-white">Buy me a coffee</Text>
          </a>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>

      {/* Main Content */}
      <main
        data-outlet
        class="relative top-20 md:top-0 w-full max-w-[100dvw] overflow-hidden min-h-[calc(100dvh-3rem)] transition-all duration-300 ease-in-out rounded-xl md:rounded-md bg-white p-2 md:p-4 shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10"
      />

      {/* Footer Content */}
      <DocsLinks previous={null} next={null} />
    </div>
  );
}

function Routes() {
  return (
    <Menu vertical>
      {documentationLinks.map((link, index) => {
        if (link.children) {
          return (
            <SubMenu title={link.title} basePath="/components">
              {link.children.map((child) => (
                <MenuItem>
                  <Link href={child.link}>{child.title}</Link>
                </MenuItem>
              ))}
            </SubMenu>
          );
        }

        return (
          <MenuItem class={clsx(index === 0 && "mt-4")}>
            <Link href={link.link}>{link.title}</Link>
          </MenuItem>
        );
      })}
    </Menu>
  );
}

export function ToggleThemeButton() {
  return (
    <div class="mt-12 mx-auto">
      <ThemeController />
    </div>
  );
}

function MobileMenu() {
  return (
    <div class="fixed top-0 z-0 md:hidden w-full flex items-center justify-between py-4 px-4">
      <Link href="/" class="!w-fit">
        <Heading>TSFW</Heading>
      </Link>

      <ModalTrigger id="mobile-menu" color="ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </ModalTrigger>

      <Modal size="xs" variant="left" id="mobile-menu">
        <ModalBox>
          <div class="flex flex-col gap-4">
            <Routes />
            <ToggleThemeButton />
            <a
              href="https://www.buymeacoffee.com/cotter45"
              target="_blank"
              rel="noreferrer"
              class="flex gap-2 bg-emerald-600 !text-white items-center justify-center px-8 py-2 rounded-md mx-4 mt-2"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                role="img"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.645 7.472c2.1.53 4.779.8 8.008.8 3.299 0 5.918-.27 8.008-.8 2.23-.52 3.299-1.22 3.299-1.88 0-.47-.48-.93-1.35-1.28.2.13.35.35.35.59 0 .67-1.01 1.22-3.039 1.68-1.88.41-4.279.7-7.198.7-2.82 0-5.329-.29-7.138-.68-1.95-.48-2.97-1-2.97-1.68 0-.28.13-.52.52-.8-1.22.47-1.88.87-1.88 1.47.07.68 1.16 1.36 3.39 1.88zm4.689-2.16c2.27-.2 2.929-1.659 5.588-1.899 1.31-.1 2.14.16 2.23.62.08.43-.57.72-1.36.78-1.09.11-1.54-.28-1.63-.65-.81.09-.94.43-.9.67.09.46 1.07.92 2.75.76 1.9-.15 2.54-.9 2.38-1.65-.2-.98-1.66-1.8-4.28-1.55-3.359.3-3.339 1.86-5.628 2.05-.94.09-1.46-.13-1.55-.5-.06-.37.4-.55.94-.59.5-.05 1.11.04 1.4.2.21-.11.28-.22.26-.35-.1-.35-.79-.5-1.66-.44-1.7.15-1.7.91-1.64 1.25.17.87 1.48 1.45 3.1 1.3zm11.417 3.84c-2.1.49-4.779.809-8.008.809-3.3 0-5.989-.34-8.078-.8-1.88-.48-2.88-1.01-3.23-1.56.18 1.23.49 2.42.89 3.55-.48.3-.91.67-1.3 1.17a4.519 4.519 0 00-1.019 3.098 3.6 3.599 0 001.42 2.62c.87.68 1.81.88 2.879.68.41-.07.87-.28 1.29-.42-.88 0-1.62-.28-2.36-.87a3.55 3.549 0 01-1.49-2.42c-.2-.94 0-1.81.53-2.579.12-.15.25-.28.39-.4.3.73.62 1.45.98 2.12.81 1.23 1.62 2.299 2.43 3.459.35.68.58 1.35.74 2.019a3.899 3.899 0 002.229 1.5c1.15.4 2.35.58 3.579.51h.13a10.197 10.197 0 003.689-.52 4.179 4.179 0 002.16-1.49h.07c.13-.67.35-1.34.67-2.02.799-1.17 1.619-2.229 2.419-3.458A20.995 20.993 0 0024 7.612c-.43.6-1.44 1.13-3.25 1.54z"></path>
              </svg>
              <Text class="!text-white">Buy me a coffee</Text>
            </a>
          </div>
        </ModalBox>
      </Modal>
    </div>
  );
}
