// Utility function to get an element by ID or query selector
export const getElement = (selector: string): HTMLElement | null => {
  if (selector.startsWith("#")) {
    return document.getElementById(selector.slice(1));
  } else {
    return document.querySelector(selector);
  }
};

// Utility function to get all elements by query selector
export const getElements = (selector: string): NodeListOf<HTMLElement> => {
  return document.querySelectorAll(selector);
};

// Utility function to add an element to the DOM
export const addElement = (
  parentSelector: string,
  element: HTMLElement
): void => {
  const parent = getElement(parentSelector);
  if (parent) {
    parent.appendChild(element);
  }
};

// Utility function to remove an element from the DOM
export const removeElement = (selector: string): void => {
  const element = getElement(selector);
  if (element) {
    element.remove();
  }
};

// Utility function to update text content
export const updateTextContent = (selector: string, text: string) => {
  const element = getElement(selector);
  if (element) {
    element.textContent = text;
  }
};

// Utility function to replace an element with another
export const replaceElement = (
  selector: string,
  newElement: HTMLElement
): void => {
  const element = getElement(selector);
  if (element) {
    element.replaceWith(newElement);
  }
};

// Utility function to toggle a class
export const toggleClass = (selector: string, className: string) => {
  const element = getElement(selector);
  if (element) {
    element.classList.toggle(className);
  }
};

// Utility function to diff two states of the same type and structure
export const diffStates = <T extends {}>(
  newState: T[],
  oldState: T[],
  idKey: keyof T
): {
  added: T[];
  removed: T[];
  updated: { oldItem: T; newItem: T }[];
} => {
  const added = newState.filter(
    (newItem) => !oldState.some((oldItem) => oldItem[idKey] === newItem[idKey])
  );

  const removed = oldState.filter(
    (oldItem) => !newState.some((newItem) => newItem[idKey] === oldItem[idKey])
  );

  const updated = newState
    .map((newItem) => {
      const oldItem = oldState.find(
        (oldItem) => oldItem[idKey] === newItem[idKey]
      );
      if (oldItem && !deepEqual(oldItem, newItem)) {
        return { oldItem, newItem };
      }
      return null;
    })
    .filter((item): item is { oldItem: T; newItem: T } => item !== null);

  return { added, removed, updated };
};

// Utility function to deep compare two objects or primitive values
const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== typeof obj2 || obj1 === null || obj2 === null) {
    return false;
  }

  if (typeof obj1 === "object") {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
  }

  return false;
};

// Utility function to update the pages meta tags
export const updateMeta = (metaTags: Record<string, string>) => {
  console.log("META ONE", metaTags);
  const validMetaTags = Object.entries(metaTags).filter(
    ([name, content]) => name && content
  );

  metaTags = Object.fromEntries(validMetaTags);
  console.log(metaTags);

  const title = metaTags.title;

  if (title) {
    document.title = title;
  }

  for (const [name, content] of Object.entries(metaTags)) {
    const metaTag = document.querySelector(`meta[name="${name}"]`);
    if (metaTag) {
      metaTag.setAttribute("content", content);
    } else {
      const newMetaTag = document.createElement("meta");
      newMetaTag.setAttribute("name", name);
      newMetaTag.setAttribute("content", content);
      document.head.appendChild(newMetaTag);
    }
  }
};
