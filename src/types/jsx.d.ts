// src/types/jsx.d.ts

declare namespace JSX {
	type Element = HTMLElement;

	interface IntrinsicElements {
		[elemName: string]: Partial<Record<string, any>> & {
			children?: any;
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
