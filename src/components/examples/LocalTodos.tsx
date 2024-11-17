import { createPersistentState, createState } from "@core/state";
import { Button } from "@components/ui/Button";
import { Text } from "@components/ui/Text";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

type TodoState = Todo[];

const TODO_ID = "todos-local";

const todoState = createPersistentState<TodoState>(TODO_ID, "local", [
  { id: 1, task: "Buy groceries", completed: false },
  { id: 2, task: "Finish project", completed: false },
  { id: 3, task: "Call mom", completed: true },
]);

await todoState.whenReady();

function createConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.style.position = "fixed";
  confettiContainer.style.top = "0";
  confettiContainer.style.left = "0";
  confettiContainer.style.width = "100%";
  confettiContainer.style.height = "100%";
  confettiContainer.style.pointerEvents = "none";
  confettiContainer.style.zIndex = "1000";
  document.body.appendChild(confettiContainer);

  const confettiCount = 100;
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700"];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "6px";
    confetti.style.height = "6px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = "50%";
    confetti.style.top = `${Math.random() * 100}vh`;
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.opacity = "1";
    confetti.style.animation = `confetti-fall ${
      Math.random() * 2 + 1
    }s ease-out, fade-out 2s ease-out`;
    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => {
    document.body.removeChild(confettiContainer);
  }, 2000);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes confetti-fall {
      to {
        transform: translateY(100vh) rotate(720deg);
      }
    }
    @keyframes fade-out {
      to {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function TodoToggle({ todoId }: { todoId: number }) {
  function toggleCompletion() {
    let updatedTodo: Todo | undefined;

    const newTodos = todoState.getState().map((todo) => {
      if (todo.id === todoId) {
        updatedTodo = { ...todo, completed: !todo.completed };
        return updatedTodo;
      }
      return todo;
    });
    todoState.setState(newTodos);

    // Trigger confetti when marking as completed
    if (updatedTodo?.completed) {
      createConfetti();
    }
  }

  return (
    <input
      type="checkbox"
      id={`${TODO_ID}-complete-${todoId}`}
      checked={
        todoState.getState().find((todo) => todo.id === todoId)?.completed
      }
      onChange={toggleCompletion}
      class="h-4 w-4 accent-emerald-600"
    />
  );
}

function DeleteTodoButton({ todoId }: { todoId: number }) {
  function deleteTodo() {
    const todos = todoState.getState();
    todoState.setState(todos.filter((todo) => todo.id !== todoId));
  }

  return (
    <Button color="red" onClick={deleteTodo}>
      Delete
    </Button>
  );
}

export function AddTodo() {
  function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector("input[name='task']") as HTMLInputElement;

    const task = input.value.trim();
    if (!task) {
      alert("Please enter a task");
      return;
    }

    const todos = todoState.getState();
    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
      task,
      completed: false,
    };

    const newTodos = [...todos, newTodo];
    todoState.setState(newTodos);
    input.value = "";
  }

  return (
    <form onSubmit={handleSubmit} class="flex gap-4 items-center mb-4">
      <input
        type="text"
        name="task"
        placeholder="Enter a new task"
        class="rounded px-2 py-1 dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        required
      />
      <Button color="emerald" type="submit">
        Add Todo
      </Button>
    </form>
  );
}

export function LocalTodos() {
  // Subscribe to todo state changes for side effects
  todoState.subscribe((newTodos, oldTodos) => {
    console.log("Local todo state changed", newTodos, oldTodos);
    const todoContainer = document.getElementById("todo-container");

    newTodos.forEach((newTodo) => {
      const oldTodo = oldTodos?.find((t) => t.id === newTodo.id);
      const todoRow = document.getElementById(`${TODO_ID}-${newTodo.id}`);

      if (!oldTodo) {
        const newRow = TodoItem({ todo: newTodo });
        todoContainer?.appendChild(newRow);
      } else if (oldTodo.completed !== newTodo.completed) {
        const checkbox = document.getElementById(
          `${TODO_ID}-complete-${newTodo.id}`
        ) as HTMLInputElement;
        if (checkbox) {
          checkbox.checked = newTodo.completed;
        }
        const statusElement = todoRow?.querySelector(
          `#${TODO_ID}-status-${newTodo.id}`
        );
        if (statusElement) {
          statusElement.textContent = newTodo.completed
            ? "Completed"
            : "Pending";
        }
      }
    });

    if (oldTodos) {
      oldTodos.forEach((oldTodo) => {
        if (!newTodos.find((t) => t.id === oldTodo.id)) {
          const todoRow = document.getElementById(`${TODO_ID}-${oldTodo.id}`);
          todoRow?.remove();
        }
      });
    }
  });

  return (
    <div>
      <AddTodo />
      <table class="w-full text-center border-collapse">
        <thead>
          <tr>
            <th class="py-4 px-6 border-b-2 border-zinc-300 dark:border-zinc-600"></th>
            <th class="py-4 px-6 border-b-2 border-zinc-300 dark:border-zinc-600">
              <Text>Task</Text>
            </th>
            <th class="py-4 px-6 border-b-2 border-zinc-300 dark:border-zinc-600">
              <Text>Status</Text>
            </th>
            <th class="py-4 px-6 border-b-2 border-zinc-300 dark:border-zinc-600"></th>
          </tr>
        </thead>
        <tbody id="todo-container">
          {todoState.getState().map((todo) => (
            <TodoItem todo={todo} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <tr id={`${TODO_ID}-${todo.id}`}>
      <td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600">
        <TodoToggle todoId={todo.id} />
      </td>
      <td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600 max-w-[150px]">
        <Text id={`${TODO_ID}-text-${todo.id}`} class="truncate">
          {todo.task}
        </Text>
      </td>
      <td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600">
        <Text id={`${TODO_ID}-status-${todo.id}`}>
          {todo.completed ? "Completed" : "Pending"}
        </Text>
      </td>
      <td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600 flex justify-center gap-4">
        <DeleteTodoButton todoId={todo.id} />
      </td>
    </tr>
  );
}
