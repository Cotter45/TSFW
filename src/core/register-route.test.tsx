import { describe, it, expect, beforeEach } from "vitest";
import { registerRoute, routes } from "./router";

describe("registerRoute", () => {
  beforeEach(() => {
    routes.length = 0;
  });

  it("should register a route successfully with a valid path and component", () => {
    const mockComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/valid-route",
        component: mockComponent,
      })
    ).not.toThrow();

    expect(routes.length).toBe(1);
    expect(routes[0].component).toBe(mockComponent);
  });

  it("should throw an error if path is invalid", () => {
    const mockComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "no-slash",
        component: mockComponent,
      })
    ).toThrow("Invalid path: no-slash");

    expect(() =>
      registerRoute({
        path: "/invalid@path",
        component: mockComponent,
      })
    ).toThrow("Invalid path: /invalid@path");

    expect(() =>
      registerRoute({
        path: "/invalid/:",
        component: mockComponent,
      })
    ).toThrow("Invalid path: /invalid/:");
  });

  it("should throw an error if component is invalid", () => {
    expect(() =>
      registerRoute({
        path: "/test",
        // @ts-expect-error: Testing invalid component type
        component: "notAFunction",
      })
    ).toThrow("Invalid component: notAFunction");
  });

  it("should throw an error if fallback is invalid", () => {
    const mockComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/test",
        component: mockComponent,
        // @ts-expect-error: Testing invalid fallback type
        fallback: "notAFunction",
      })
    ).toThrow("Invalid fallback component: notAFunction");
  });

  it("should throw an error if loader is invalid", () => {
    const mockComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/test",
        component: mockComponent,
        // @ts-expect-error: Testing invalid loader type
        loader: "notAFunction",
      })
    ).toThrow("Invalid loader function: notAFunction");
  });

  it("should throw an error if cacheLoader is invalid", () => {
    const mockComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/test",
        component: mockComponent,
        // @ts-expect-error: Testing invalid cacheLoader type
        cacheLoader: 123,
      })
    ).toThrow("Invalid cache loader type: 123");

    expect(() =>
      registerRoute({
        path: "/test",
        component: mockComponent,
        // @ts-expect-error: Testing invalid cacheLoader type
        cacheLoader: "invalidType",
      })
    ).toThrow("Invalid cache loader type: invalidType");
  });

  it("should throw an error if cacheKey is invalid", () => {
    const mockComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/test",
        component: mockComponent,
        // @ts-expect-error: Testing invalid cacheKey type
        cacheKey: 123,
      })
    ).toThrow("Invalid cache key: 123");
  });

  it("should throw an error if TTL is invalid", () => {
    const mockComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/test",
        component: mockComponent,
        // @ts-expect-error: Testing invalid TTL type
        ttl: "notANumber",
      })
    ).toThrow("Invalid TTL: notANumber");

    expect(() =>
      registerRoute({
        path: "/test",
        component: mockComponent,
        ttl: -100,
      })
    ).toThrow("Invalid TTL: -100");
  });

  it("should register child routes successfully", () => {
    const mockParentComponent = () => document.createElement("div");
    const mockChildComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/parent",
        component: mockParentComponent,
        children: [{ path: "/child", component: mockChildComponent }],
      })
    ).not.toThrow();

    expect(routes.length).toBe(2);
    expect(routes[0].component).toBe(mockParentComponent);
    expect(routes[1].component).toBe(mockChildComponent);
  });

  it("should throw an error if child routes are invalid", () => {
    const mockParentComponent = () => document.createElement("div");

    expect(() =>
      registerRoute({
        path: "/parent",
        component: mockParentComponent,
        children: [
          // @ts-expect-error: Testing invalid child path
          { path: null, component: () => document.createElement("div") },
        ],
      })
    ).toThrow("Invalid path: null");

    expect(() =>
      registerRoute({
        path: "/parent",
        component: mockParentComponent,
        children: [
          // @ts-expect-error: Testing invalid child component
          { path: "/child", component: "notAFunction" },
        ],
      })
    ).toThrow("Invalid component: notAFunction");
  });
});
