import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Accordion } from "@components/ui/Accordion";
import { CodeBlock } from "@components/CodeBlock";

export default function FAQPage() {
	return (
		<div className="fade_in flex flex-col gap-12 mx-auto px-4 py-8">
			<section className="space-y-4">
				<Heading>Frequently Asked Questions (FAQ)</Heading>
				<Text>
					Welcome to the FAQ page for{" "}
					<strong>TSFW (Another TypeScript Framework)</strong>. Below, you'll
					find answers to common questions about TSFW, from installation to
					advanced usage.
				</Text>
			</section>

			<section className="space-y-4 w-full max-w-3xl mx-auto">
				<SubHeading>General Questions</SubHeading>
				<Accordion
					class="lg:pl-4"
					panels={[
						{
							id: "1",
							title: "What is TSFW?",
							content: (
								<Text>
									TSFW is a minimalist TypeScript framework designed for
									developers who want a lightweight, modern development
									experience without the overhead of traditional frameworks. It
									includes custom JSX implementation, type-safe routing, and
									persistent state management.
								</Text>
							),
						},
						{
							id: "2",
							title: "Why should I use TSFW?",
							content: (
								<Text>
									TSFW simplifies development by removing unnecessary
									abstractions. It offers powerful tools like JSX without React,
									state synchronization across tabs, and type-safe routing, all
									while keeping a minimal footprint.
								</Text>
							),
						},
						{
							id: "3",
							title: "Is TSFW open source?",
							content: (
								<Text>
									Yes, TSFW is open source and licensed under the MIT License.
									Contributions are welcome!
								</Text>
							),
						},
					]}
				/>
			</section>

			<section className="space-y-4 w-full max-w-3xl mx-auto">
				<SubHeading>Getting Started</SubHeading>
				<Accordion
					class="lg:pl-4"
					panels={[
						{
							id: "4",
							title: "How do I install TSFW?",
							content: (
								<div>
									<Text>
										You can start a new project using one of the following
										methods:
									</Text>
									<CodeBlock language="language-bash">{`git clone https://github.com/Cotter45/TSFW.git
cd TSFW
npm install
npm run dev`}</CodeBlock>
									<Text>Or use the npx command for a guided setup:</Text>
									<CodeBlock language="language-bash">
										{"npx @cotter45/tsfw@latest"}
									</CodeBlock>
								</div>
							),
						},
						{
							id: "5",
							title: "What is the project structure?",
							content: (
								<CodeBlock language="language-bash">{`src/
├── components/
│   └── ui/               # UI components
│   └── web-components/   # Web components
├── pages/                # Page components
├── core/                 # Core utilities
├── public/               # Static assets
├── types/                # Type definitions
├── index.css             # Global styles
├── index.html            # Main HTML file
└── index.ts              # Application entry point`}</CodeBlock>
							),
						},
					]}
				/>
			</section>

			<section className="space-y-4 w-full max-w-3xl mx-auto">
				<SubHeading>Core Features</SubHeading>
				<Accordion
					class="lg:pl-4"
					panels={[
						{
							id: "6",
							title: "How does custom JSX work in TSFW?",
							content: (
								<div>
									<Text>
										TSFW enables you to write components with JSX without
										external dependencies like React:
									</Text>
									<CodeBlock language="language-javascript">{`import { Text } from "@components/ui/Text";

export function WelcomeMessage() {
  return <Text>Welcome to TSFW!</Text>;
}`}</CodeBlock>
								</div>
							),
						},
						{
							id: "7",
							title: "How do I define routes in TSFW?",
							content: (
								<div>
									<Text>
										TSFW supports type-safe routing with preloading and caching:
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
							id: "8",
							title: "How does state management work?",
							content: (
								<div>
									<Text>
										TSFW's state management includes options for memory, local
										storage, and session storage, syncing state across tabs:
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

			<section className="space-y-4 w-full max-w-3xl mx-auto">
				<SubHeading>Troubleshooting</SubHeading>
				<Accordion
					class="lg:pl-4"
					panels={[
						{
							id: "9",
							title: "What if I encounter an issue?",
							content: (
								<Text>
									Please check the documentation and open an issue on the GitHub
									repository if you need further assistance.
								</Text>
							),
						},
						{
							id: "10",
							title: "Can I customize TSFW?",
							content: (
								<Text>
									Absolutely! All core files are located in the{" "}
									<code>src/</code>
									folder, making it easy to tailor the framework to your needs.
								</Text>
							),
						},
					]}
				/>
			</section>

			<section className="space-y-4 w-full max-w-3xl mx-auto">
				<SubHeading>Feedback</SubHeading>
				<Text>
					Have suggestions or feedback? Let us know through GitHub issues or
					email. Your input helps improve TSFW for everyone!
				</Text>
			</section>
		</div>
	);
}
