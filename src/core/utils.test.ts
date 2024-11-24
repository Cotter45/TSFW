import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getElement,
  getElements,
  updateTextContent,
  toggleClass,
  diffStates,
  addElement,
  removeElement,
  replaceElement,
  updateMeta,
} from "./utils";

// Mock DOM setup
beforeEach(() => {
  document.body.innerHTML = `
    <div id="test" class="my-class">Hello</div>
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
  `;
});

describe("getElement", () => {
  it("should return an element by ID", () => {
    const element = getElement("#test");
    expect(element).not.toBeNull();
    expect(element?.id).toBe("test");
  });

  it("should return an element by query selector", () => {
    const element = getElement(".my-class");
    expect(element).not.toBeNull();
    expect(element?.classList.contains("my-class")).toBe(true);
  });

  it("should return null if the element does not exist", () => {
    const element = getElement("#nonexistent");
    expect(element).toBeNull();
  });
});

describe("getElements", () => {
  it("should return all elements matching the selector", () => {
    const elements = getElements(".item");
    expect(elements).toHaveLength(2);
    expect(elements[0].textContent).toBe("Item 1");
    expect(elements[1].textContent).toBe("Item 2");
  });

  it("should return an empty NodeList if no elements match", () => {
    const elements = getElements(".nonexistent");
    expect(elements).toHaveLength(0);
  });
});

describe("updateTextContent", () => {
  it("should update the text content of an element", () => {
    updateTextContent("#test", "Updated Text");
    const element = document.getElementById("test");
    expect(element?.textContent).toBe("Updated Text");
  });

  it("should not throw an error if the element does not exist", () => {
    expect(() => updateTextContent("#nonexistent", "Text")).not.toThrow();
  });
});

describe("toggleClass", () => {
  it("should toggle a class on the element", () => {
    toggleClass("#test", "new-class");
    const element = document.getElementById("test");
    expect(element?.classList.contains("new-class")).toBe(true);

    toggleClass("#test", "new-class");
    expect(element?.classList.contains("new-class")).toBe(false);
  });

  it("should not throw an error if the element does not exist", () => {
    expect(() => toggleClass("#nonexistent", "class")).not.toThrow();
  });
});

describe("addElement", () => {
  it("should add an element to the parent", () => {
    const parent = document.createElement("div");
    parent.id = "parent";
    document.body.appendChild(parent);

    const element = document.createElement("div");
    addElement("#parent", element);

    expect(parent.children).toHaveLength(1);
    expect(parent.children[0]).toBe(element);
  });

  it("should not throw an error if the parent does not exist", () => {
    const element = document.createElement("div");
    expect(() => addElement("#nonexistent", element)).not.toThrow();
  });
});

describe("removeElement", () => {
  it("should remove an element from the DOM", () => {
    const element = document.getElementById("test");
    expect(element).not.toBeNull();

    removeElement("#test");
    expect(document.getElementById("test")).toBeNull();
  });

  it("should not throw an error if the element does not exist", () => {
    expect(() => removeElement("#nonexistent")).not.toThrow();
  });
});

describe("replaceElement", () => {
  it("should replace an element with another", () => {
    const newElement = document.createElement("div");
    newElement.id = "new-element";

    replaceElement("#test", newElement);

    expect(document.getElementById("test")).toBeNull();
    expect(document.getElementById("new-element")).toBe(newElement);
  });

  it("should not throw an error if the element does not exist", () => {
    const newElement = document.createElement("div");
    expect(() => replaceElement("#nonexistent", newElement)).not.toThrow();
  });
});

describe("diffStates", () => {
  it("should correctly identify added, removed, and updated states", () => {
    const oldState = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    const newState = [
      { id: 1, name: "John Doe" }, // Updated
      { id: 3, name: "Doe" }, // Added
    ];

    const result = diffStates(newState, oldState, "id");
    expect(result.added).toEqual([{ id: 3, name: "Doe" }]);
    expect(result.removed).toEqual([{ id: 2, name: "Jane" }]);
    expect(result.updated).toEqual([
      {
        oldItem: { id: 1, name: "John" },
        newItem: { id: 1, name: "John Doe" },
      },
    ]);
  });

  it("should return empty arrays if there are no changes", () => {
    const state = [{ id: 1, name: "John" }];
    const result = diffStates(state, state, "id");
    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.updated).toEqual([]);
  });

  it("should handle empty states", () => {
    const result = diffStates([], [], "id");
    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.updated).toEqual([]);
  });

  it("should handle cases with no updates but only additions/removals", () => {
    const oldState = [{ id: 1, name: "John" }];
    const newState = [{ id: 2, name: "Jane" }];
    const result = diffStates(newState, oldState, "id");

    expect(result.added).toEqual([{ id: 2, name: "Jane" }]);
    expect(result.removed).toEqual([{ id: 1, name: "John" }]);
    expect(result.updated).toEqual([]);
  });

  it("should return false for deepEqual when comparing null and non-null", () => {
    const oldState = [{ id: 1, value: null }];
    const newState = [{ id: 1, value: "not-null" }];

    // @ts-expect-error
    const result = diffStates(newState, oldState, "id");
    expect(result.updated).toEqual([
      {
        oldItem: { id: 1, value: null },
        newItem: { id: 1, value: "not-null" },
      },
    ]);
  });

  it("should return false for deepEqual when types differ", () => {
    const oldState = [{ id: 1, value: 123 }];
    const newState = [{ id: 1, value: "123" }]; // Different type

    // @ts-expect-error
    const result = diffStates(newState, oldState, "id");
    expect(result.updated).toEqual([
      {
        oldItem: { id: 1, value: 123 },
        newItem: { id: 1, value: "123" },
      },
    ]);
  });

  it("should return true for deepEqual when both are null", () => {
    const oldState = [{ id: 1, value: null }];
    const newState = [{ id: 1, value: null }];

    const result = diffStates(newState, oldState, "id");
    expect(result.updated).toEqual([]);
  });

  it("should handle deeply nested objects with null values", () => {
    const oldState = [{ id: 1, data: { key: null } }];
    const newState = [{ id: 1, data: { key: "value" } }];

    // @ts-expect-error
    const result = diffStates(newState, oldState, "id");
    expect(result.updated).toEqual([
      {
        oldItem: { id: 1, data: { key: null } },
        newItem: { id: 1, data: { key: "value" } },
      },
    ]);
  });

  it("should return false for deepEqual when objects have different numbers of keys", () => {
    const oldState = [{ id: 1, name: "John" }];
    const newState = [{ id: 1, name: "John", age: 30 }]; // Extra key

    const result = diffStates(newState, oldState, "id");
    expect(result.updated).toEqual([
      {
        oldItem: { id: 1, name: "John" },
        newItem: { id: 1, name: "John", age: 30 },
      },
    ]);
  });

  it("should return false for deepEqual when one object is missing keys", () => {
    const oldState = [{ id: 1, name: "John", age: 30 }];
    const newState = [{ id: 1, name: "John" }]; // Missing key

    const result = diffStates(newState, oldState, "id");
    expect(result.updated).toEqual([
      {
        oldItem: { id: 1, name: "John", age: 30 },
        newItem: { id: 1, name: "John" },
      },
    ]);
  });
});

describe("updateMeta", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("should update the document title", () => {
    updateMeta({ title: "New Title" });
    expect(document.title).toBe("New Title");
  });

  it("should not throw an error if the title is not provided", () => {
    expect(() => updateMeta({})).not.toThrow();
  });

  it("should not throw an error if the title is an empty string", () => {
    expect(() => updateMeta({ title: "" })).not.toThrow();
  });

  it("should update or create the meta tags", () => {
    const metaTags = {
      description: "A description",
      keywords: "key1, keywords",
    };

    updateMeta(metaTags);

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    const metaKeywords = document.querySelector(
      'meta[name="keywords"]'
    ) as HTMLMetaElement;

    expect(metaDescription).not.toBeNull();
    expect(metaDescription.content).toBe("A description");

    expect(metaKeywords).not.toBeNull();
    expect(metaKeywords.content).toBe("key1, keywords");
  });

  it("should update existing meta tags", () => {
    const metaTags = {
      description: "A new description",
    };

    const existingMeta = document.createElement("meta");
    existingMeta.name = "description";
    existingMeta.content = "An old description";
    document.head.appendChild(existingMeta);

    updateMeta(metaTags);

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;

    expect(metaDescription).not.toBeNull();
    expect(metaDescription.content).toBe("A new description");
  });

  it("should remove meta tags with empty content", () => {
    const metaTags = {
      description: "A description",
      keywords: "",
    };

    updateMeta(metaTags);

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    expect(metaDescription).not.toBeNull();
    expect(metaDescription.content).toBe("A description");

    expect(metaKeywords).toBeNull();
  });
});
