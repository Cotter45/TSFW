import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import { Accordion } from "@components/ui/Accordion";

export default function AccordionDocumentationPage() {
  return (
    <div class="flex flex-col gap-10 px-4 py-8 max-w-full">
      {/* Section: Introduction */}
      <section className="space-y-4">
        <Heading>Accordion Documentation</Heading>
        <Text>
          The `Accordion` component provides an interactive and collapsible UI
          element for organizing content. It supports multiple panels with
          smooth animations for expanding and collapsing content.
        </Text>
      </section>

      {/* Section: Features */}
      <section>
        <SubHeading>Features</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
          <li>
            <Text>
              <strong>Expandable Panels</strong>: Toggle individual panels to
              show or hide content.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Animated Transitions</strong>: Smooth height and opacity
              transitions for a polished experience.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Accessible</strong>: Keyboard navigation and ARIA
              attributes for accessibility.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Customizable Styling</strong>: Supports custom classes and
              content.
            </Text>
          </li>
        </ul>
      </section>

      {/* Section: Props */}
      <section className="space-y-4">
        <SubHeading>Props</SubHeading>
        <Text>
          The following are the props available for the `Accordion` and
          `AccordionPanel` components:
        </Text>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <strong>id</strong>: Unique identifier for each panel.
          </li>
          <li>
            <strong>title</strong>: Title text displayed on the panel header.
          </li>
          <li>
            <strong>content</strong>: Content inside the collapsible panel.
          </li>
          <li>
            <strong>class</strong>: Custom CSS class for additional styling.
          </li>
        </ul>
      </section>

      {/* Section: Examples */}
      <section className="space-y-8">
        <SubHeading>Examples</SubHeading>
        <Text>
          The following examples showcase different configurations of the
          `Accordion` component:
        </Text>

        {/* Example 1: Basic Accordion */}
        <div className="space-y-2">
          <SubHeading>Basic Accordion</SubHeading>
          <Accordion
            panels={[
              {
                id: "panel-1",
                title: "What is an Accordion?",
                content:
                  "An accordion is a UI component that allows users to toggle sections of content open or closed.",
              },
              {
                id: "panel-2",
                title: "Why use an Accordion?",
                content:
                  "Accordions help organize content in a compact, user-friendly manner, especially for FAQs or settings.",
              },
              {
                id: "panel-3",
                title: "How does it work?",
                content:
                  "Each panel can be expanded or collapsed independently with a smooth animation.",
              },
            ]}
          />
        </div>

        {/* Example 2: Accordion with Custom Styling */}
        <div className="space-y-2">
          <SubHeading>Accordion with Custom Styling</SubHeading>
          <Accordion
            class="border border-emerald-500 rounded-lg p-2"
            panels={[
              {
                id: "custom-panel-1",
                title: "Custom Styling Panel 1",
                content:
                  "This panel has custom styling with borders and rounded corners.",
              },
              {
                id: "custom-panel-2",
                title: "Custom Styling Panel 2",
                content:
                  "Apply your own classes to achieve the desired look and feel.",
              },
            ]}
          />
        </div>

        {/* Code Example */}
        <CodeBlock language="language-javascript">
          {`import { Accordion } from "@components/ui/Accordion";

export default function AccordionExamples() {
  return (
    <div>
      {/* Basic Accordion */}
      <Accordion
        panels={[
          { id: "panel-1", title: "What is an Accordion?", content: "An accordion is a UI component..." },
          { id: "panel-2", title: "Why use an Accordion?", content: "Accordions help organize content..." },
          { id: "panel-3", title: "How does it work?", content: "Each panel can be expanded..." }
        ]}
      />

      {/* Custom Styled Accordion */}
      <Accordion
        class="border border-emerald-500 rounded-lg"
        panels={[
          { id: "custom-panel-1", title: "Custom Styling Panel 1", content: "This panel has custom styling..." },
          { id: "custom-panel-2", title: "Custom Styling Panel 2", content: "Apply your own classes..." }
        ]}
      />
    </div>
  );
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
