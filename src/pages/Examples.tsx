import { LocalTodos } from "@components/examples/LocalTodos";
import { Heading, SubHeading, Text } from "@components/ui/Text";

export default function ExamplesPage() {
  return (
    <div>
      <Heading>Examples</Heading>

      <div class="mt-12 space-y-4">
        <SubHeading>Todos Example</SubHeading>
        <Text class="mt-4">
          This example demonstrates a simple user list with age that is
          persisted in local storage. This state is synced across tabs and
          refreshes.
        </Text>

        <LocalTodos />
      </div>
    </div>
  );
}
