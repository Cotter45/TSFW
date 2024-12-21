import { LocalTodos } from "@components/examples/LocalTodos";
import { Heading, SubHeading, Text } from "@components/ui/Text";

export default function ExamplesPage() {
	return (
		<div class="fade_in px-4 py-8">
			<Heading>Examples</Heading>

			<div class="mt-12 space-y-4">
				<SubHeading>Todos Example</SubHeading>
				<Text class="mt-4">
					This example demonstrates a simple todo list with storage that is
					persisted in local storage and synced across tabs or windows.
				</Text>

				<LocalTodos />
			</div>
		</div>
	);
}
