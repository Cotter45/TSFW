import { jsx } from "@core/jsx";
import { initRouter, registerRoute, setNotFoundComponent } from "@core/router";

import App from "@pages/Index";
import FourOhFour from "@pages/404";

(globalThis as any).jsx = jsx;
const appElement = document.getElementById("app")!;

registerRoute({
  path: "/",
  component: App,
});

setNotFoundComponent(FourOhFour);

document.addEventListener("DOMContentLoaded", () => {
  initRouter(appElement);
});
