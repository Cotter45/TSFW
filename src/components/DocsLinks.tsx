import { routerState } from "@core/router";
import { Link } from "./ui/Link";
import type { RoutePaths } from "@core/routes";

export const documentationLinks = [
  { title: "Welcome", link: "/" },
  { title: "Getting Started", link: "/getting-started" },
  { title: "Router", link: "/router" },
  { title: "State", link: "/state" },
  {
    title: "Components",
    link: "/components",
    children: [
      { title: "Overview", link: "/components" },
      { title: "Accordion", link: "/components/accordion" },
      { title: "Avatar", link: "/components/avatar" },
      { title: "Badge", link: "/components/badge" },
      { title: "Button", link: "/components/button" },
      { title: "Card", link: "/components/card" },
      { title: "Carousel", link: "/components/carousel" },
      { title: "Charts", link: "/components/charts" },
      { title: "Dropdown", link: "/components/dropdown" },
      { title: "Forms", link: "/components/forms" },
      { title: "Link", link: "/components/link" },
    ],
  },
  { title: "Testing", link: "/testing" },
  { title: "FAQ", link: "/faq" },
  { title: "Examples", link: "/examples" },
] as {
  title: string;
  link: RoutePaths;
  children?: { title: string; link: RoutePaths }[];
}[];

export type DocumentationLink = (typeof documentationLinks)[number];

export function DocsLinks() {
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

  routerState.subscribe(updateLinks, "docs-links");

  return (
    <div
      id="docs-smol-navigation-container"
      class="flex justify-between mt-24 md:hidden px-2 pt-10"
    />
  );
}

function renderLinks(
  container: HTMLElement,
  previous: DocumentationLink | null,
  next: DocumentationLink | null
) {
  container.innerHTML = "";

  if (previous) {
    const previousLinkElement = document.createElement("div");
    previousLinkElement.id = "docs-previous-link";
    previousLinkElement.appendChild(
      PreviousLink({ href: previous.link, title: previous.title })
    );
    container.appendChild(previousLinkElement);
  }

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
  return (
    <Link href={href} class="!text-emerald-500">
      ← {title}
    </Link>
  );
}

function NextLink({ href, title }: { href: RoutePaths; title: string }) {
  return (
    <Link href={href} class="!text-emerald-500">
      {title} →
    </Link>
  );
}
