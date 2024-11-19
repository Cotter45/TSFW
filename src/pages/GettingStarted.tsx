import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Accordion } from "@components/ui/Accordion";
import { clsx } from "@core/clsx";

function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  return (
    <pre class={clsx(language, "!rounded-md")}>
      <code>{children}</code>
    </pre>
  );
}

export default function GettingStartedPage() {
  return (
    <div className="flex flex-col gap-8 mx-auto px-4 py-8">
      <section className="space-y-4">
        <Heading>Getting Started with TSFW</Heading>
        <Text>
          Welcome to <strong>TSFW (Another Typescript Framework)</strong> – a
          minimalist, lightweight framework built for developers who want
          simplicity without sacrificing modern conveniences.
        </Text>
        <Text>
          TSFW lets you:
          <ul className="list-disc ml-8">
            <li>Use JSX without React.</li>
            <li>Build type-safe routes and manage state across tabs.</li>
            <li>Create fast, efficient single-page applications.</li>
          </ul>
          Designed to reduce complexity, it includes everything you need and
          nothing you don’t.
        </Text>
      </section>

      <section className="space-y-4">
        <SubHeading>Installation</SubHeading>
        <Text>You can start a new TSFW project in one of two ways:</Text>
        <Text>
          <strong>Option 1: Clone the Repository</strong>
        </Text>
        <CodeBlock language="language-language-bash">{`git clone https://github.com/Cotter45/TSFW.git
cd TSFW
npm install
npm run dev`}</CodeBlock>
        <Text>
          <strong>Option 2: Use npx</strong>
        </Text>
        <CodeBlock language="language-bash">{`npx @cotter45/tsfw@latest`}</CodeBlock>
        <Text>
          Follow the prompts to set up the directory and dependencies, then run
          the development server:
        </Text>
        <CodeBlock language="language-bash">{`cd <your-directory-name>
npm run dev`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <SubHeading>Project Structure</SubHeading>
        <Text>A typical TSFW project is organized like this:</Text>
        <CodeBlock language="language-bash">{`src/
├── components/           # Reusable JSX components
│   └── ui/               # UI components (e.g., Button, Accordion)
│   └── web-components/   # Web components wrapped in JSX
├── pages/                # Page components used in routing
├── core/                 # Core utilities (state management, routing, etc.)
├── public/               # Static assets (e.g., favicon, manifest)
├── types/                # Typescript type definitions
├── index.css             # Global styles
├── index.html            # Main HTML file
└── index.ts              # Application entry point`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <SubHeading>Running Your Project</SubHeading>
        <Text>
          <strong>Development Server:</strong> Launch the development server
          with:
        </Text>
        <CodeBlock language="language-bash">{`npm run dev`}</CodeBlock>
        <Text>
          <strong>Building for Production:</strong> Create a production build
          with:
        </Text>
        <CodeBlock language="language-bash">{`npm run build`}</CodeBlock>
        <Text>
          The optimized output will be in the <code>dist/</code> folder. Deploy
          it to your server to get started.
        </Text>
      </section>

      <section className="space-y-4">
        <SubHeading>Core Concepts</SubHeading>
        <Accordion
          panels={[
            {
              id: "1",
              title: "Custom JSX",
              content: (
                <div>
                  <Text>
                    Write components with JSX, free from external dependencies
                    like React:
                  </Text>
                  <CodeBlock language="language-javascript">{`import { Text } from "@components/ui/Text";

export function WelcomeMessage() {
  return <Text>Welcome to TSFW!</Text>;
}`}</CodeBlock>
                </div>
              ),
            },
            {
              id: "2",
              title: "Type-Safe Routing",
              content: (
                <div>
                  <Text>
                    Define routes with built-in support for preloading and
                    caching:
                  </Text>
                  <CodeBlock language="language-javascript">{`import { registerRoutes } from "@core/router";

registerRoutes({
  path: "/",
  component: App,
  loader: async () => ({ data: "Hello, World!" }),
  cacheLoader: "local",
  ttl: 1000,
});`}</CodeBlock>
                </div>
              ),
            },
            {
              id: "3",
              title: "State Management",
              content: (
                <div>
                  <Text>
                    Sync state across tabs and sessions with persistent storage:
                  </Text>
                  <CodeBlock language="language-javascript">{`import { createState } from "@core/state";

const counterState = createState("counter", { count: 0 });

counterState.subscribe((state) => console.log(state.count));
counterState.setState({ count: counterState.getState().count + 1 });`}</CodeBlock>
                </div>
              ),
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <SubHeading>Next Steps</SubHeading>
        <Text>
          - Explore the <code>/src</code> folder to see all available features.
        </Text>
        <Text>
          - Read the full documentation for detailed examples and guides.
        </Text>
        <Text>
          - Contribute by submitting pull requests or ideas to the repository.
        </Text>
      </section>

      <section className="space-y-4">
        <SubHeading>Feedback</SubHeading>
        <Text>
          Love it? Hate it? Burn the repo? Whatever your thoughts, let us know!
          Together, we can make TSFW a simpler, better alternative for modern
          app development.
        </Text>
      </section>
    </div>
  );
}
