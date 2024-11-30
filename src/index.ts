import { jsx } from "@core/jsx";
import App from "@pages/Index";
import Custom404 from "@pages/Custom404";

import { initRouter, registerRoutes, setNotFoundComponent } from "@core/router";
import WelcomePage from "@pages/Welcome";

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
					path: "/button",
					component: async () => await import("@pages/components/Button"),
					meta: {
						title: "Button Component",
						description: "Learn how to use the Button component in TSFW.",
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
