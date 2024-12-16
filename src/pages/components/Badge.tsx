import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Badge } from "@components/ui/Badge";
import { CodeBlock } from "@components/CodeBlock";

export default function BadgeDocumentationPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <Heading>Badge Documentation</Heading>

        <Text>
          The `Badge` component is a compact UI element used to display
          contextual information, such as tags, statuses, or indicators. It
          supports a variety of colors and styles for both light and dark modes.
        </Text>
      </section>

      <section>
        <SubHeading>Features</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <Text>
              <strong>Customizable Colors</strong>: Predefined color options
              like red, green, blue, and more.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Light and Dark Mode Support</strong>: Adaptive styles for
              different themes.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Compact Design</strong>: Ideal for displaying additional
              information or highlighting statuses.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Flexible Styling</strong>: Allows custom classes for
              further customization.
            </Text>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SubHeading>Props</SubHeading>
        <Text>
          The following are the props available for the `Badge` component:
        </Text>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <strong>color</strong>: Defines the badge color (e.g., `red`,
            `green`, `blue`). Defaults to `zinc`.
          </li>
          <li>
            <strong>class</strong>: Adds custom classes to the badge.
          </li>
          <li>
            <strong>children</strong>: The content displayed inside the badge.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SubHeading>Examples</SubHeading>
        <Text>
          The following examples showcase different badge configurations:
        </Text>

        <div className="space-y-4">
          {/* Color Examples */}
          <div>
            <SubHeading class="mb-2">Color Options</SubHeading>
            <div className="flex flex-wrap gap-2">
              <Badge color="red">Red</Badge>
              <Badge color="green">Green</Badge>
              <Badge color="blue">Blue</Badge>
              <Badge color="yellow">Yellow</Badge>
              <Badge color="purple">Purple</Badge>
              <Badge color="teal">Teal</Badge>
              <Badge color="zinc">Zinc</Badge>
            </div>
          </div>

          {/* Full Example */}
          <div>
            <SubHeading>Full Example</SubHeading>
            <CodeBlock language="language-javascript">
              {`import { Badge } from "@components/ui/Badge";

export default function BadgeExamples() {
  return (
    <div className="space-y-4">
      // Color Options
      <div className="flex flex-wrap gap-2">
        <Badge color="red">Red</Badge>
        <Badge color="green">Green</Badge>
        <Badge color="blue">Blue</Badge>
        <Badge color="yellow">Yellow</Badge>
        <Badge color="purple">Purple</Badge>
        <Badge color="teal">Teal</Badge>
        <Badge color="zinc">Zinc</Badge>
      </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </section>
    </div>
  );
}
