// src/components/App.tsx
import { createState } from "@core/state";

import { Link } from "@components/ui/Link";
import { Heading } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import {
  DialogTrigger,
  Dialog,
  DialogBody,
  DialogTitle,
} from "@components/ui/Dialog";

export default function App() {
  return (
    <div class="w-full h-full flex flex-col md:flex-row px-2 pb-2 md:px-0 md:pt-2 md:pr-2 bg-zinc-100 dark:bg-zinc-950 max-h-screen overflow-hidden">
      <div class="relative w-full max-w-full md:max-w-[300px] min-w-[300px]">
        {/* Sidebar for larger screens */}
        <div class="max-w-0 max-h-0 md:max-h-screen overflow-y-auto overflow-x-hidden md:w-full md:max-w-full md:flex flex-col gap-4 -my-1 rounded-r-md md:pb-4 md:p-4">
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
        class="w-full h-full transition-all duration-300 ease-in-out rounded-xl md:rounded-md bg-white p-4 md:p-6 shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10 overflow-y-auto"
      />
    </div>
  );
}

function Routes() {
  return (
    <div className="pl-2 flex flex-col">
      <Link href="/">Welcome</Link>
      <Link href="/why-jsx">Why JSX</Link>
      <Link href="/getting-started">Getting Started</Link>
      <Link href="/router">Router</Link>
      <Link href="/state">State</Link>
      <Link href="/testing">Testing</Link>
      <Link href="/faq">Faq</Link>
      <Link href="/examples">Examples</Link>
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

    const themeText = document.querySelector("#theme-text");
    if (themeText) {
      themeText.textContent = theme;
    }
  }

  return (
    <Button onClick={toggleTheme} variant="plain" class="mx-2">
      <span id="theme-text">{themeState.getState().theme}</span>
    </Button>
  );
}

function MobileMenu() {
  return (
    <div class="md:hidden w-full flex items-center justify-between py-2">
      <DialogTrigger uniqueId="mobile-menu">
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

      <Link href="/" class="!w-fit">
        <Heading>TSFW</Heading>
      </Link>
      <Dialog size="xs" variant="left" uniqueId="mobile-menu">
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
