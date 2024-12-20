import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import { Badge } from "@components/ui/Badge";
import { Chart } from "@components/ui/Charts";

export default function ChartDocumentationPage() {
  return (
    <div class="fade_in flex flex-col gap-10 px-4 py-8 max-w-full">
      <section className="space-y-4">
        <Heading>Chart Documentation</Heading>
        <Text>
          The `TSFWChart` component is a lightweight, versatile charting utility
          built using the HTML canvas API. It supports multiple chart types,
          including bar, line, scatter, pie, area, and radar charts, with easy
          customization for labels, colors, and data.
        </Text>
      </section>

      <section>
        <SubHeading>Features</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <Text>
              <strong>Multiple Chart Types</strong>: Supports <Badge>bar</Badge>
              , <Badge>line</Badge>, <Badge>scatter</Badge>, <Badge>pie</Badge>,{" "}
              <Badge>area</Badge>, and <Badge>radar</Badge> charts.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Customizable Labels and Colors</strong>: Configure X and Y
              labels and series-specific colors with ease.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Responsive Design</strong>: Automatically resizes to fit
              the container.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Light and Dark Modes</strong>: Adapts to the current theme
              for a seamless UI experience.
            </Text>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SubHeading>Configuration Options</SubHeading>
        <Text>The following options can be passed to the chart:</Text>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <Text>
              <Badge>canvasId</Badge>: The ID of the canvas element where the
              chart will be rendered.
            </Text>
          </li>
          <li>
            <Text>
              <Badge>padding</Badge>: Sets the padding around the chart. Default
              is <Badge>40</Badge>.
            </Text>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SubHeading>Helper Functions</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <Text>
              <Badge>drawLine</Badge>: Draws a line between two points.
            </Text>
            <CodeBlock language="language-javascript">
              {`drawLine(ctx, x1, y1, x2, y2, color = "#000", width = 1);`}
            </CodeBlock>
          </li>
          <li>
            <Text>
              <Badge>drawRect</Badge>: Draws a filled rectangle.
            </Text>
            <CodeBlock language="language-javascript">
              {`drawRect(ctx, x, y, width, height, color = "#000");`}
            </CodeBlock>
          </li>
          <li>
            <Text>
              <Badge>drawText</Badge>: Renders text on the canvas.
            </Text>
            <CodeBlock language="language-javascript">
              {`drawText(ctx, text, x, y, color = "#000", font = "12px Arial", align = "center");`}
            </CodeBlock>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SubHeading>Usage Example</SubHeading>
        <Text>
          The following example demonstrates how to use the `Chart` component to
          render multiple chart types in a single instance:
        </Text>
        <div className="h-[400px]">
          <Chart
            id="exampleChart"
            xLabels={["Jan", "Feb", "Mar", "Apr", "May"]}
            yLabels={[0, 20, 40, 60, 80, 100]}
            series={[
              { type: "bar", data: [20, 40, 60, 80, 100], color: "#4CAF50" },
              { type: "line", data: [15, 35, 55, 75, 95], color: "#FF5722" },
              {
                type: "scatter",
                data: [
                  { x: 1, y: 20 },
                  { x: 3, y: 70 },
                ],
                color: "#03A9F4",
              },
              {
                type: "area",
                data: [60, 70, 50, 70, 90],
                lineColor: "#673AB7",
                fillColor: "rgba(103, 58, 183, 0.2)",
              },
            ]}
          />
        </div>
        <CodeBlock language="language-javascript">
          {`import { Chart } from "@components/ui/Charts";

export default function ChartExample() {
  return (
    <div className="h-[400px]">
      <Chart
        id="exampleChart"
        xLabels={["Jan", "Feb", "Mar", "Apr", "May"]}
        yLabels={[0, 20, 40, 60, 80, 100]}
        series={[
          { type: "bar", data: [20, 40, 60, 80, 100], color: "#4CAF50" },
          { type: "line", data: [15, 35, 55, 75, 95], color: "#FF5722" },
          { type: "scatter", data: [{ x: 1, y: 20 }, { x: 3, y: 70 }], color: "#03A9F4" },
          {
            type: "area",
            data: [60, 70, 50, 70, 90],
            lineColor: "#673AB7",
            fillColor: "rgba(103, 58, 183, 0.2)",
          },
        ]}
      />
    </div>
  );
}`}
        </CodeBlock>
      </section>

      <section className="space-y-4 w-full">
        <SubHeading>Advanced Example</SubHeading>
        <Text>
          This advanced example includes dynamic resizing and theme-aware
          styling:
        </Text>
        <div className="w-full h-[500px]">
          <Chart
            id="responsiveChart"
            xLabels={["Q1", "Q2", "Q3", "Q4"]}
            yLabels={[0, 25, 50, 75, 100]}
            series={[
              { type: "line", data: [20, 50, 30, 90], color: "#2196F3" },
              {
                type: "area",
                data: [10, 30, 60, 80],
                fillColor: "rgba(33, 150, 243, 0.2)",
              },
            ]}
          />
        </div>

        <CodeBlock language="language-javascript">
          {`import { Chart } from "@components/ui/Charts";

export default function ResponsiveChart() {
  return (
    <div className="w-full h-[500px]">
      <Chart
        id="responsiveChart"
        xLabels={["Q1", "Q2", "Q3", "Q4"]}
        yLabels={[0, 25, 50, 75, 100]}
        series={[
          { type: "line", data: [20, 50, 30, 90], color: "#2196F3" },
          { type: "area", data: [10, 30, 60, 80], fillColor: "rgba(33, 150, 243, 0.2)" },
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
