import { Signal } from "@core/state";
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
		logger.info("Signal count changed to", newValue);

		// Update the count text directly by ID
		updateTextContent("#signal-count-text", `${newValue}`);
	});

	return (
		<div class="h-full w-full flex flex-col items-center justify-center gap-10">
			<div class="flex gap-4">
				<Text class="flex gap-4">Count:</Text>
				<Text id="signal-count-text">{`${countSignal.get()}`}</Text>
			</div>
			<div class="space-x-4">
				<IncrementButton />
				<DecrementButton />
			</div>
		</div>
	);
}
