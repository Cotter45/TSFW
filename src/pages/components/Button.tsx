import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Badge } from "@components/ui/Badge";
import Button from "@components/ui/Button";
import { CodeBlock } from "@components/CodeBlock";

export default function ButtonDocumentationPage() {
	return (
		<div className="flex flex-col gap-8">
			<section className="space-y-4">
				<Heading>Button Documentation</Heading>

				<Button
					externalHref="https://daisyui.com/components/button"
					color="link"
					variant="block"
				>
					Full DaisyUI Documentation
				</Button>

				<Text>
					The `Button` component is a highly customizable and versatile element
					for actions and navigation, supporting multiple styles, sizes, and
					behaviors.
				</Text>
			</section>

			<section>
				<SubHeading>Features</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
					<li>
						<Text>
							<strong>Customizable Colors</strong>: Predefined styles for
							primary, secondary, success, error, and more.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Versatile Sizes</strong>: Options for large, medium,
							small, and extra-small buttons.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Interactive States</strong>: Active, disabled, and
							animated states.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Dynamic Rendering</strong>: Automatically switches between
							<Badge>button</Badge> and <Badge>a</Badge> based on the presence
							of an `href` prop.
						</Text>
					</li>
				</ul>
			</section>

			<section className="space-y-4">
				<SubHeading>Color Options</SubHeading>
				<Text>The following color styles are available:</Text>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<Button color="neutral" size="xs">
							Neutral Button
						</Button>
					</li>
					<li>
						<Button color="primary" size="xs">
							Primary Button
						</Button>
					</li>
					<li>
						<Button color="secondary" size="xs">
							Secondary Button
						</Button>
					</li>
					<li>
						<Button color="accent" size="xs">
							Accent Button
						</Button>
					</li>
					<li>
						<Button color="info" size="xs">
							Info Button
						</Button>
					</li>
					<li>
						<Button color="success" size="xs">
							Success Button
						</Button>
					</li>
					<li>
						<Button color="warning" size="xs">
							Warning Button
						</Button>
					</li>
					<li>
						<Button color="error" size="xs">
							Error Button
						</Button>
					</li>
					<li>
						<Button color="ghost" size="xs">
							Ghost Button
						</Button>
					</li>
					<li>
						<Button color="link" size="xs">
							Link Button
						</Button>
					</li>
					<li>
						<Button color="outline" size="xs">
							Outline Button
						</Button>
					</li>
				</ul>
			</section>

			<section className="space-y-4">
				<SubHeading>Full Example</SubHeading>
				<Text>
					The following example showcases multiple Button configurations:
				</Text>

				<CodeBlock language="language-javascript">
					{`import { Button } from "@components/ui/Button";

export default function ButtonExamples() {
  function handleClick() {
    alert("Button clicked!");
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleClick} color="primary">
        Primary Button
      </Button>
      <Button href="/about" color="link">
        Link Button
      </Button>
      <Button size="lg" color="success" variant="block">
        Large Success Button
      </Button>
      <Button disabled color="error">
        Disabled Error Button
      </Button>
      <Button glass color="accent">
        Glass Accent Button
      </Button>
    </div>
  );
}`}
				</CodeBlock>
			</section>
		</div>
	);
}
