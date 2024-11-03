// import { createState } from "@core/state";
// import { Button } from "@components/ui/Button";
// import { Text } from "@components/ui/Text";

// interface CounterState {
//   count: number;
// }

// const counterState = createState<CounterState>("counter", { count: 0 });

// function IncrementButton() {
//   function incrementCounter() {
//     counterState.getState().count++;
//   }

//   return (
//     <Button color="teal" onClick={incrementCounter}>
//       Increment
//     </Button>
//   );
// }

// function DecrementButton() {
//   function decrementCounter() {
//     counterState.getState().count--;
//   }

//   return (
//     <Button color="red" onClick={decrementCounter}>
//       Decrement
//     </Button>
//   );
// }

// export default function MemoryPage({
//   searchParams,
// }: {
//   searchParams: URLSearchParams;
// }) {
//   counterState.subscribe((state) => {
//     console.log("Counter state changed", state);
//   });

//   if (searchParams.has("count")) {
//     counterState.setState({ count: Number(searchParams.get("count")) });
//   }

//   return (
//     <div class="h-full w-full flex flex-col items-center justify-center gap-10">
//       <img
//         src="https://images.unsplash.com/photo-1730388623585-ce2dec1e2355?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Random Stuff"
//         class="h-48 aspect-auto"
//       />
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="white"
//         class="size-12"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M3.75 9h16.5m-16.5 6.75h16.5"
//         />
//       </svg>
//       <div class="flex gap-4">
//         <Text class="flex gap-4">Count: </Text>
//         <Text data-bind="counter.count">
//           count: {counterState.getState().count}
//         </Text>
//       </div>
//       <div class="space-x-4">
//         <IncrementButton />
//         <DecrementButton />
//       </div>

//       <div data-outlet />
//     </div>
//   );
// }

import { createState } from "@core/state";
import { Button } from "@components/ui/Button";
import { Text } from "@components/ui/Text";

interface CounterState {
  count: number;
}

const counterState = createState<CounterState>("counter", { count: 0 });

function IncrementButton() {
  function incrementCounter() {
    counterState.setState({ count: counterState.getState().count + 1 });
  }

  return (
    <Button color="teal" onClick={incrementCounter}>
      Increment
    </Button>
  );
}

function DecrementButton() {
  function decrementCounter() {
    counterState.setState({ count: counterState.getState().count - 1 });
  }

  return (
    <Button color="red" onClick={decrementCounter}>
      Decrement
    </Button>
  );
}

export default function MemoryPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  // Subscribe to counter state changes
  counterState.subscribe((state) => {
    console.log("Counter state changed", state);

    // Update the count text directly by ID
    const countTextElement = document.getElementById("count-text");
    if (countTextElement) {
      countTextElement.textContent = `Count: ${state.count}`;
    }
  });

  // Initialize the count if provided in searchParams
  if (searchParams.has("count")) {
    counterState.setState({ count: Number(searchParams.get("count")) });
  }

  return (
    <div class="h-full w-full flex flex-col items-center justify-center gap-10">
      <img
        src="https://images.unsplash.com/photo-1730388623585-ce2dec1e2355?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Random Stuff"
        class="h-48 aspect-auto"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        class="size-12"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
      <div class="flex gap-4">
        <Text class="flex gap-4">Count:</Text>
        <Text id="count-text">{`Count: ${counterState.getState().count}`}</Text>
      </div>
      <div class="space-x-4">
        <IncrementButton />
        <DecrementButton />
      </div>

      <div data-outlet />
    </div>
  );
}
