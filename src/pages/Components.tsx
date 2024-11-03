// src/pages/ComponentsPage.tsx
import { Accordion } from "@components/ui/Accordion";
import { Badge, BadgeButton } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { Heading, Text } from "@components/ui/Text";

export default function ComponentsPage() {
  return (
    <div class="flex flex-col gap-10">
      <div class="space-y-2">
        <Heading class="text-2xl">Components</Heading>
        <Text>Here you can find all the components of the app</Text>
      </div>

      <Button
        href="/"
        color="teal"
        onClick={() => console.log("Button clicked")}
      >
        Click me
      </Button>

      <Badge color="teal">Badge</Badge>
      <BadgeButton color="teal" href="/">
        Badge Button
      </BadgeButton>

      <Accordion
        class="w-full max-w-lg mx-auto"
        panels={[
          {
            id: "1",
            title: "Panel 1",
            content:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          { id: "2", title: "Panel 2", content: "Content for panel 2." },
          { id: "3", title: "Panel 3", content: "Content for panel 3." },
        ]}
      />
    </div>
  );
}
