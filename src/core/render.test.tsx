import { jsx } from "./jsx";
import { describe, it, beforeEach, expect, vi } from "vitest";
import {
  initRouter,
  render,
  navigateTo,
  handleRoute,
  registerRoute,
  getCacheState,
} from "../core/router";
import Reacty, { ChildReacty } from "../components/Reacty";
import { afterEach } from "node:test";

let rootElement: HTMLElement;

beforeEach(() => {
  vi.useFakeTimers();
  rootElement = document.createElement("div");
  rootElement.dataset.testid = "root";

  const outlet = document.createElement("div");
  outlet.setAttribute("data-outlet", "true");
  rootElement.appendChild(outlet);

  document.body.innerHTML = "";
  document.body.appendChild(rootElement);
  initRouter(rootElement);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("render", () => {
  it("should render Reacty component in rootElement when isChild is false", async () => {
    await render(Reacty(), false, {
      params: { id: "123" },
      searchParams: new URLSearchParams(),
      data: null,
      error: null,
    });
    expect(rootElement.innerHTML).toContain("Hello, World!");
  });

  it("should render ChildReacty component inside outlet when isChild is true", async () => {
    const outlet = document.createElement("div");
    outlet.dataset.outlet = "true";
    rootElement.appendChild(outlet);
    await render(ChildReacty(), true, {
      params: { id: "123" },
      searchParams: new URLSearchParams(),
      data: null,
      error: null,
    });
    expect(outlet.innerHTML).toContain("Child Reacty");
  });
});

describe("navigateTo", () => {
  it("should update URL and call handleRoute with correct path and params", () => {
    const path = "/example-path";
    const params = { id: "123" };
    const searchParams = { q: "searchTerm" };
    // @ts-expect-error
    navigateTo(path, params, searchParams);
    expect(window.location.pathname).toContain(path);
    expect(window.location.search).toContain("q=searchTerm");
  });
});

describe("handleRoute", () => {
  const mockRoutes = [
    {
      pathPattern: /^\/example-path\/(\d+)$/,
      paramNames: ["id"],
      component: Reacty,
      loader: async () => "test data",
      fallback: ChildReacty,
      cacheKey: "/example-path",
      ttl: 60000,
    },
  ];

  it("should render not found component when no route matches", async () => {
    window.location.pathname = "/invalid-path";
    await handleRoute();
    expect(rootElement.innerHTML).toContain("Not Found");
  });

  it("should render component when route matches", async () => {
    window.location.pathname = "/example-path";
    registerRoute({
      path: "/example-path",
      component: Reacty,
    });
    await handleRoute();
    expect(rootElement.innerHTML).toContain("Hello, World!");
  });

  it("should render component when route matches with trailing slash", async () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { pathname: "/example-path/" },
    });
    registerRoute({
      path: "/example-path",
      component: Reacty,
    });
    await handleRoute();
    expect(rootElement.innerHTML).toContain("Hello, World!");
  });

  it("should render component with params when route matches", async () => {
    window.location.pathname = "/example-path/123";
    registerRoute({
      path: "/example-path/:id",
      component: Reacty,
    });
    await handleRoute();
    expect(rootElement.innerHTML).toContain("Hello, World!");
  });
});

describe("getCacheState", () => {
  it("should return null when cache is empty", async () => {
    const result = await getCacheState("test", "memory");

    // @ts-expect-error
    expect(result.key).toBe("test");
    // @ts-expect-error
    expect(result.listeners).toEqual(new Set());
    // @ts-expect-error
    expect(result.proxy).toEqual({
      data: null,
      error: null,
      expires: 0,
    });
  });
});
