import { routerState } from "@core/router";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import { RoutePaths } from "@core/routes";

export const documentationLinks = [
  { title: "Welcome", link: "/" },
  { title: "Getting Started", link: "/getting-started" },
  { title: "Router", link: "/router" },
  { title: "State", link: "/state" },
  { title: "Testing", link: "/testing" },
  { title: "FAQ", link: "/faq" },
  { title: "Examples", link: "/examples" },
] as const;

export type DocumentationLink = (typeof documentationLinks)[number];

export function PreviousNextLinks() {
  let previous: DocumentationLink | null = null;
  let next: DocumentationLink | null = null;

  const updateLinks = (state: { path: string }) => {
    const route = state.path;
    const index = documentationLinks.findIndex((link) => link.link === route);

    if (index === -1) {
      previous = null;
      next = null;
    } else {
      previous = documentationLinks[index - 1] || null;
      next = documentationLinks[index + 1] || null;
    }

    const smolNavContainer = document.getElementById(
      "docs-smol-navigation-container"
    );
    if (smolNavContainer) {
      renderLinks(smolNavContainer, previous, next);
    }
  };

  routerState.subscribe(updateLinks);

  return (
    <div
      id="docs-smol-navigation-container"
      class="flex justify-between mt-8 md:hidden px-2 pt-10"
    ></div>
  );
}

function renderLinks(
  container: HTMLElement,
  previous: DocumentationLink | null,
  next: DocumentationLink | null
) {
  container.innerHTML = ""; // Clear existing links

  // Render Previous Link
  if (previous) {
    const previousLinkElement = document.createElement("div");
    previousLinkElement.id = "docs-previous-link";
    previousLinkElement.appendChild(
      PreviousLink({ href: previous.link, title: previous.title })
    );
    container.appendChild(previousLinkElement);
  }

  // Render Next Link
  if (next) {
    const nextLinkElement = document.createElement("div");
    nextLinkElement.id = "docs-next-link";
    nextLinkElement.className = "ml-auto";
    nextLinkElement.appendChild(
      NextLink({ href: next.link, title: next.title })
    );
    container.appendChild(nextLinkElement);
  }
}

function PreviousLink({ href, title }: { href: RoutePaths; title: string }) {
  const link = document.createElement("a");
  link.href = href;
  link.className = "text-emerald-500 hover:underline flex items-center";
  link.innerHTML = `<button class="bg-transparent text-emerald-500 border-0">← ${title}</button>`;
  return link;
}

function NextLink({ href, title }: { href: RoutePaths; title: string }) {
  const link = document.createElement("a");
  link.href = href;
  link.className = "text-emerald-500 hover:underline flex items-center";
  link.innerHTML = `<button class="bg-transparent text-emerald-500 border-0">${title} →</button>`;
  return link;
}
