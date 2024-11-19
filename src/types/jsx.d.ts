// src/types/jsx.d.ts

declare namespace JSX {
  type Element = HTMLElement;

  interface IntrinsicElements {
    [elemName: string]: Partial<Record<string, any>> & {
      children?:
        | Element
        | Element[]
        | string
        | string[]
        | number
        | number[]
        | boolean
        | null;
    };
  }

  interface ElementChildrenAttribute {
    children: {};
  }

  interface ForwardRefComponent {
    $$typeof: symbol;
    render: (props: any) => HTMLElement;
  }
}
