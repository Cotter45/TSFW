import { jsx } from "@core/jsx";
import App from "@pages/Index";
import Custom404 from "@pages/Custom404";

import { initRouter, registerRoute, setNotFoundComponent } from "@core/router";
import WelcomePage from "@pages/Welcome";

(globalThis as any).jsx = jsx;
const appElement = document.getElementById("app")!;

registerRoute({
  path: "/",
  component: App,
  children: [
    {
      path: "/",
      component: WelcomePage,
    },
    {
      path: "/getting-started",
      component: async () => await import("@pages/GettingStarted"),
    },
    {
      path: "/router",
      component: async () => await import("@pages/Router"),
    },
    {
      path: "/state",
      component: async () => await import("@pages/State"),
    },
    {
      path: "/testing",
      component: async () => await import("@pages/Testing"),
    },
    {
      path: "/examples",
      component: async () => await import("@pages/Examples"),
    },
    {
      path: "/faq",
      component: async () => await import("@pages/Faq"),
    },
  ],
});

// Set custom 404 component
setNotFoundComponent(Custom404);

document.addEventListener("DOMContentLoaded", () => {
  initRouter(appElement);
});
