import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import { ExternalLink, Link } from "@components/ui/Link";

export default function LinkDocumentationPage() {
	return (
		<div class="flex flex-col gap-10 px-4 py-8 max-w-full">
			<section className="space-y-4">
				<Heading>Link Component Documentation</Heading>

				<Text>
					The <code>Link</code> component provides a custom navigation solution
					for single-page applications. It prevents full-page reloads for
					internal links and adds support for active link styling.
				</Text>
			</section>

			<section>
				<SubHeading>Features</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<Text>
							<strong>Client-Side Navigation</strong>: Prevents page reloads for
							internal links.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Active State Management</strong>: Automatically applies
							the `aria-current="page"` attribute and active class styling for
							the current route.
						</Text>
					</li>
					<li>
						<Text>
							<strong>External Links</strong>: Automatically supports full-page
							navigation for external links (e.g., starting with "http").
						</Text>
					</li>
					<li>
						<Text>
							<strong>Custom Classes</strong>: Use the `class` prop for
							additional styling.
						</Text>
					</li>
				</ul>
			</section>

			<section>
				<SubHeading>Props</SubHeading>
				<Text>
					The following are the props available for the <code>Link</code>{" "}
					component:
				</Text>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<strong>href</strong>: The navigation target, which can be an
						internal route or an external URL.
					</li>
					<li>
						<strong>class</strong>: Optional class names to apply custom
						styling.
					</li>
					<li>
						<strong>onclick</strong>: A custom click handler function.
					</li>
					<li>
						<strong>children</strong>: The content (text, elements) inside the
						link.
					</li>
				</ul>
			</section>

			<section>
				<SubHeading>Examples</SubHeading>
				<Text>
					Here are examples showcasing the usage of the `Link` component:
				</Text>

				<div className="space-y-8">
					{/* Internal Link */}
					<div className="space-y-2">
						<SubHeading>Internal Link</SubHeading>
						<Text>
							Navigate to an internal route using client-side navigation:
						</Text>
						<Link href="/">Go Home</Link>
					</div>

					{/* External Link */}
					<div className="space-y-2">
						<SubHeading>External Link</SubHeading>
						<Text>
							External links (e.g., starting with "http") will navigate
							normally:
						</Text>
						<ExternalLink
							href="https://example.com"
							target="_blank"
							rel="noopener"
						>
							Visit Example.com
						</ExternalLink>
					</div>

					{/* Active Link */}
					<div className="space-y-2">
						<SubHeading>Active Link</SubHeading>
						<Text>
							The active class is applied automatically based on the current
							route:
						</Text>
						<div class="space-x-4">
							<Link href="/components/link" class="text-primary">
								Components / Link Page
							</Link>
							<Link href="/state">State Page</Link>
						</div>
					</div>
				</div>

				<CodeBlock language="language-javascript">
					{`import { Link } from "@components/ui/Link";

export default function ExamplePage() {
  return (
    <div>
      // Internal Navigation
      <Link href="/dashboard">
        Go to Dashboard
      </Link>

      // External Navigation
      <Link href="https://example.com" target="_blank" rel="noopener">
        Visit Example.com
      </Link>

      // Active Link if route === '/'
      <Link href="/">
        Home
      </Link>
      <Link href="/about">About</Link>
    </div>
  );
}`}
				</CodeBlock>
			</section>
		</div>
	);
}
