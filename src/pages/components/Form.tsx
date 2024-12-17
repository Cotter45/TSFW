import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import {
  Form,
  Input,
  Select,
  TextArea,
  Checkbox,
  Radio,
  Range,
  Toggle,
} from "@components/ui/Form";

export default function FormComponentsDocumentationPage() {
  return (
    <div class="flex flex-col gap-10 px-4 py-8 max-w-full">
      {/* Section: Introduction */}
      <section className="space-y-4">
        <Heading>Form Components Documentation</Heading>
        <Text>
          The form components provide a variety of form elements, including
          inputs, selects, checkboxes, radios, toggles, ranges, and more. They
          are designed to be accessible, customizable, and easy to integrate
          into any UI.
        </Text>
      </section>

      {/* Section: Features */}
      <section>
        <SubHeading>Features</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
          <li>
            <Text>
              <strong>Accessibility</strong>: All components include proper ARIA
              attributes for screen readers.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Consistent Styling</strong>: Unified look and feel across
              all form elements.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Custom Descriptions and Errors</strong>: Supports error
              messages, hints, and descriptions for each field.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Interactive Components</strong>: Range sliders, toggles,
              and more for enhanced UX.
            </Text>
          </li>
        </ul>
      </section>

      {/* Section: Examples */}
      <section className="space-y-8">
        <SubHeading>Examples</SubHeading>
        <Text>Below are examples of the various form components:</Text>

        {/* Input Field */}
        <div className="space-y-2">
          <SubHeading>Input Field</SubHeading>
          <Input
            id="name"
            name="name"
            label="Name"
            description="Please enter your full name."
            placeholder="John Doe"
            required
          />
        </div>

        {/* Input File Field */}
        <div className="space-y-2">
          <SubHeading>Input Field</SubHeading>
          <Input
            id="name"
            name="name"
            label="Name"
            type="file"
            description="Please upload your avatar."
          />
        </div>

        {/* TextArea */}
        <div className="space-y-2">
          <SubHeading>Text Area</SubHeading>
          <TextArea
            id="message"
            name="message"
            label="Message"
            description="Type your message here."
          />
        </div>

        {/* Select */}
        <div className="space-y-2">
          <SubHeading>Select Field</SubHeading>
          <Select
            id="country"
            name="country"
            label="Country"
            description="Choose your country."
          >
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
          </Select>
        </div>

        {/* Checkbox */}
        <div className="space-y-2">
          <SubHeading>Checkbox</SubHeading>
          <Checkbox name="agree" label="I agree to the terms and conditions." />
        </div>

        {/* Radio */}
        <div className="space-y-2">
          <SubHeading>Radio Buttons</SubHeading>
          <Radio name="gender" label="Male" value="male" />
          <Radio name="gender" label="Female" value="female" />
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <SubHeading>Range Slider</SubHeading>
          <Range
            id="volume"
            name="volume"
            label="Volume"
            min={0}
            max={100}
            step={1}
            value={50}
          />
        </div>

        {/* Toggle */}
        <div className="space-y-2">
          <SubHeading>Toggle</SubHeading>
          <Toggle
            id="notifications"
            name="notifications"
            label="Enable Notifications"
          />
        </div>

        {/* Code Example */}
        <CodeBlock language="language-javascript">
          {`import {
  Input,
  TextArea,
  Select,
  Checkbox,
  Radio,
  Range,
  Toggle,
} from "@components/ui/Form";

export default function ExampleForm() {
  return (
    <form className="space-y-6">
      {/* Input */}
      <Input
        id="name"
        name="name"
        label="Name"
        placeholder="John Doe"
        description="Please enter your full name."
      />

      {/* TextArea */}
      <TextArea
        id="message"
        name="message"
        label="Message"
        description="Type your message here."
      />

      {/* Select */}
      <Select id="country" name="country" label="Country">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </Select>

      {/* Checkbox */}
      <Checkbox name="agree" label="I agree to the terms and conditions." />

      {/* Radio */}
      <Radio name="gender" label="Male" value="male" />
      <Radio name="gender" label="Female" value="female" />

      {/* Range */}
      <Range id="volume" name="volume" label="Volume" min={0} max={100} value={50} />

      {/* Toggle */}
      <Toggle name="notifications" label="Enable Notifications" />
    </form>
  );
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
