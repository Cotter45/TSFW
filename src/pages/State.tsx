import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Badge } from "@components/ui/Badge";
import { LocalState } from "@components/examples/Local";
import { Table } from "@components/ui/Table";
import { CountButtonExample } from "@components/examples/Signal";

export default function StateManagementPage() {
	return (
		<div className="fade_in flex flex-col gap-8 mx-auto px-4 py-8">
			<section className="space-y-4">
				<Heading>State Management Documentation</Heading>
				<Text>
					TSFW’s state management solution is a flexible and efficient way to
					manage application state, providing type-safe persistence across tabs
					and storage types.
				</Text>
			</section>

			<section>
				<SubHeading>Overview of TSFW State</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
					<li>
						<Text>
							<strong>Type-safe</strong> state management that provides strong
							typing and validation options.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Cross-tab synchronization</strong> with the
							BroadcastChannel API.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Multiple storage options</strong>, including memory,
							local, and session storage.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Automatic state persistence</strong> and restoration.
						</Text>
					</li>
				</ul>
			</section>

			<section className="space-y-4">
				<SubHeading>Creating and Using State</SubHeading>
				<Text>
					You can create state using <Badge>createState</Badge> for in-memory
					state or
					<Badge>createPersistentState</Badge> for persistent storage. State can
					be synchronized across tabs as long as it is created with
					<Badge>createPersistentState</Badge>.
				</Text>

				<pre className="language-javascript !rounded-md">
					<code>{`import { createState } from "@core/state";

const counterState = createState("counter", { count: 0 });

function incrementCounter() {
  counterState.setState({ count: counterState.getState().count + 1 });
}`}</code>
				</pre>

				<Text>
					In this example, we define a simple in-memory counter state using
					<Badge>createState</Badge>. This state is only available in the
					current tab.
				</Text>
			</section>

			<section className="space-y-4">
				<SubHeading>Persistent State with Cross-Tab Sync</SubHeading>
				<Text>
					Use <Badge>createPersistentState</Badge> to store state in local, or
					session storage. This allows state persistence across sessions and
					tabs.
				</Text>

				<pre className="language-javascript !rounded-md">
					<code>{`import { createPersistentState } from "@core/state";

const userListState = createPersistentState("users", "local", [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
]);

function addUser(name, age) {
  const users = userListState.getState();
  userListState.setState([...users, { id: users.length + 1, name, age }]);
}`}</code>
				</pre>

				<Text>
					Here, <Badge>createPersistentState</Badge> stores the user list in
					local storage, synchronizing changes across tabs. Changes are
					automatically broadcasted using the BroadcastChannel API.
				</Text>
			</section>

			<section className="space-y-4">
				<SubHeading>Subscribing to State Changes</SubHeading>
				<Text>
					To react to state changes, use <Badge>subscribe</Badge>. This
					registers a callback that will be triggered on every update.
				</Text>

				<pre className="language-javascript !rounded-md">
					<code>{`userListState.subscribe((oldState, newState) => {
  console.log("User list updated:", oldState, newState);
});`}</code>
				</pre>

				<Text>
					The <Badge>subscribe</Badge> function enables responsive UI updates
					whenever state changes, making it useful for managing components that
					depend on the current state.
				</Text>

				<Badge color="amber">
					Note:
					<br />
					<br />
					In order to subscribe to state changes across multiple components, you
					must pass a unique ID to the subscribe function. This ID is used to
					identify the subscription and prevent duplicate listeners.
				</Badge>
				<Text>
					In order to subscribe to state changes across multiple components, you
					must pass a unique ID to the <Badge>subscribe</Badge> function. This
					ID is used to identify the subscription and prevent duplicate
					listeners.
				</Text>
			</section>

			<section className="space-y-4">
				<SubHeading>State Validation</SubHeading>
				<Text>
					You can provide a validation function when creating a state. If the
					validation fails, the state will not update.
				</Text>

				<pre className="language-javascript !rounded-md">
					<code>
						{`const validatedState =
  createPersistentState(
    "validated",
    "local",
    { count: 0 },
    (state) => state.count >= 0
  );

// This will not update because count < 0
validatedState.setState({ count: -1 });
`}
					</code>
				</pre>

				<Text>
					This example ensures the <Badge>count</Badge> is always non-negative
					by using a validation function.
				</Text>
			</section>

			<section className="space-y-4">
				<SubHeading>Broadcasting and Cross-Tab Sync</SubHeading>
				<Text>
					By default, persistent states synchronize across tabs using the
					BroadcastChannel API. Changes in one tab are broadcasted and reflected
					in other open tabs.
				</Text>

				<pre className="language-javascript !rounded-md">
					<code>{`const sharedState =
    createPersistentState(
      "sharedCount",
      "local",
      { count: 0 }
      );

sharedState.subscribe((oldState, newState) => {
  console.log("Shared count updated:", oldState.count, newState.count);
});`}</code>
				</pre>

				<Text>
					The <Badge>sharedState</Badge> updates in real-time across tabs,
					allowing for multi-tab applications with shared state.
				</Text>
			</section>

			<section className="space-y-4">
				<SubHeading>Storage Options</SubHeading>
				<Text>
					TSFWState supports different storage options for persistence:
				</Text>

				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 pt-0 ml-6">
					<li>
						<Text>
							<strong>Local Storage</strong> – Persists data across sessions and
							tabs.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Session Storage</strong> – Persists data across tabs in a
							single session.
						</Text>
					</li>
				</ul>

				<Text>
					Specify a storage type when creating state to control where data is
					stored and how it persists. For example,{" "}
					<Badge>
						createPersistentState("example", "local", {"{...data}"})
					</Badge>
					will persist data in Local Storage.
				</Text>
			</section>

			<section className="space-y-4">
				<SubHeading>Full Example</SubHeading>

				<pre className="language-javascript !rounded-md">
					<code>{`import { createPersistentState } from "@core/state";
import { Button } from "@components/ui/Button";
import { Text } from "@components/ui/Text";

interface User {
  id: number;
  name: string;
  age: number;
}

type UserState = User[];

const userState =
  createPersistentState<UserState>(
    "users-local",
    "local",
    [
      { id: 1, name: "Alice", age: 30 },
      { id: 2, name: "Bob", age: 25 },
      { id: 3, name: "Charlie", age: 35 },
    ]);
`}</code>
				</pre>

				<pre className="language-javascript !rounded-md">
					<code>{`function IncreaseAgeButton({ userId }: { userId: number }) {
  function increaseAge() {
    console.log("Increase age for user", userId);
    const users = userState.getState();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex >= 0) {
      userState.setState({
        index: userIndex,
        data: { age: users[userIndex].age + 1 },
      });
    }
  }

  return (
    <Button color="teal" onClick={increaseAge}>
      +
    </Button>
  );
}`}</code>
				</pre>

				<pre className="language-javascript !rounded-md">
					<code>{`function DecreaseAgeButton({ userId }: { userId: number }) {
  function decreaseAge() {
    const users = userState.getState();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex >= 0) {
      userState.setState({
        index: userIndex,
        data: { age: users[userIndex].age - 1 },
      });
    }
  }

  return (
    <Button color="red" onClick={decreaseAge}>
      -
    </Button>
  );
}`}</code>
				</pre>

				<pre className="language-javascript !rounded-md">
					<code>{`export function LocalState() {
  // Subscribe to user state changes to update the UI
  userState.subscribe((newState, oldState) => {
    console.log("Local user state changed", newState);

    const { updated } = diffStates(newState, oldState, "id");

    updated.forEach(({ newItem }) => {
      updateTextContent(\`#local-age-text-\${newItem.id}\`, \`\${newItem.age}\`);
    });
  });

  return (
    <table class="w-full text-center border-collapse">
      <thead>
        <tr>
          <th>
            <Text>Name</Text>
          </th>
          <th>
            <Text>Age</Text>
          </th>
          <th>
            <Text>Actions</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {userState.getState().map((user, index) => (
          <tr key={user.id}>
            <td>
              <Text>{user.name}</Text>
            </td>
            <td>
              <Text id={\`local-age-text-\${index}\`}>{user.age}</Text>
            </td>
            <td>
              <IncreaseAgeButton userId={user.id} />
              <DecreaseAgeButton userId={user.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}</code>
				</pre>

				<div className="flex items-center justify-center">
					<LocalState />
				</div>

				<Text>
					In this example, we create a user list state that is stored in local
					storage. The user list is updated with buttons that increase or
					decrease the age of each user. The UI is automatically updated by
					subscribing to state changes, allowing for real-time updates and
					whatever else you can imagine.
				</Text>
			</section>

			<section className="space-y-4">
				<SubHeading>Signals for Lightweight State Management</SubHeading>
				<Text>
					For managing simpler data types or scenarios where persistence isn't
					required, TSFW provides a lightweight <Badge>Signal</Badge> class.
					Signals are perfect for scenarios that demand minimal overhead and
					instant reactivity without cross-tab synchronization or storage.
				</Text>

				<Text>
					Signals represent a single state value and notify listeners whenever
					the state changes.
				</Text>

				<pre className="language-javascript !rounded-md">
					<code>{`import { Signal } from "@core/signal";

const counter = new Signal(0);

// Subscribe to changes
counter.subscribe((newValue, oldValue) => {
  console.log(\`Counter changed from \${oldValue} to \${newValue}\`);
});

// Update the signal
counter.set(counter.get() + 1); // Logs: Counter changed from 0 to 1
`}</code>
				</pre>

				<Text>
					<strong>Features of Signals</strong>:
				</Text>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 pt-0 ml-6">
					<li>
						<Text>
							<strong>Lightweight</strong>: Designed for simple state management
							without persistence or complex storage.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Reactive</strong>: Automatically notifies subscribers of
							changes.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Easy-to-use API</strong>: Minimal boilerplate for managing
							state.
						</Text>
					</li>
				</ul>

				<Text>
					Listeners can be subscribed to a signal to react to state changes.
					Subscriptions return an unsubscribe function, ensuring cleanup is
					straightforward.
				</Text>

				<SubHeading>Signal Example</SubHeading>

				<Text>
					This example shows how to use a <Badge>Signal</Badge> for a simple
					data type and reactive state without requiring persistence or
					cross-tab sync.
				</Text>

				<CountButtonExample />

				<pre className="language-javascript !rounded-md">
					<code>{`import { Signal } from "@core/state";
import { Button } from "@components/ui/Button";
import { Text } from "@components/ui/Text";
import { updateTextContent } from "@core/utils";
import { logger } from "@core/logger";

// Create a Signal to manage the count
const countSignal = new Signal(0);

function IncrementButton() {
	function incrementCounter() {
		countSignal.set(countSignal.get() + 1);
	}

	return (
		<Button color="success" onClick={incrementCounter}>
			Increment
		</Button>
	);
}

function DecrementButton() {
	function decrementCounter() {
		countSignal.set(countSignal.get() - 1);
	}

	return (
		<Button color="error" onClick={decrementCounter}>
			Decrement
		</Button>
	);
}

export function CountButtonExample() {
	// Subscribe to countSignal changes
	countSignal.subscribe((newValue) => {
		logger.info("Count changed to", newValue);

		// Update the count text directly by ID
		updateTextContent("#count-text", \`\${newValue}\`);
	});

	return (
		<div class="h-full w-full flex flex-col items-center justify-center gap-10">
			<div class="flex gap-4">
				<Text class="flex gap-4">Count:</Text>
				<Text id="count-text">{\`\${countSignal.get()}\`}</Text>
			</div>
			<div class="space-x-4">
				<IncrementButton />
				<DecrementButton />
			</div>
		</div>
	);
}
`}</code>
				</pre>

				<SubHeading>Comparison: Persistent State vs. Signals</SubHeading>
				<Table
					id="state-comparison"
					columns={["Feature", "Persistent State", "Signals"]}
					rows={[
						{
							id: 1,
							feature: "Persistence",
							"persistent state": "Yes (local, session, IndexedDB)",
							signals: "No",
						},
						{
							id: 2,
							feature: "Cross-tab synchronization",
							"persistent state": "Yes",
							signals: "No",
						},
						{
							id: 3,
							feature: "Best suited for",
							"persistent state": "Complex or persistent data",
							signals: "Lightweight, transient data",
						},
						{
							id: 4,
							feature: "API Complexity",
							"persistent state": "Higher (storage, broadcast, validation)",
							signals: "Minimal",
						},
					]}
					striped
					searchable={false}
					toggleableColumns={false}
					class="mt-4"
				/>
			</section>
		</div>
	);
}
