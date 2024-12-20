import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Accordion } from "@components/ui/Accordion";
import { CodeBlock } from "@components/CodeBlock";
import { Badge } from "@components/ui/Badge";

export default function TestingPage() {
  return (
    <div className="fade_in flex flex-col gap-8 mx-auto px-4 py-8">
      <section className="space-y-4">
        <Heading>Testing in TSFW</Heading>
        <Text>
          Testing is a crucial part of developing reliable and maintainable
          applications. TSFW leverages <Badge color="emerald">Vitest</Badge> for
          its fast, modern testing capabilities. Here’s a guide on writing and
          organizing tests, using advanced patterns, and debugging effectively.
        </Text>
      </section>

      <section className="space-y-4">
        <SubHeading>Setting Up Testing</SubHeading>
        <Text>
          TSFW is preconfigured with Vitest. To run your test suite, use:
        </Text>
        <CodeBlock language="language-bash">{"npm run test"}</CodeBlock>
        <Text>To generate coverage reports:</Text>
        <CodeBlock language="language-bash">
          {"npm run test:coverage"}
        </CodeBlock>
        <Text>
          This will output a coverage report in the <code>coverage/</code>{" "}
          folder.
        </Text>
      </section>

      <section className="space-y-4">
        <SubHeading>Testing Examples</SubHeading>
        <Accordion
          panels={[
            {
              id: "1",
              title: "Router Initialization Tests",
              content: (
                <div>
                  <Text>
                    Ensure that your router initializes properly and can manage
                    routes:
                  </Text>
                  <CodeBlock language="language-javascript">{`import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { initRouter, rootElement } from "./router";

describe("Router Initialization", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should initialize the router", () => {
    const root = document.createElement("div");
    initRouter(root);
    expect(rootElement).toBe(root);
  });
});`}</CodeBlock>
                </div>
              ),
            },
            {
              id: "2",
              title: "Path Resolution Tests",
              content: (
                <div>
                  <Text>Validate the behavior of route path resolution:</Text>
                  <CodeBlock language="language-javascript">{`import { describe, it, expect } from "vitest";
import { resolvePath } from "./router";

describe("resolvePath", () => {
  it("should resolve paths with parameters", () => {
    expect(resolvePath("/user/:id", { id: "123" })).toBe("/user/123");
  });

  it("should handle paths without parameters", () => {
    expect(resolvePath("/home", {})).toBe("/home");
  });
});`}</CodeBlock>
                </div>
              ),
            },
            {
              id: "3",
              title: "Component Resolution Tests",
              content: (
                <div>
                  <Text>
                    Ensure components resolve correctly, both synchronously and
                    asynchronously:
                  </Text>
                  <CodeBlock language="language-javascript">{`import { describe, it, expect } from "vitest";
import { resolveComponent } from "./router";

describe("resolveComponent", () => {
  it("should return an HTMLElement for a sync component", async () => {
    const component = (props) => {
      const el = document.createElement("div");
      el.textContent = props.id;
      return el;
    };
    const result = await resolveComponent(component, { id: "123" });
    expect(result).toBeInstanceOf(HTMLElement);
    expect(result.textContent).toBe("123");
  });
});`}</CodeBlock>
                </div>
              ),
            },
            {
              id: "4",
              title: "Navigation Tests",
              content: (
                <div>
                  <Text>
                    Verify the router navigates to paths correctly, including
                    query strings and hashes:
                  </Text>
                  <CodeBlock language="language-javascript">{`import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { navigateTo, initRouter } from "./router";

describe("navigateTo", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    initRouter(document.getElementById("app"));
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should navigate to a path with query parameters", async () => {
    navigateTo("/test/123?q=search");
    expect(window.location.pathname).toBe("/test/123");
    expect(window.location.search).toBe("?q=search");
  });
});`}</CodeBlock>
                </div>
              ),
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <SubHeading>Coverage Reporting</SubHeading>
        <Text>
          Coverage reports help ensure all critical code paths are tested.
          Configure coverage in your <code>vite.config.ts</code>:
        </Text>
        <CodeBlock language="language-javascript">{`export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/'],
    },
  },
});`}</CodeBlock>
        <Text>Then run:</Text>
        <CodeBlock language="language-bash">
          {"npm run test:coverage"}
        </CodeBlock>
        <Text>
          Open the generated <code>coverage/index.html</code> for a detailed
          report.
        </Text>
      </section>

      <section className="space-y-4">
        <SubHeading>Debugging Tests</SubHeading>
        <Text>
          Use the <code>--inspect</code> flag to debug tests:
        </Text>
        <CodeBlock language="language-bash">
          {"npm run test -- --inspect"}
        </CodeBlock>
        <Text>
          Attach Chrome DevTools at <code>chrome://inspect</code> for
          step-by-step debugging.
        </Text>
      </section>

      <section className="space-y-4">
        <SubHeading>Next Steps</SubHeading>
        <Text>
          - Add tests for edge cases, ensuring robustness for all features.
        </Text>
        <Text>- Experiment with snapshot testing for visual regressions.</Text>
        <Text>
          - Contribute your tests to the TSFW repo to help improve test coverage
          and quality.
        </Text>
      </section>
    </div>
  );
}
