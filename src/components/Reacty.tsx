// src/components/MyComponent.tsx
import { jsx } from "../core/jsx";
import { Button } from "./ui/Button";
import { Text } from "./ui/Text";

export default function Reacty() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is JSX!</p>

      {/* @ts-expect-error */}
      <Button href="/reacty/data" variant="outline">
        FetchReacty Data
      </Button>

      <div data-outlet />
    </div>
  );
}

export const ChildReacty = () => {
  return (
    <div>
      <h1>Child Reacty</h1>
      <p>This is JSX!</p>
    </div>
  );
};

export const ReactyRoot = () => {
  return (
    <div>
      <h1>Reacty Root</h1>

      <div data-outlet></div>
    </div>
  );
};

export const ReactyData = async ({ data }: { data: any }) => {
  return (
    <div>
      <h1>REACTY DATA</h1>
      <Text>description {data.data} </Text>
    </div>
  );
};

export const ReactyDataLoading = () => {
  return <div>Loading...</div>;
};
