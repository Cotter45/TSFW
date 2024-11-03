import { jsx } from "@core/jsx";
import App from "@pages/Index";
import Custom404 from "@pages/Custom404";
import FetchPage, { fetchData, FetchLoading } from "@pages/Fetch";

import { initRouter, registerRoute, setNotFoundComponent } from "@core/router";
import { ReactyData } from "@components/Reacty";
import MemoryPage from "@pages/Memory";
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
      path: "/why-jsx",
      component: async () => await import("@pages/WhyJSX"),
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
