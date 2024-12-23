import { createState } from "@core/state";
import { Button } from "@components/ui/Button";
import { Text } from "@components/ui/Text";
import { updateTextContent } from "@core/utils";
import { logger } from "@core/logger";

interface CounterState {
	count: number;
}

const counterState = createState<CounterState>("counter", { count: 0 });

function IncrementButton() {
	function incrementCounter() {
		counterState.setState({ count: counterState.getState().count + 1 });
	}

	return (
		<Button color="success" onClick={incrementCounter}>
			Increment
		</Button>
	);
}

function DecrementButton() {
	function decrementCounter() {
		counterState.setState({ count: counterState.getState().count - 1 });
	}

	return (
		<Button color="error" onClick={decrementCounter}>
			Decrement
		</Button>
	);
}

export function MemoryState() {
	// Subscribe to counter state changes
	counterState.subscribe((state) => {
		logger.info("Counter state changed", state);

		// Update the count text directly by ID
		updateTextContent("#count-text", `${state.count}`);
	});

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
		</div>
	);
}
