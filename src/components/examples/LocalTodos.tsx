import { createPersistentState, createState } from "@core/state";
import { Button } from "@components/ui/Button";
import { Text } from "@components/ui/Text";
import { clsx } from "@core/clsx";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
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
    <form
      onSubmit={handleSubmit}
      class="flex gap-4 items-center justify-end mb-4"
    >
      <input
        type="text"
        name="task"
        placeholder="Enter a new task"
        class="rounded-lg px-4 py-2.5 sm:!py-1.5 dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
          newTodo.completed
            ? statusElement.classList.add("text-emerald-500")
            : statusElement.classList.remove("text-emerald-500");
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
    <div class="container mx-auto mt-6">
      <AddTodo />
      <ul
        id="todo-container"
        class="flex flex-col gap-4"
        role="list"
        aria-label="Todo List"
      >
        {todoState.getState().map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li
      id={`${TODO_ID}-${todo.id}`}
      class="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 shadow-md rounded-md gap-2"
      role="listitem"
      aria-label={`Todo item: ${todo.task}`}
    >
      <div class="flex items-center gap-4">
        <TodoToggle todoId={todo.id} />
        <Text
          id={`${TODO_ID}-text-${todo.id}`}
          class="line-clamp-1 hover:line-clamp-none"
        >
          {todo.task}
        </Text>
      </div>
      <div class="flex items-center gap-6">
        <span
          id={`${TODO_ID}-status-${todo.id}`}
          class={clsx(
            "text-sm font-medium",
            todo.completed ? "text-emerald-500" : "text-yellow-500"
          )}
        >
          {todo.completed ? "Completed" : "Pending"}
        </span>
        <DeleteTodoButton todoId={todo.id} />
      </div>
    </li>
  );
}
