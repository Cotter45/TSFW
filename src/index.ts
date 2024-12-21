import { jsx } from "@core/jsx";

import App from "@pages/Index";
import WelcomePage from "@pages/Welcome";
import Custom404 from "@pages/Custom404";

import { initRouter, registerRoutes, setNotFoundComponent } from "@core/router";

(globalThis as any).jsx = jsx;
const appElement = document.getElementById("app")!;

registerRoutes({
	path: "/",
	component: App,
	meta: {
		title: "TSFW",
		description:
			"A lightweight framework for building web apps with TypeScript.",
	},
	children: [
		{
			path: "/",
			component: WelcomePage,
			meta: {
				title: "Welcome to TSFW",
				description:
					"A lightweight framework for building web apps with TypeScript.",
			},
		},
		{
			path: "/getting-started",
			component: async () => await import("@pages/GettingStarted"),
			meta: {
				title: "Getting Started with TSFW",
				description: "Learn how to get started with TSFW.",
			},
		},
		{
			path: "/router",
			component: async () => await import("@pages/Router"),
			meta: {
				title: "Type-Safe Routing",
				description: "Learn how to use type-safe routing in TSFW.",
			},
		},
		{
			path: "/state",
			component: async () => await import("@pages/State"),
			meta: {
				title: "State Management",
				description: "Learn how to manage state in TSFW.",
			},
		},
		{
			path: "/components",
			component: async () => await import("@pages/components/Index"),
			children: [
				{
					path: "/accordion",
					component: async () => await import("@pages/components/Accordion"),
					meta: {
						title: "Accordion Component",
						description: "Learn how to use the Accordion component in TSFW.",
					},
				},
				{
					path: "/avatar",
					component: async () => await import("@pages/components/Avatar"),
					meta: {
						title: "Avatar Component",
						description: "Learn how to use the Avatar component in TSFW.",
					},
				},
				{
					path: "/badge",
					component: async () => await import("@pages/components/Badge"),
					meta: {
						title: "Badge Component",
						description: "Learn how to use the Badge component in TSFW.",
					},
				},
				{
					path: "/button",
					component: async () => await import("@pages/components/Button"),
					meta: {
						title: "Button Component",
						description: "Learn how to use the Button component in TSFW.",
					},
				},
				{
					path: "/card",
					component: async () => await import("@pages/components/Card"),
					meta: {
						title: "Card Component",
						description: "Learn how to use the Card component in TSFW.",
					},
				},
				{
					path: "/carousel",
					component: async () => await import("@pages/components/Carousel"),
					meta: {
						title: "Carousel Component",
						description: "Learn how to use the Carousel component in TSFW.",
					},
				},
				{
					path: "/charts",
					component: async () => await import("@pages/components/Charts"),
					meta: {
						title: "Charts Component",
						description: "Learn how to use the Charts component in TSFW.",
					},
				},
				{
					path: "/dropdown",
					component: async () => await import("@pages/components/Dropdown"),
					meta: {
						title: "Dropdown Component",
						description: "Learn how to use the Dropdown component in TSFW.",
					},
				},
				{
					path: "/forms",
					component: async () => await import("@pages/components/Form"),
					meta: {
						title: "Forms Components",
						description: "Learn how to use the Forms component in TSFW.",
					},
				},
				{
					path: "/link",
					component: async () => await import("@pages/components/Link"),
					meta: {
						title: "Link Component",
						description: "Learn how to use the Link component in TSFW.",
					},
				},
				{
					path: "/menu",
					component: async () => await import("@pages/components/Menu"),
					meta: {
						title: "Menu Component",
						description: "Learn how to use the Menu component in TSFW.",
					},
				},
				{
					path: "/modal",
					component: async () => await import("@pages/components/Modal"),
					meta: {
						title: "Modal Component",
						description: "Learn how to use the Modal component in TSFW.",
					},
				},
				{
					path: "/table",
					component: async () => await import("@pages/components/Table"),
					meta: {
						title: "Table Component",
						description: "Learn how to use the Table component in TSFW.",
					},
				},
				{
					path: "/text",
					component: async () => await import("@pages/components/Text"),
					meta: {
						title: "Text Component",
						description: "Learn how to use the Text component in TSFW.",
					},
				},
				{
					path: "/theme-controller",
					component: async () =>
						await import("@pages/components/ThemeController"),
					meta: {
						title: "ThemeController Component",
						description:
							"Learn how to use the ThemeController component in TSFW.",
					},
				},
			],
			meta: {
				title: "Components",
				description: "Explore the components available in TSFW.",
			},
		},
		{
			path: "/testing",
			component: async () => await import("@pages/Testing"),
			meta: {
				title: "Testing",
				description: "Learn how to test your TSFW app.",
			},
		},
		{
			path: "/faq",
			component: async () => await import("@pages/Faq"),
			meta: {
				title: "FAQ",
				description: "Get answers to frequently asked questions about TSFW.",
			},
		},
		{
			path: "/examples",
			component: async () => await import("@pages/Examples"),
			meta: () => ({
				title: "Examples",
				description: "Explore examples of TSFW applications.",
			}),
		},
	],
});

// Set custom 404 component
setNotFoundComponent(Custom404);

document.addEventListener("DOMContentLoaded", () => {
	initRouter(appElement);
});
