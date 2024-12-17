import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";

export default function TextDocumentationPage() {
	return (
		<div class="flex flex-col gap-10 px-4 py-8 max-w-full">
			<section className="space-y-4">
				<Heading>Text and Heading Component Documentation</Heading>
				<Text>
					The `Text`, `Heading`, and `SubHeading` components provide semantic
					and accessible typography for text, headings, and subheadings. These
					components ensure consistency across your application.
				</Text>
			</section>

			<section>
				<SubHeading>Features</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<Text>
							<strong>Semantic Elements</strong>: Proper semantic tags are used
							(e.g., <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>).
						</Text>
					</li>
					<li>
						<Text>
							<strong>ARIA Support</strong>: Includes support for ARIA labels
							and levels for accessibility.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Customizable</strong>: Allows custom classes via the{" "}
							<code>class</code> prop.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Responsive Design</strong>: Text sizes adjust for
							different screen sizes.
						</Text>
					</li>
				</ul>
			</section>

			<section>
				<SubHeading>Props</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<strong>Text</strong>:
						<ul className="ml-6 list-disc space-y-1">
							<li>
								<strong>ariaLabel</strong> (string): Adds an ARIA label for
								accessibility.
							</li>
							<li>
								<strong>class</strong> (string): Additional classes for custom
								styling.
							</li>
							<li>
								<strong>children</strong> (ReactNode): Text content.
							</li>
						</ul>
					</li>
					<li>
						<strong>Heading</strong>:
						<ul className="ml-6 list-disc space-y-1">
							<li>Same props as `Text`.</li>
							<li>
								Uses a semantic <code>&lt;h1&gt;</code> tag.
							</li>
						</ul>
					</li>
					<li>
						<strong>SubHeading</strong>:
						<ul className="ml-6 list-disc space-y-1">
							<li>Same props as `Text`.</li>
							<li>
								<strong>level</strong> (number): Specifies the heading level
								(e.g., `2`, `3`, ..., `6`). Defaults to `2`.
							</li>
						</ul>
					</li>
				</ul>
			</section>

			<section>
				<SubHeading>Examples</SubHeading>
				<Text>
					Below are examples showcasing `Text`, `Heading`, and `SubHeading`
					components:
				</Text>

				<div className="space-y-8">
					{/* Basic Text */}
					<div class="space-y-2">
						<SubHeading>Basic Text</SubHeading>
						<Text>
							This is a paragraph rendered using the `Text` component.
						</Text>
					</div>

					{/* Heading Example */}
					<div class="space-y-2">
						<SubHeading>Heading</SubHeading>
						<Heading>
							This is a primary heading rendered with `Heading`.
						</Heading>
					</div>

					{/* SubHeading Example */}
					<div class="space-y-2">
						<SubHeading>SubHeading</SubHeading>
						<SubHeading level={3}>
							This is a level 3 subheading using `SubHeading`.
						</SubHeading>
						<SubHeading level={5}>
							This is a level 5 subheading using `SubHeading`.
						</SubHeading>
					</div>
				</div>

				<CodeBlock language="language-javascript">
					{`import { Text, Heading, SubHeading } from "@components/ui/Text";

export default function TextExample() {
  return (
    <div>
      {/* Basic Text */}
      <Text>This is a paragraph rendered using the Text component.</Text>

      {/* Heading */}
      <Heading>This is a primary heading rendered with Heading.</Heading>

      {/* SubHeading */}
      <SubHeading level={3}>
        This is a level 3 subheading rendered with SubHeading.
      </SubHeading>
      <SubHeading level={5}>
        This is a level 5 subheading rendered with SubHeading.
      </SubHeading>
    </div>
  );
}`}
				</CodeBlock>
			</section>
		</div>
	);
}
