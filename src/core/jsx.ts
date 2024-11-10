export function jsx(
  type: string | ((props: any) => HTMLElement),
  props: any = {},
  ...children: any[]
): HTMLElement {
  if (typeof type === "function") {
    return type({ ...props, children });
  }

  const isSvg =
    type === "svg" ||
    type === "path" ||
    type === "circle" ||
    type === "rect" ||
    type === "line" ||
    type === "polyline" ||
    type === "polygon" ||
    type === "ellipse";
  const element = isSvg
    ? document.createElementNS("http://www.w3.org/2000/svg", type)
    : document.createElement(type);

  for (const [key, value] of Object.entries(props || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase() as keyof HTMLElementEventMap;
      element.addEventListener(eventName, value as EventListener);
    } else if (key === "style" && typeof value === "object") {
      Object.assign(element.style, value);
    } else if (key.startsWith("data-")) {
      element.dataset[key.slice(5)] = String(value);
    } else if (typeof value === "boolean") {
      value ? element.setAttribute(key, "") : element.removeAttribute(key);
    } else if (isSvg || !(key in element)) {
      element.setAttribute(key, String(value));
    } else {
      (element as any)[key] = value;
    }
  }

  for (const child of children.flat(Infinity)) {
    element.append(
      child instanceof Node ? child : document.createTextNode(String(child))
    );
  }

  return element as HTMLElement;
}
