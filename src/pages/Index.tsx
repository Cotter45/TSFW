// src/components/App.tsx
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";

import { createState } from "@core/state";

import { Link } from "@components/ui/Link";
import { Heading } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import {
  DialogTrigger,
  Dialog,
  DialogBody,
  DialogTitle,
  closeDialog,
} from "@components/ui/Dialog";

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
        <div class="sticky top-1 left-0 max-w-0 max-h-0 md:max-h-screen overflow-y-auto overflow-x-hidden md:w-full md:max-w-full md:flex flex-col gap-4 -my-1 rounded-r-md md:pb-4 md:p-4">
          <Heading>TSFW</Heading>
          <Routes />

          <ToggleThemeButton />
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>

      {/* Main Content */}
      <main
        data-outlet
        class="w-full max-w-[100dvw] overflow-hidden min-h-[calc(100dvh-3rem)] transition-all duration-300 ease-in-out rounded-xl md:rounded-md bg-white p-2 md:p-4 shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10"
      />
    </div>
  );
}

function Routes() {
  return (
    <div className="pl-2 flex flex-col">
      <Link href="/" onclick={() => closeDialog("mobile-menu")}>
        Welcome
      </Link>
      <Link href="/getting-started" onclick={() => closeDialog("mobile-menu")}>
        Getting Started
      </Link>
      <Link href="/router" onclick={() => closeDialog("mobile-menu")}>
        Router
      </Link>
      <Link href="/state" onclick={() => closeDialog("mobile-menu")}>
        State
      </Link>
      <Link href="/testing" onclick={() => closeDialog("mobile-menu")}>
        Testing
      </Link>
      <Link href="/faq" onclick={() => closeDialog("mobile-menu")}>
        Faq
      </Link>
      <Link href="/examples" onclick={() => closeDialog("mobile-menu")}>
        Examples
      </Link>
    </div>
  );
}

const themeState = createState("theme", {
  theme: document.documentElement.classList.contains("dark")
    ? "🌚 Dark Mode"
    : "🌞 Light Mode",
});

export function ToggleThemeButton() {
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    const theme = document.documentElement.classList.contains("dark")
      ? "🌚 Dark Mode"
      : "🌞 Light Mode";

    themeState.setState({ theme });

    const themeTexts = document.querySelectorAll("#theme-text");
    if (themeTexts && themeTexts.length > 0) {
      themeTexts.forEach((themeText) => {
        themeText.textContent = theme;
      });
    }
  }

  return (
    <Button onClick={toggleTheme} variant="plain" class="mt-12 mx-2">
      <span id="theme-text">{themeState.getState().theme}</span>
    </Button>
  );
}

function MobileMenu() {
  return (
    <div class="md:hidden w-full flex items-center justify-between py-4">
      <Link href="/" class="!w-fit">
        <Heading>TSFW</Heading>
      </Link>

      <DialogTrigger id="mobile-menu">
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
      </DialogTrigger>
      <Dialog size="xs" variant="left" id="mobile-menu">
        <DialogTitle>TSFW</DialogTitle>
        <DialogBody>
          <div class="flex flex-col gap-4">
            <Routes />

            <ToggleThemeButton />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
