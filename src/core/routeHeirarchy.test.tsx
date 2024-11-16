import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import * as router from "./router";

vi.mock("./router");

const BaseComponent = () => {
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

describe("renderRouteHierarchy", () => {
  let signal: AbortSignal;
  let abortController: AbortController;

  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
    const root = document.getElementById("app")!;

    router.registerRoute({
      path: "/",
      component: BaseComponent,
    });

    router.initRouter(root!);
    abortController = new AbortController();
    signal = abortController.signal;
    router.routes.length = 0;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("should handle an aborted signal", async () => {
    abortController.abort();
    const route = {
      component: () => document.createElement("div"),
      pathPattern: /test/,
      paramNames: [],
    };

    await router.renderRouteHierarchy(route, new URLSearchParams(), {}, signal);
    expect(router.render).not.toHaveBeenCalled();
  });
});
