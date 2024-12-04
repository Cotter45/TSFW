import { createPersistentState } from "@core/state";
import { Button } from "@components/ui/Button";
import { Text } from "@components/ui/Text";
import { diffStates, updateTextContent } from "@core/utils";
import { logger } from "@core/logger";

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
		logger.info("Increase age for user", userId);
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
		<Button color="success" onClick={increaseAge} variant="square">
			+
		</Button>
	);
}

function DecreaseAgeButton({ userId }: { userId: number }) {
	function decreaseAge() {
		logger.info("Decrease age for user", userId);
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
		<Button color="error" onClick={decreaseAge} variant="square">
			-
		</Button>
	);
}

export function LocalState() {
	// Subscribe to user state changes to update the UI
	userState.subscribe((newState, oldState) => {
		logger.info("Local user state changed", newState, oldState);

		const { updated } = diffStates(newState, oldState, "id");

		for (const { newItem } of updated) {
			updateTextContent(`#local-age-text-${newItem.id}`, `${newItem.age}`);
		}
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
				{userState.getState().map((user) => (
					<tr>
						<td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600">
							<Text>{user.name}</Text>
						</td>
						<td class="py-4 px-6 border-b border-zinc-300 dark:border-zinc-600">
							<Text id={`local-age-text-${user.id}`}>{user.age}</Text>
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
