import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Accordion } from "@components/ui/Accordion";
import { CodeBlock } from "@components/CodeBlock";

export default function GettingStartedPage() {
	return (
		<div className="fade_in flex flex-col gap-8 mx-auto px-4 py-8">
			{/* Introduction */}
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

			{/* Installation */}
			<section className="space-y-4">
				<SubHeading>Installation</SubHeading>
				<Text>You can start a new TSFW project in one of two ways:</Text>
				<Text>
					<strong>Option 1: Clone the Repository</strong>
				</Text>
				<CodeBlock language="language-bash">{`git clone https://github.com/Cotter45/TSFW.git
cd TSFW
npm install
npm run dev`}</CodeBlock>
				<Text>
					<strong>Option 2: Use npx</strong>
				</Text>
				<CodeBlock language="language-bash">
					{"npx @cotter45/tsfw@latest"}
				</CodeBlock>
				<Text>
					Follow the prompts to set up the directory and dependencies, then run
					the development server:
				</Text>
				<CodeBlock language="language-bash">{`cd <your-directory-name>
npm run dev`}</CodeBlock>
			</section>

			{/* Project Structure */}
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

			{/* Utility Functions */}
			<section className="space-y-4">
				<SubHeading>Utility Functions</SubHeading>
				<Text>
					TSFW provides utility functions for common DOM and state operations.
					Below are some examples:
				</Text>

				{/* Utility Examples */}
				<Accordion
					panels={[
						{
							id: "1",
							title: "Get Elements",
							content: (
								<div>
									<Text>
										Use <code>getElement</code> and <code>getElements</code> to
										select DOM elements:
									</Text>
									<CodeBlock language="language-javascript">{`import { getElement, getElements } from "@core/utils";

// Select a single element
const myElement = getElement("#my-element");

// Select multiple elements
const buttons = getElements(".button");`}</CodeBlock>
								</div>
							),
						},
						{
							id: "2",
							title: "Manipulating Elements",
							content: (
								<div>
									<Text>
										Use <code>addElement</code>, <code>removeElement</code>,{" "}
										<code>updateTextContent</code>, and{" "}
										<code>replaceElement</code> to manipulate the DOM:
									</Text>
									<CodeBlock language="language-javascript">{`import { addElement, removeElement, updateTextContent } from "@core/utils";

// Add a new element
const newElement = TodoItem({ todo: Todo });
addElement("#container", newElement);

// Update text content
updateTextContent("#my-element", "Updated text");

// Remove an element
removeElement("#old-element");`}</CodeBlock>
								</div>
							),
						},
						{
							id: "3",
							title: "Toggle Classes",
							content: (
								<div>
									<Text>
										Use <code>toggleClass</code> to add or remove a class from
										an element:
									</Text>
									<CodeBlock language="language-javascript">{`import { toggleClass } from "@core/utils";

// Toggle visibility class
toggleClass("#my-element", "hidden");`}</CodeBlock>
								</div>
							),
						},
						{
							id: "4",
							title: "State Diffing",
							content: (
								<div>
									<Text>
										Use <code>diffStates</code> to compare two arrays of
										objects, identifying added, removed, and updated items:
									</Text>
									<CodeBlock language="language-javascript">{`import { diffStates } from "@core/utils";

const oldState = [{ id: 1, name: "John" }];
const newState = [
  { id: 1, name: "John" },
  { id: 2, name: "Doe" },
];

const { added, removed, updated } = diffStates(newState, oldState, "id");

console.log({ added, removed, updated });`}</CodeBlock>
								</div>
							),
						},
					]}
				/>
			</section>

			{/* Running Your Project */}
			<section className="space-y-4">
				<SubHeading>Running Your Project</SubHeading>
				<Text>
					<strong>Development Server:</strong> Launch the development server
					with:
				</Text>
				<CodeBlock language="language-bash">{"npm run dev"}</CodeBlock>
				<Text>
					<strong>Building for Production:</strong> Create a production build
					with:
				</Text>
				<CodeBlock language="language-bash">{"npm run build"}</CodeBlock>
				<Text>
					The optimized output will be in the <code>dist/</code> folder. Deploy
					it to your server to get started.
				</Text>
			</section>

			{/* Feedback */}
			<section className="space-y-4">
				<SubHeading>Feedback</SubHeading>
				<Text>
					Have suggestions or issues? Submit them on our{" "}
					<a
						href="https://github.com/Cotter45/TSFW"
						className="text-blue-600 underline"
					>
						GitHub repository
					</a>{" "}
					or join the discussion to help us improve TSFW.
				</Text>
			</section>
		</div>
	);
}
