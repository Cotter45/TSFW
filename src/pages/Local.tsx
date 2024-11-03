import { createPersistentState } from "@core/state";

interface User {
  id: number;
  name: string;
  age: number;
}

type UserState = User[];

const userState = createPersistentState<UserState>(
  "users-local",
  [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 },
  ],
  "local"
);

function UserTable() {
  function increaseAge(userId: number) {
    const users = userState.getState();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex >= 0) {
      userState.setState({
        index: userIndex,
        data: { age: users[userIndex].age + 1 },
      });
    }
  }

  function decreaseAge(userId: number) {
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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userState.getState().map((user, index) => (
          <tr key={user.id}>
            <td data-bind={`users-local[${index}].name`}>{user.name}</td>
            <td data-bind={`users-local[${index}].age`}>{user.age}</td>
            <td class="flex gap-4">
              <button
                onClick={() => {
                  increaseAge(user.id);
                }}
              >
                Age
              </button>
              <button
                onClick={() => {
                  decreaseAge(user.id);
                }}
              >
                De-Age
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function IndexPage() {
  return (
    <div class="h-full w-full flex flex-col items-center justify-center gap-10">
      <UserTable />
    </div>
  );
}
