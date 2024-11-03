import { describe, it, beforeEach, vi, expect, afterEach } from "vitest";
import {
  notFoundComponent,
  initRouter,
  routes,
  rootElement,
  registerRoute,
  setNotFoundComponent,
  resolvePath,
  generatePathPattern,
  resolveComponent,
} from "./router";

describe("Default not found component", () => {
  it("should be a function", () => {
    expect(notFoundComponent).toBeDefined();
  });

  it("should return a component", () => {
    expect(notFoundComponent()).toBeDefined();
  });
});

describe("initRouter", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should be a function", () => {
    expect(initRouter).toBeDefined();
  });

  it("should initialize router", () => {
    const root = document.createElement("div");

    initRouter(root);
    expect(rootElement).toBeDefined();

    expect(rootElement).toBe(root);
    expect(routes).toEqual([]);
  });
});

describe("registerRoute", () => {
  // Test valid registration
  it("should register a route successfully with a valid path and component", () => {
    const mockComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/valid-route",
        component: mockComponent,
      })
    ).not.toThrow();
  });

  // Test component validation
  it("should throw an error if component is missing or not a function", () => {
    // @ts-expect-error: Testing missing component
    expect(() => registerRoute({ path: "/test" })).toThrow(
      "A valid component function is required for route definition."
    );

    expect(() =>
      // @ts-expect-error: Testing invalid component type
      registerRoute({ path: "/test", component: "notAFunction" })
    ).toThrow("A valid component function is required for route definition.");
  });

  // Test path validation
  it("should throw an error for invalid paths", () => {
    // Missing leading slash
    expect(() =>
      registerRoute({
        path: "no-slash",
        component: () => document.createElement("div"),
      })
    ).toThrow("Invalid route path.");

    // Invalid characters
    expect(() =>
      registerRoute({
        path: "/invalid@path",
        component: () => document.createElement("div"),
      })
    ).toThrow("Invalid route path.");

    // Ends with colon
    expect(() =>
      registerRoute({
        path: "/invalid/:",
        component: () => document.createElement("div"),
      })
    ).toThrow("Invalid route path.");
  });

  // Test cacheLoader validation
  it("should throw an error for invalid cacheLoader option", () => {
    expect(() =>
      registerRoute({
        path: "/test",
        component: () => document.createElement("div"),
        // @ts-expect-error: Testing invalid cacheLoader
        cacheLoader: "invalidType",
      })
    ).toThrow(
      "Invalid cacheLoader type 'invalidType'. Supported types are: memory, localStorage, sessionStorage, indexedDB, none."
    );
  });

  // Test TTL validation
  it("should throw an error if TTL is not a positive integer", () => {
    expect(() =>
      registerRoute({
        path: "/test",
        component: () => document.createElement("div"),
        ttl: -100,
      })
    ).toThrow(
      "TTL (Time-to-Live) must be a positive integer representing milliseconds."
    );

    expect(() =>
      registerRoute({
        path: "/test",
        component: () => document.createElement("div"),
        ttl: "notANumber" as unknown as number,
      })
    ).toThrow(
      "TTL (Time-to-Live) must be a positive integer representing milliseconds."
    );
  });

  // Test loader validation
  it("should throw an error if loader is not a function", () => {
    expect(() =>
      registerRoute({
        path: "/test",
        component: () => document.createElement("div"),
        // @ts-expect-error: Testing invalid loader
        loader: "notAFunction",
      })
    ).toThrow("Loader must be a function that returns data or a Promise.");
  });

  // Test fallback validation
  it("should throw an error if fallback is not a function", () => {
    expect(() =>
      registerRoute({
        path: "/test",
        component: () => document.createElement("div"),
        // @ts-expect-error: Testing invalid fallback
        fallback: "notAFunction",
      })
    ).toThrow("Fallback must be a function that returns an HTML element.");
  });

  // Test children validation
  it("should validate child routes with valid paths and components", () => {
    const mockParentComponent = () => document.createElement("div");
    const mockChildComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/parent",
        component: mockParentComponent,
        children: [{ path: "/parent/child", component: mockChildComponent }],
      })
    ).not.toThrow();
  });

  it("should throw an error if child routes have invalid path or component", () => {
    const mockParentComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/parent",
        component: mockParentComponent,
        children: [
          // Invalid path
          {
            path: "child-no-slash",
            component: () => document.createElement("div"),
          },
        ],
      })
    ).toThrow("Invalid route path.");

    expect(() =>
      registerRoute({
        path: "/parent",
        component: mockParentComponent,
        children: [
          // @ts-expect-error
          { path: 5 },
        ],
      })
    ).toThrow("Each child route must have a valid 'path' string.");

    expect(() =>
      registerRoute({
        path: "/parent",
        component: mockParentComponent,
        children: [
          // @ts-expect-error
          { path: "/parent/child" },
        ],
      })
    ).toThrow("Each child route must have a valid component function.");

    expect(() =>
      registerRoute({
        path: "/parent",
        component: mockParentComponent,
        children: [
          // @ts-expect-error
          { path: "/parent/child", component: "notAFunction" },
        ],
      })
    ).toThrow("Each child route must have a valid component function.");
  });
});

describe("setNotFoundComponent", () => {
  it("should set a custom not found component", () => {
    const customNotFoundComponent = () => document.createElement("div");

    setNotFoundComponent(customNotFoundComponent);

    expect(notFoundComponent).toBe(customNotFoundComponent);
  });
});

describe("resolvePath", () => {
  it("should resolve a path with parameters", () => {
    const path = "/test/:id";
    const params = { id: "123" };

    expect(resolvePath(path, params)).toBe("/test/123");
  });

  it("should resolve a path without parameters", () => {
    const path = "/test";

    expect(resolvePath(path, {})).toBe("/test");
  });
});

describe("generatePathPattern", () => {
  it("should generate a regex pattern and capture no parameters for a static path", () => {
    const { pathPattern, paramNames } = generatePathPattern("/home");
    expect(pathPattern.test("/home")).toBe(true);
    expect(paramNames).toEqual([]);
  });

  it("should generate a regex pattern and capture a single parameter", () => {
    const { pathPattern, paramNames } = generatePathPattern("/user/:id");
    expect(pathPattern.test("/user/123")).toBe(true);
    expect(paramNames).toEqual(["id"]);
  });

  it("should capture multiple parameters in the path", () => {
    const { pathPattern, paramNames } = generatePathPattern(
      "/user/:id/profile/:section"
    );
    expect(pathPattern.test("/user/123/profile/settings")).toBe(true);
    expect(paramNames).toEqual(["id", "section"]);
  });

  it("should handle paths with parameters in the middle of the path", () => {
    const { pathPattern, paramNames } = generatePathPattern(
      "/shop/:category/items"
    );
    expect(pathPattern.test("/shop/electronics/items")).toBe(true);
    expect(paramNames).toEqual(["category"]);
  });

  it("should fail to match a path if required parameters are missing", () => {
    const { pathPattern } = generatePathPattern("/user/:id/profile/:section");
    expect(pathPattern.test("/user/123")).toBe(false);
  });

  it("should fail to match if an extra path segment is present", () => {
    const { pathPattern } = generatePathPattern("/user/:id");
    expect(pathPattern.test("/user/123/extra")).toBe(false);
  });

  it("should handle paths with no parameters or trailing slashes", () => {
    const { pathPattern, paramNames } = generatePathPattern("/static/path/");
    expect(pathPattern.test("/static/path/")).toBe(true);
    expect(paramNames).toEqual([]);
  });

  it("should generate a regex pattern that ends with '$' to ensure exact matches", () => {
    const { pathPattern } = generatePathPattern("/exact");
    expect(pathPattern.test("/exact")).toBe(true);
    expect(pathPattern.test("/exact/extra")).toBe(false);
  });

  it("should return an empty paramNames array for paths without parameters", () => {
    const { paramNames } = generatePathPattern("/simple/path");
    expect(paramNames).toEqual([]);
  });

  it("should match paths with hyphens or underscores in the parameter name", () => {
    const { pathPattern, paramNames } = generatePathPattern(
      "/user/:user_id/details/:section-name"
    );
    expect(pathPattern.test("/user/42/details/profile")).toBe(true);
    expect(paramNames).toEqual(["user_id", "section-name"]);
  });

  it("should match paths with special characters in the parameter values", () => {
    const { pathPattern, paramNames } = generatePathPattern("/product/:id");
    expect(pathPattern.test("/product/123-abc_def")).toBe(true);
    expect(paramNames).toEqual(["id"]);
  });

  it("should not match an invalid path", () => {
    const { pathPattern } = generatePathPattern("/valid/path");
    expect(pathPattern.test("invalid/path")).toBe(false);
  });
});

describe("resolveComponent", () => {
  const mockProps = {
    params: { id: "123" },
    searchParams: new URLSearchParams("?q=test"),
    data: { exampleData: true },
    error: null,
  };

  it("should return an HTMLElement for a synchronous component", async () => {
    const syncComponent = (props: any) => {
      const element = document.createElement("div");
      element.textContent = `ID: ${props.params.id}`;
      return element;
    };

    const result = await resolveComponent(syncComponent, mockProps);
    expect(result).toBeInstanceOf(HTMLElement);
    expect(result.textContent).toBe("ID: 123");
  });

  it("should return an HTMLElement for an asynchronous component", async () => {
    const asyncComponent = async (props: any) => {
      const element = document.createElement("div");
      element.textContent = `ID: ${props.params.id}`;
      return element;
    };

    const result = await resolveComponent(asyncComponent, mockProps);
    expect(result).toBeInstanceOf(HTMLElement);
    expect(result.textContent).toBe("ID: 123");
  });

  it("should return an HTMLElement for a component with a default export function", async () => {
    const componentWithDefaultExport: any = {
      default: (props: any) => {
        const element = document.createElement("div");
        element.textContent = `ID: ${props.params.id}`;
        return element;
      },
    };

    const result = await resolveComponent(
      componentWithDefaultExport,
      mockProps
    );
    expect(result).toBeInstanceOf(HTMLElement);
    expect(result.textContent).toBe("ID: 123");
  });

  it("should return an HTMLElement for a component with a default export HTMLElement", async () => {
    const element = document.createElement("div");
    element.textContent = "Default Export Element";
    const componentWithDefaultExport: any = { default: element };

    const result = await resolveComponent(
      componentWithDefaultExport,
      mockProps
    );
    expect(result).toBeInstanceOf(HTMLElement);
    expect(result.textContent).toBe("Default Export Element");
  });

  it("should throw an error if component does not return an HTMLElement", async () => {
    const invalidComponent: any = () => "This is not an HTMLElement";

    await expect(resolveComponent(invalidComponent, mockProps)).rejects.toThrow(
      "Error resolving component: Component must return an HTMLElement, an object with a default export, or a function returning an HTMLElement."
    );
  });

  it("should throw an error if default export is neither an HTMLElement nor a function", async () => {
    const invalidDefaultComponent: any = { default: "Invalid default export" };

    await expect(
      resolveComponent(invalidDefaultComponent, mockProps)
    ).rejects.toThrow(
      "Error resolving component: Default export must be an HTMLElement or a function returning HTMLElement."
    );
  });

  it("should throw an error if default export function does not return an HTMLElement", async () => {
    const invalidDefaultComponent: any = {
      default: () => "This is not an HTMLElement",
    };

    await expect(
      resolveComponent(invalidDefaultComponent, mockProps)
    ).rejects.toThrow(
      "Error resolving component: The default export function did not return a valid HTMLElement."
    );
  });

  it("should catch errors thrown within the component function", async () => {
    const errorThrowingComponent = () => {
      throw new Error("Component error");
    };

    await expect(
      resolveComponent(errorThrowingComponent, mockProps)
    ).rejects.toThrow("Error resolving component: Component error");
  });
});
