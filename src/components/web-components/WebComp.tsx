// src/components/MyComponent.tsx

class MyComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	component() {
		return (
			<div>
				<h3>Hello, Web Component with JSX!</h3>
				<p>tsfw-component is a Web Component made with jsx</p>
			</div>
		);
	}

	connectedCallback() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = "";
		}

		this.shadowRoot?.appendChild(this.component());
	}
}

customElements.define("tsfw-component", MyComponent);
