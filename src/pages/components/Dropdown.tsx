import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import {
	Dropdown,
	DropdownTrigger,
	DropdownList,
	DropdownItem,
} from "@components/ui/Dropdown";
import { Button } from "@components/ui/Button";

export default function DropdownDocumentationPage() {
	return (
		<div class="fade_in flex flex-col gap-10 px-4 py-8 max-w-full">
			{/* Section: Introduction */}
			<section className="space-y-4">
				<Heading>Dropdown Documentation</Heading>
				<Text>
					The `Dropdown` component provides an interactive UI for displaying
					lists of actions or options. It supports alignment, hover-based
					triggering, and customizable dropdown content.
				</Text>
			</section>

			{/* Section: Features */}
			<section>
				<SubHeading>Features</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<Text>
							<strong>Flexible Alignment</strong>: Align dropdown content to the
							top, bottom, left, or right.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Hover Trigger</strong>: Option to open the dropdown on
							hover.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Custom Content</strong>: Easily pass any content as
							children, such as lists, buttons, or links.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Responsive</strong>: Dropdown content adjusts dynamically
							to fit within the viewport.
						</Text>
					</li>
				</ul>
			</section>

			{/* Section: Props */}
			<section className="space-y-4">
				<SubHeading>Props</SubHeading>
				<Text>The following are the props available for the `Dropdown`:</Text>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
					<li>
						<strong>align</strong>: Determines alignment of the dropdown content
						(`top`, `bottom`, `left`, `right`, `end`).
					</li>
					<li>
						<strong>hover</strong>: Enables hover-triggered opening.
					</li>
					<li>
						<strong>open</strong>: Controls the open state of the dropdown.
					</li>
					<li>
						<strong>class</strong>: Custom CSS classes.
					</li>
				</ul>
			</section>

			{/* Section: Examples */}
			<section className="space-y-8">
				<SubHeading>Examples</SubHeading>
				<Text>
					The following examples showcase various dropdown configurations:
				</Text>

				{/* Example: Basic Dropdown */}
				<div className="space-y-2">
					<SubHeading>Basic Dropdown</SubHeading>
					<Dropdown>
						<DropdownTrigger color="primary">Options</DropdownTrigger>
						<DropdownList>
							<DropdownItem>Action 1</DropdownItem>
							<DropdownItem>Action 2</DropdownItem>
							<DropdownItem>Action 3</DropdownItem>
						</DropdownList>
					</Dropdown>
				</div>

				{/* Example: Hover Trigger */}
				<div className="space-y-2">
					<SubHeading>Hover Trigger</SubHeading>
					<Dropdown hover>
						<DropdownTrigger color="secondary">Hover Me</DropdownTrigger>
						<DropdownList>
							<DropdownItem>Option 1</DropdownItem>
							<DropdownItem>Option 2</DropdownItem>
							<DropdownItem>Option 3</DropdownItem>
						</DropdownList>
					</Dropdown>
				</div>

				{/* Example: Aligned Dropdown */}
				<div className="space-y-2">
					<SubHeading>Aligned Dropdown</SubHeading>
					<Dropdown align="top">
						<DropdownTrigger color="accent">Aligned</DropdownTrigger>
						<DropdownList>
							<DropdownItem>End Option 1</DropdownItem>
							<DropdownItem>End Option 2</DropdownItem>
						</DropdownList>
					</Dropdown>
				</div>

				{/* Code Example */}
				<CodeBlock language="language-javascript">
					{`import {
  Dropdown,
  DropdownTrigger,
  DropdownList,
  DropdownItem,
} from "@components/ui/Dropdown";

export default function DropdownExamples() {
  return (
    <div className="space-y-8">
      {/* Basic Dropdown */}
      <Dropdown>
        <DropdownTrigger color="primary">Options</DropdownTrigger>
        <DropdownList>
          <DropdownItem>Action 1</DropdownItem>
          <DropdownItem>Action 2</DropdownItem>
          <DropdownItem>Action 3</DropdownItem>
        </DropdownList>
      </Dropdown>

      {/* Hover Trigger */}
      <Dropdown hover>
        <DropdownTrigger color="secondary">Hover Me</DropdownTrigger>
        <DropdownList>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownList>
      </Dropdown>

      {/* Aligned Dropdown */}
      <Dropdown align="end">
        <DropdownTrigger color="accent">Aligned</DropdownTrigger>
        <DropdownList>
          <DropdownItem>End Option 1</DropdownItem>
          <DropdownItem>End Option 2</DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
}`}
				</CodeBlock>
			</section>
		</div>
	);
}
