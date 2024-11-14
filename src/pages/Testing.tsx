import { Heading } from "@components/ui/Text";
import { type TSFWProps } from "@core/router";

export default function TestingPage(props: TSFWProps<{ id: string }>) {
  console.log("PROPS", props);
  return (
    <div>
      <Heading>Testing</Heading>
    </div>
  );
}
