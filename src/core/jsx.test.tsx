import { describe, it, expect, vi } from "vitest";
import { jsx } from "./jsx";

describe("jsx function", () => {
	it("should create a DOM element with the correct type", () => {
		const element = jsx("div");
		expect(element!.tagName).toBe("DIV");
	});

	it("should apply attributes to the element", () => {
		const element = jsx("button", { id: "test-button", class: "btn" });
		expect(element!.getAttribute("id")).toBe("test-button");
		expect(element!.getAttribute("class")).toBe("btn");
	});

	it("should apply data attributes to the element", () => {
		const element = jsx("div", { "data-test": "value" });
		expect(element!.dataset.test).toBe("value");
	});

	it("should apply src and alt attributes to the element", () => {
		const element = jsx("img", { src: "image.png", alt: "Image" });
		expect(element!.getAttribute("src")).toBe("image.png");
		expect(element!.getAttribute("alt")).toBe("Image");
	});

	it("should attach event listeners to the element", () => {
		const handleClick = vi.fn();
		const element = jsx("button", { onClick: handleClick });
		element!.click();
		expect(handleClick).toHaveBeenCalledOnce();
	});

	it("should apply class attribute to the element", () => {
		const element = jsx("div", { className: "test-class" });
		expect(element!.className).toBe("test-class");
	});

	it("should apply class attribute to SVG elements", () => {
		const element = jsx("svg", { className: "test-class" });
		expect(element!.getAttribute("class")).toBe("test-class");
	});

	it("should render children elements as text nodes", () => {
		const element = jsx("div", null, "Hello", "World");
		expect(element!.textContent).toBe("HelloWorld");
	});

	it("should handle nested elements as children", () => {
		const child = jsx("span", {}, "Nested");
		const parent = jsx("div", {}, child);
		expect(parent!.firstChild).toBe(child);
		expect(parent!.firstChild?.textContent).toBe("Nested");
	});

	it("should flatten nested arrays of children", () => {
		const element = jsx("div", {}, ["Child 1", ["Child 2", "Child 3"]]);
		expect(element!.textContent).toBe("Child 1Child 2Child 3");
	});

	it("should handle functional components", () => {
		const FunctionalComponent = ({ children }: { children: any[] }) =>
			jsx("div", {}, ...children)!;
		const element = jsx(FunctionalComponent, {}, "Functional Child");
		expect(element!.tagName).toBe("DIV");
		expect(element!.textContent).toBe("Functional Child");
	});

	it("should ignore non-object props gracefully", () => {
		const element = jsx("div", null, "No Props");
		expect(element!.tagName).toBe("DIV");
		expect(element!.textContent).toBe("No Props");
	});

	// New tests to cover missing lines
	it("should apply style object to the element", () => {
		const element = jsx("div", { style: { color: "red", fontSize: "16px" } });
		expect(element!.style.color).toBe("red");
		expect(element!.style.fontSize).toBe("16px");
	});

	it("should handle boolean attributes correctly", () => {
		const element = jsx("input", { type: "checkbox", checked: true });
		// @ts-expect-error
		expect(element!.checked).toBe(true);
		element!.removeAttribute("checked");
		// @ts-expect-error
		expect(element!.checked).toBe(false);
	});

	it("should create SVG elements correctly", () => {
		const svgElement = jsx("svg");
		expect(svgElement!.namespaceURI).toBe("http://www.w3.org/2000/svg");
		const circleElement = jsx("circle", { cx: 50, cy: 50, r: 40 });
		expect(circleElement!.namespaceURI).toBe("http://www.w3.org/2000/svg");
		expect(circleElement!.getAttribute("cx")).toBe("50");
		expect(circleElement!.getAttribute("cy")).toBe("50");
		expect(circleElement!.getAttribute("r")).toBe("40");
	});

	it("should set and remove boolean attributes correctly", () => {
		const element = jsx("input", { type: "checkbox", checked: true });
		expect(element!.hasAttribute("checked")).toBe(true);
		// @ts-expect-error
		expect(element!.checked).toBe(true);

		const elementWithoutChecked = jsx("input", {
			type: "checkbox",
			checked: false,
		});
		expect(elementWithoutChecked!.hasAttribute("checked")).toBe(false);
		// @ts-expect-error
		expect(elementWithoutChecked.checked).toBe(false);
	});
});
