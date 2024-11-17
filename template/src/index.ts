import { jsx } from "@core/jsx";
import { initRouter, registerRoutes, setNotFoundComponent } from "@core/router";

import App from "@pages/App";
import FourOhFour from "@pages/404";

(globalThis as any).jsx = jsx;
const appElement = document.getElementById("app")!;

registerRoutes({
  path: "/",
  component: App,
});

setNotFoundComponent(FourOhFour);

document.addEventListener("DOMContentLoaded", () => {
  initRouter(appElement);
});
