export type PropsWithChildren<P = {}> = P & {
  children?: JSX.Element[] | JSX.Element | string | number;
};

export function jsx(
  type: string | ((props: any) => HTMLElement),
  props: any = {},
  ...children: any[]
): HTMLElement | null {
  if (typeof type === "function") {
    return type({ ...props, children });
  }

  const isSvg = [
    "svg",
    "path",
    "circle",
    "rect",
    "line",
    "polyline",
    "polygon",
    "ellipse",
  ].includes(type);
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
    } else if (["src", "alt"].includes(key)) {
      element.setAttribute(key, String(value));
    } else if (key === "className") {
      if (isSvg) {
        element.setAttribute("class", String(value));
      } else {
        (element as any).className = value;
      }
    } else if (typeof value === "boolean") {
      value ? element.setAttribute(key, "") : element.removeAttribute(key);
    } else if (isSvg || !(key in element)) {
      element.setAttribute(key, String(value));
    } else {
      (element as any)[key] = value;
    }
  }

  if (!["img", "input", "br", "hr"].includes(type)) {
    for (const child of children.flat(Infinity)) {
      if (!child) continue;

      element.append(
        child instanceof Node ? child : document.createTextNode(String(child))
      );
    }
  }

  return element as HTMLElement;
}
