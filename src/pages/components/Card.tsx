import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import {
  Card,
  CardBody,
  CardTitle,
  CardActions,
  CardFigure,
} from "@components/ui/Card";
import { Button } from "@components/ui/Button";

export default function CardDocumentationPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <Heading>Card Documentation</Heading>

        <Text>
          The `Card` component provides a flexible and visually appealing
          container for displaying content. It supports various layouts and
          styles, making it suitable for user profiles, product listings, and
          other card-based designs.
        </Text>
      </section>

      <section>
        <SubHeading>Features</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <Text>
              <strong>Configurable Styles</strong>: Options for borders, compact
              layout, side layout, glass effects, and more.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Composable Structure</strong>: Combine `CardBody`,
              `CardTitle`, `CardActions`, and `CardFigure` to structure card
              content.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Interactive Actions</strong>: Add buttons or links to the
              card's action area.
            </Text>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SubHeading>Props</SubHeading>
        <Text>
          The following are the props available for the `Card` and its
          subcomponents:
        </Text>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <strong>Card</strong>: Supports `bordered`, `compact`, `side`,
            `imageFull`, `glass`, and `class` for customization.
          </li>
          <li>
            <strong>CardBody</strong>: Use `class` for additional styles.
          </li>
          <li>
            <strong>CardTitle</strong>: Supports `class` for title-specific
            styles.
          </li>
          <li>
            <strong>CardActions</strong>: Add action buttons or links with the
            `class` prop.
          </li>
          <li>
            <strong>CardFigure</strong>: Use for displaying images or figures
            with the `class` prop.
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <SubHeading>Examples</SubHeading>
        <Text>
          The following examples showcase various card configurations:
        </Text>

        <div className="space-y-4">
          <div className="flex flex-wrap justify-evenly gap-4">
            {/* Basic Card */}
            <div className="space-y-2 flex-1 min-w-[300px]">
              <SubHeading>Basic Card</SubHeading>
              <Card>
                <CardBody>
                  <CardTitle>Basic Card</CardTitle>
                  <Text>This is a simple card with basic styles.</Text>
                </CardBody>
              </Card>
            </div>

            {/* Card with Actions */}
            <div className="space-y-2 flex-1 min-w-[300px]">
              <SubHeading>Card with Actions</SubHeading>
              <Card bordered>
                <CardBody>
                  <CardTitle>Card with Actions</CardTitle>
                  <Text>
                    Add buttons or links to the actions area for interactivity.
                  </Text>
                  <CardActions>
                    <Button color="primary">Learn More</Button>
                    <Button color="ghost">Cancel</Button>
                  </CardActions>
                </CardBody>
              </Card>
            </div>

            {/* Compact Card */}
            <div className="space-y-2 flex-1 min-w-[300px]">
              <SubHeading>Compact Card</SubHeading>
              <Card compact>
                <CardBody>
                  <CardTitle>Compact Card</CardTitle>
                  <Text>
                    Compact cards reduce padding for a tighter layout.
                  </Text>
                </CardBody>
              </Card>
            </div>

            {/* Card with Image */}
            <div className="space-y-2 flex-1 w-full min-w-[300px] sm:max-w-[400px]">
              <SubHeading>Card with Image</SubHeading>
              <Card>
                <CardFigure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                    alt="Example"
                    className="rounded-lg aspect-video"
                  />
                </CardFigure>
                <CardBody>
                  <CardTitle>Card with Image</CardTitle>
                  <Text>
                    This card uses an image at the top to enhance its visual
                    appeal.
                  </Text>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Full Example */}
          <div>
            <SubHeading>Full Example</SubHeading>
            <CodeBlock language="language-javascript">
              {`import { Card, CardBody, CardTitle, CardActions, CardFigure } from "@components/ui/Card";
import { Button } from "@components/ui/Button";

export default function CardExamples() {
  return (
    <div className="space-y-8">
      // Basic Card
      <Card>
        <CardBody>
          <CardTitle>Basic Card</CardTitle>
          <p>This is a simple card with basic styles.</p>
        </CardBody>
      </Card>

      // Card with Image
      <Card imageFull>
        <CardFigure>
          <img src="https://via.placeholder.com/300x200" alt="Example" />
        </CardFigure>
        <CardBody>
          <CardTitle>Card with Image</CardTitle>
          <p>This card uses an image at the top to enhance its visual appeal.</p>
        </CardBody>
      </Card>

      // Card with Actions
      <Card bordered>
        <CardBody>
          <CardTitle>Card with Actions</CardTitle>
          <p>Add buttons or links to the actions area for interactivity.</p>
          <CardActions>
            <Button color="primary">Learn More</Button>
            <Button color="secondary">Cancel</Button>
          </CardActions>
        </CardBody>
      </Card>

      // Compact Card
      <Card compact>
        <CardBody>
          <CardTitle>Compact Card</CardTitle>
          <p>Compact cards reduce padding for a tighter layout.</p>
        </CardBody>
      </Card>
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
