import { Heading, SubHeading, Text } from "@components/ui/Text";

export default function ComponentsPage() {
  return (
    <div class="flex flex-col gap-10 px-4 py-8 max-w-full" data-outlet>
      <div class="space-y-2">
        <Heading class="text-2xl">TSFW Components</Heading>
      </div>

      <section>
        <div class="space-y-4">
          <SubHeading class="text-xl">Why DaisyUI?</SubHeading>
          <Text>
            DaisyUI is a CSS-first component library built on top of
            TailwindCSS. It provides a set of beautifully designed, pre-styled
            components, which saves you time and effort in building UI elements.
          </Text>

          <SubHeading class="text-lg">Key Features</SubHeading>
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <Text>
                <strong>CSS-First Approach:</strong> DaisyUI leverages
                TailwindCSS classes directly, ensuring that you have full
                control over the styling of your components.
              </Text>
            </li>
            <li>
              <Text>
                <strong>Accessible and Consistent:</strong> Components are
                designed with accessibility in mind and follow consistent design
                principles.
              </Text>
            </li>
            <li>
              <Text>
                <strong>Customizable Themes:</strong> DaisyUI provides built-in
                theme support, allowing you to easily switch themes or create
                your own.
              </Text>
            </li>
            <li>
              <Text>
                <strong>Time-Saving:</strong> Pre-designed components mean less
                time styling and more time focusing on functionality.
              </Text>
            </li>
          </ul>

          <SubHeading class="text-lg">Why Choose DaisyUI?</SubHeading>
          <Text>
            By using DaisyUI, you can enjoy the flexibility of TailwindCSS while
            benefiting from ready-made components that follow modern UI/UX
            standards. It’s ideal for developers who want to build fast,
            consistent, and visually appealing interfaces.
          </Text>
        </div>
      </section>
    </div>
  );
}
