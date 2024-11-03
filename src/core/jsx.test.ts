import { describe, it, expect, vi } from "vitest";

import { jsx } from "./jsx";

describe("jsx function", () => {
  it("should create a DOM element with the correct type", () => {
    const element = jsx("div");
    expect(element.tagName).toBe("DIV");
  });

  it("should apply attributes to the element", () => {
    const element = jsx("button", { id: "test-button", class: "btn" });
    expect(element.getAttribute("id")).toBe("test-button");
    expect(element.getAttribute("class")).toBe("btn");
  });

  it("should attach event listeners to the element", () => {
    const handleClick = vi.fn();
    const element = jsx("button", { onClick: handleClick });
    element.click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should render children elements as text nodes", () => {
    const element = jsx("div", null, "Hello", "World");
    expect(element.textContent).toBe("HelloWorld");
  });

  it("should handle nested elements as children", () => {
    const child = jsx("span", {}, "Nested");
    const parent = jsx("div", {}, child);
    expect(parent.firstChild).toBe(child);
    expect(parent.firstChild?.textContent).toBe("Nested");
  });

  it("should flatten nested arrays of children", () => {
    const element = jsx("div", {}, ["Child 1", ["Child 2", "Child 3"]]);
    expect(element.textContent).toBe("Child 1Child 2Child 3");
  });

  it("should handle functional components", () => {
    const FunctionalComponent = ({ children }: { children: any[] }) =>
      jsx("div", {}, ...children);
    const element = jsx(FunctionalComponent, {}, "Functional Child");
    expect(element.tagName).toBe("DIV");
    expect(element.textContent).toBe("Functional Child");
  });

  it("should ignore non-object props gracefully", () => {
    const element = jsx("div", null, "No Props");
    expect(element.tagName).toBe("DIV");
    expect(element.textContent).toBe("No Props");
  });
});
