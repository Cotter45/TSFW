import { createPersistentState, createState } from "@core/state";
import { Button } from "@components/ui/Button";
import { Text } from "@components/ui/Text";

interface User {
  id: number;
  name: string;
  age: number;
}

type UserState = User[];

const userState = createPersistentState<UserState>("users", "local", [
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
      Age
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
      De-Age
    </Button>
  );
}

export function LocalState() {
  // Subscribe to user state changes to update the UI
  userState.subscribe((state) => {
    console.log("User state changed", state);

    // Update age text directly by ID if needed
    state.forEach((user, index) => {
      const ageElement = document.getElementById(`age-text-${index}`);
      if (ageElement) {
        ageElement.textContent = `${user.age}`;
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
              <Text id={`age-text-${index}`}>{user.age}</Text>
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
