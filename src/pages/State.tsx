import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";

import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Badge } from "@components/ui/Badge";
import { LocalState } from "@components/examples/Local";

export default function StateManagementPage() {
  Prism.hooks.add("after-highlight", function (env) {
    env.element.innerHTML = env.highlightedCode;
  });

  setTimeout(() => {
    Prism.highlightAll();
  }, 100);

  return (
    <div className="flex flex-col gap-8 mx-auto px-4 py-8">
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
              local, session and IndexedDB storage.
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
          Use <Badge>createPersistentState</Badge> to store state in local,
          session, or IndexedDB storage. This allows state persistence across
          sessions and tabs.
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
          <code>{`userListState.subscribe((state) => {
  console.log("User list updated:", state);
});`}</code>
        </pre>

        <Text>
          The <Badge>subscribe</Badge> function enables responsive UI updates
          whenever state changes, making it useful for managing components that
          depend on the current state.
        </Text>
      </section>

      <section className="space-y-4">
        <SubHeading>State Validation</SubHeading>
        <Text>
          You can provide a validation function when creating a state. If the
          validation fails, the state will not update.
        </Text>

        <pre className="language-javascript !rounded-md">
          <code>{`const validatedState = createPersistentState("validated", "local", { count: 0 }, (state) => state.count >= 0);

validatedState.setState({ count: -1 }); // This will not update because count < 0`}</code>
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
          <code>{`const sharedState = createPersistentState("sharedCount", "local", { count: 0 });

sharedState.subscribe((state) => {
  console.log("Shared count updated:", state.count);
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
          <li>
            <Text>
              <strong>IndexedDB</strong> – Provides large, structured data
              storage across tabs and sessions.
            </Text>
          </li>
        </ul>

        <Text>
          Specify a storage type when creating state to control where data is
          stored and how it persists. For example,{" "}
          <Badge>createPersistentState("example", "idb", {`{...data}`})</Badge>
          will store data in IndexedDB.
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

const userState = createPersistentState<UserState>("users-local", "local", [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 },
]);

function IncreaseAgeButton({ userId }: { userId: number }) {
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
}

function DecreaseAgeButton({ userId }: { userId: number }) {
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
}

export function LocalState() {
  // Subscribe to user state changes to update the UI
  userState.subscribe((state) => {
    console.log("Local user state changed", state);

    // Update age text directly by ID if needed
    state.forEach((user, index) => {
      const ageElement = document.getElementById(\`local-age-text-\${index}\`);
      if (ageElement) {
        ageElement.textContent = \`\${user.age}\`;
      }
    });
  });

  return (
    <table class="w-full text-center border-collapse">
      <thead>
        <tr>
          <th class="py-4 px-6 border-b-2 border-zinc-300 dark:border-zinc-600">
            <Text>Name</Text>
          </th>
          <th class="py-4 px-6 border-b-2 border-zinc-300 dark:border-zinc-600">
            <Text>Age</Text>
          </th>
          <th class="py-4 px-6 border-b-2 border-zinc-300 dark:border-zinc-600">
            <Text>Actions</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {userState.getState().map((user, index) => (
          <tr key={user.id}>
            <td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600">
              <Text>{user.name}</Text>
            </td>
            <td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600">
              <Text id={\`local-age-text-\${index}\`}>{user.age}</Text>
            </td>
            <td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600 flex justify-center gap-4">
              <IncreaseAgeButton userId={user.id} />
              <DecreaseAgeButton userId={user.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
`}</code>
        </pre>

        <div class="flex items-center justify-center">
          <LocalState />
        </div>

        <Text>
          In this example, we create a user list state that is stored in local
          storage. The user list is updated with buttons that increase or
          decrease the age of each user. The UI is automatically can be updated
          by subscribing to state changes, allowing for real-time updates and
          whatever else you can imagine.
        </Text>
      </section>
    </div>
  );
}
