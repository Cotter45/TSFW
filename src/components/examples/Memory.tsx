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

export function MemoryState({
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
      countTextElement.textContent = `${state.count}`;
    }
  });

  // Initialize the count if provided in searchParams
  if (searchParams.has("count")) {
    counterState.setState({ count: Number(searchParams.get("count")) });
  }

  return (
    <div class="h-full w-full flex flex-col items-center justify-center gap-10">
      <div class="flex gap-4">
        <Text class="flex gap-4">Count:</Text>
        <Text id="count-text">{`${counterState.getState().count}`}</Text>
      </div>
      <div class="space-x-4">
        <IncrementButton />
        <DecrementButton />
      </div>

      <div data-outlet />
    </div>
  );
}
