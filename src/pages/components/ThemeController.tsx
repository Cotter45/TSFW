import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import { ThemeController } from "@components/ui/ThemeController";

export default function ThemeControllerDocumentationPage() {
	return (
		<div class="flex flex-col gap-10 px-4 py-8 max-w-full">
			<section className="space-y-4">
				<Heading>ThemeController Component</Heading>
				<Text>
					The `ThemeController` component is a simple, interactive toggle to
					switch between light and dark themes. It updates the `data-theme`
					attribute on the document root for seamless theme switching.
				</Text>
			</section>

			<section>
				<SubHeading>Features</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<Text>
							<strong>Theme Toggle</strong>: Switches between `light` and `dark`
							themes.
						</Text>
					</li>
					<li>
						<Text>
							<strong>ARIA Accessibility</strong>: Includes proper
							<code>aria-label</code> attributes for accessibility.
						</Text>
					</li>
					<li>
						<Text>
							<strong>SVG Icons</strong>: Uses inline SVGs for visual feedback
							on the theme.
						</Text>
					</li>
				</ul>
			</section>

			<section>
				<SubHeading>Props</SubHeading>
				<Text>
					The `ThemeController` does not require any props. It operates
					independently by reading and setting the `data-theme` attribute on the
					<code>document.documentElement</code>.
				</Text>
			</section>

			<section className="space-y-8">
				<SubHeading>Example</SubHeading>
				<Text>
					Here is an example usage of the `ThemeController` component:
				</Text>

				<div className="flex items-center space-x-4 p-4">
					<ThemeController />
				</div>

				<CodeBlock language="language-javascript">
					{`import { ThemeController } from "@components/ui/ThemeController";

export default function App() {
  return (
    <div>
      <ThemeController />
    </div>
  );
}`}
				</CodeBlock>
			</section>

			<section>
				<SubHeading>How It Works</SubHeading>
				<Text>
					The component checks the current theme using the `data-theme`
					attribute. If the theme is set to `tsfwdark`, it toggles it to
					`tsfwlight` and vice versa when the checkbox is clicked.
				</Text>
				<ul className="list-disc ml-6 space-y-2">
					<li>
						<Text>
							**Current Theme Detection**: The theme is retrieved via{" "}
							<code>document.documentElement.getAttribute("data-theme")</code>.
						</Text>
					</li>
					<li>
						<Text>
							**Theme Update**: On change, the theme attribute is updated to
							switch between light and dark modes.
						</Text>
					</li>
				</ul>
			</section>
		</div>
	);
}
