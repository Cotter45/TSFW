import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import { CodeBlock } from "@components/CodeBlock";
import { toast, GlobalToastContainer } from "@components/ui/Toast";

export default function ToastDocumentationPage() {
	return (
		<div class="fade_in flex flex-col gap-10 px-4 py-8 max-w-full">
			<GlobalToastContainer />

			<section className="space-y-4">
				<Heading>Toast Documentation</Heading>

				<Text>
					The `Toast` component is a versatile notification system for alerts
					and updates. It supports various types, positions, and customizable
					durations for flexible use across your application.
				</Text>
			</section>

			<section>
				<SubHeading>Features</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
					<li>
						<Text>
							<strong>Dynamic Notifications</strong>: Supports success, error,
							warning, and info toasts.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Customizable Position</strong>: Place toasts in any corner
							of the screen (top-left, top-right, bottom-left, bottom-right).
						</Text>
					</li>
					<li>
						<Text>
							<strong>Timeout Control</strong>: Customizable timeout for each
							toast.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Real-time Updates</strong>: Dynamically adds and removes
							toasts as they are triggered.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Smooth Animations</strong>: Built-in transitions for toast
							appearance and removal.
						</Text>
					</li>
				</ul>
			</section>

			<section className="space-y-4">
				<SubHeading>Usage Examples</SubHeading>

				<div className="flex flex-wrap gap-4 justify-evenly">
					<Button
						color="success"
						onClick={() =>
							toast.success(
								"Success!",
								"Your operation was completed successfully.",
								{ href: "/", text: "Click to go to /" },
								3000,
							)
						}
					>
						Show Success Toast
					</Button>

					<Button
						color="error"
						onClick={() =>
							toast.error(
								"Error!",
								"Something went wrong. Please try again.",
								{ href: "/", text: "Click to go to /" },
								4000,
							)
						}
					>
						Show Error Toast
					</Button>

					<Button
						color="warning"
						onClick={() =>
							toast.warning(
								"Warning!",
								"This action might have unintended consequences.",
								undefined,
								5000,
							)
						}
					>
						Show Warning Toast
					</Button>

					<Button
						color="info"
						onClick={() =>
							toast.info(
								"Info",
								"Here is some information you might find useful.",
								undefined,
								3500,
							)
						}
					>
						Show Info Toast
					</Button>
				</div>

				<CodeBlock language="language-javascript">
					{`import { toast, GlobalToastContainer } from "@components/ui/Toast";

function Example() {
  return (
    <>
      <GlobalToastContainer position="top-right" />
      <button
        onClick={() =>
          toast.success("Success!", "Your operation was completed successfully.")
        }
      >
        Show Toast
      </button>
    </>
  );
}`}
				</CodeBlock>
			</section>

			<section className="space-y-4">
				<SubHeading>Customization</SubHeading>
				<Text>
					The `toast` object provides methods to trigger different types of
					toasts:
				</Text>
				<CodeBlock language="language-javascript">
					{`toast.success(
  title: string,
  description: string,
  link?: { href: RoutePaths; text: string },
  timeout?: number
);

toast.error(
  title: string,
  description: string,
  link?: { href: RoutePaths; text: string },
  timeout?: number
);

toast.warning(
  title: string,
  description: string,
  link?: { href: RoutePaths; text: string },
  timeout?: number
);

toast.info(
  title: string,
  description: string,
  link?: { href: RoutePaths; text: string },
  timeout?: number
);`}
				</CodeBlock>
			</section>
		</div>
	);
}
