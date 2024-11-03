// src/components/Card.tsx
import { jsx } from "@core/jsx";
import { SubHeading } from "./Text";

export function Card({
  children,
  class: className = "",
}: {
  children: any;
  class?: string;
}) {
  return (
    <div
      class={`bg-white dark:bg-zinc-950 shadow-md rounded-lg p-6 mb-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  class: className = "",
}: {
  children: any;
  class?: string;
}) {
  return (
    <SubHeading class={`text-xl font-bold mb-2 ${className}`}>
      {children}
    </SubHeading>
  );
}

export function CardBody({
  children,
  class: className = "",
}: {
  children: any;
  class?: string;
}) {
  return <div class={`text-gray-700 ${className}`}>{children}</div>;
}
