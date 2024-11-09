// src/types/jsx.d.ts

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }

  interface ElementChildrenAttribute {
    children: {};
  }

  interface ForwardRefComponent {
    $$typeof: symbol;
    render: (props: any) => HTMLElement;
  }
}
