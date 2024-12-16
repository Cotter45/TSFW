import { Badge } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { Accordion } from "@components/ui/Accordion";
import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Card, CardTitle, CardBody } from "@components/ui/Card";

import "@components/web-components/WebComp";
import { MemoryState } from "@components/examples/Memory";
import { LocalState } from "@components/examples/Local";
import { SessionState } from "@components/examples/Session";
import { Avatar } from "@components/ui/Avatar";
import { Modal, ModalBox, ModalTrigger } from "@components/ui/Modal";

export default function WelcomePage() {
	return (
		<div className="flex flex-col gap-8 mx-auto px-4 py-8">
			<div class="mx-auto">
				<Avatar size="w-32" shape="rounded-full">
					<img
						src="/icon.png"
						alt="Avatar"
						class="bg-transparent filter drop-shadow-[0_0_5px_rgba(37,122,87,1)]"
					/>
				</Avatar>
			</div>

			<section class="text-center mb-12">
				<Heading>
					Welcome to <Badge color="emerald">TSFW</Badge>
				</Heading>

				<Text>
					“Another TypeScript Framework” that’s (almost) just JavaScript.
				</Text>
			</section>

			<section>
				<SubHeading>Why TSFW Exists</SubHeading>
				<div class="space-y-4 mt-2">
					<Text>
						The modern JavaScript and TypeScript ecosystem is a wild jungle.
						<strong> React, Remix, Next.js </strong> – all powerful but bogged
						down by bloated dependencies, frequent breaking changes, and hidden
						complexities that leave devs tangled in change logs.{" "}
						<Badge>TSFW</Badge>
						is my take on a framework that's lightweight, transparent, and
						(hopefully) free of footguns.
					</Text>
					<Text class="mt-2">
						Inspired by a desire to strip away the noise while keeping the tools
						and conveniences that make coding fun. With <Badge>TSFW</Badge>, you
						can just use JavaScript, JSX, and a sprinkle of state magic across
						tabs – minus the headaches.
					</Text>
				</div>
			</section>

			<section>
				<SubHeading>Key Features</SubHeading>
				<div class="mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
					<Card class="p-4">
						<CardTitle>🏗 Custom JSX</CardTitle>
						<CardBody>
							<Text>
								Use JSX without React. Enjoy the flexibility of HTML, JSX, and
								components.
							</Text>
						</CardBody>
					</Card>

					<Card class="p-4">
						<CardTitle>📦 Web Components</CardTitle>
						<CardBody>
							<Text>
								Full support for web components with custom elements and
								absolutely 0 weird configs.
							</Text>
						</CardBody>
					</Card>

					<Card class="p-4">
						<CardTitle>🗂 State Management</CardTitle>
						<CardBody>
							<Text>
								Built in localized state and persistant storage that syncs
								across tabs without the if (typeof window !== 'undefined')
								dance.
							</Text>
						</CardBody>
					</Card>

					<Card class="p-4">
						<CardTitle>📜 Type-safe Routing</CardTitle>
						<CardBody>
							<Text>
								Type-safe routes with support for data preloading, caching, and
								custom TTL.
							</Text>
						</CardBody>
					</Card>

					<Card class="p-4">
						<CardTitle>🔍 Testing</CardTitle>
						<CardBody>
							<Text>
								A simple testing setup with Vitest and React Testing Library
								that just works.
							</Text>
						</CardBody>
					</Card>
				</div>
			</section>

			<section class="mt-8 text-center">
				<Button href="/getting-started">Get Started</Button>
				<Text class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					Jump straight in or continue exploring below.
				</Text>
			</section>

			<section>
				<SubHeading class="mt-12 mb-4">A Taste of TSFW</SubHeading>
				<Accordion
					panels={[
						{
							id: "jsx",
							title: "JSX because it rocks",
							content: (
								<Text>
									<Text>
										Look Ma, no <strong>React</strong>! With TSFW, you can work
										with JSX like you would in React, without the bloat.
									</Text>
								</Text>
							),
						},
						{
							id: "web-components",
							title: "Web Components because they're reliable",
							content: <tsfw-component />,
						},
						{
							id: "routing",
							title: "Routing because who doesn't need it",
							content: (
								<Text>
									<Text>
										With a built-in router that compiles type-safe routes at
										startup, routing is easy and reliable.
									</Text>
								</Text>
							),
						},
						{
							id: "state",
							title: "State management because ___",
							content: (
								<Text>
									<Text>
										Enjoy persistent state management that syncs across tabs.
										Perfect for multi-tab projects without custom setups.
									</Text>
								</Text>
							),
						},
					]}
				/>

				{/* Interactive Example: Dialog */}
				<div class="w-full mt-12 flex justify-center">
					<ModalTrigger id="example-modal" color="outline">
						Open an Example Modal
					</ModalTrigger>

					<Modal id="example-modal">
						<ModalBox id="example-modal">
							<div>
								<Heading>Just a Demo Modal</Heading>
								<Text class="mt-3 ml-3">
									Here’s an example of a simple modal that demonstrates TSFW’s
									custom modal component.
								</Text>
							</div>
						</ModalBox>
					</Modal>
				</div>

				<div class="mt-12 space-y-4">
					<SubHeading>Memory State Example</SubHeading>
					<Text class="mt-4">
						This example demonstrates a simple counter using memory state that
						is centralized to the current tab and does not persist across tabs
						or refreshes.
					</Text>

					<MemoryState />
				</div>

				<div class="mt-12 space-y-4">
					<SubHeading>Local Storage State Example</SubHeading>
					<Text class="mt-4">
						This example demonstrates a simple user list with age that is stored
						in local storage. This state is synced across tabs and refreshes.
					</Text>

					<LocalState />
				</div>

				<div class="mt-12 space-y-4">
					<SubHeading>Session Storage State Example</SubHeading>
					<Text class="mt-4">
						This example demonstrates a simple user list with age that is stored
						in session storage. This state is synced across tabs and refreshes,
						but NOT across sessions (new tabs, new windows etc) because ya know
						- SESSION storage.
					</Text>

					<SessionState />
				</div>
			</section>
		</div>
	);
}
