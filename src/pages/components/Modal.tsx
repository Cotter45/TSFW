import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import {
  Modal,
  ModalBox,
  ModalAction,
  ModalTrigger,
  closeModal,
} from "@components/ui/Modal";
import { Button } from "@components/ui/Button";

export default function ModalDocumentationPage() {
  return (
    <div class="fade_in flex flex-col gap-10 px-4 py-8 max-w-full">
      <section className="space-y-4">
        <Heading>Modal Component Documentation</Heading>
        <Text>
          The <code>Modal</code> component provides an accessible, customizable
          dialog window for displaying content, actions, and user interactions.
          Features include customizable positioning, trigger buttons, and
          backdrop support.
        </Text>
      </section>

      <section>
        <SubHeading>Features</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
          <li>
            <Text>
              <strong>Custom Positioning</strong>: Supports positioning the
              modal at the top, bottom, or center.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Backdrop Click Support</strong>: Allows closing the modal
              by clicking outside the dialog.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Trigger Buttons</strong>: Easily open the modal using a
              trigger button component.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Custom Actions</strong>: Add action buttons to the modal
              for user interactions.
            </Text>
          </li>
        </ul>
      </section>

      <section>
        <SubHeading>Props</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
          <li>
            <strong>Modal</strong>:
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>position</strong> (string): Position the modal (`top`,
                `bottom`, or `middle`). Defaults to `middle`.
              </li>
              <li>
                <strong>open</strong> (boolean): Controls whether the modal is
                open by default.
              </li>
            </ul>
          </li>
          <li>
            <strong>ModalBox</strong>:
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>id</strong> (string): A unique identifier for the modal
                element.
              </li>
            </ul>
          </li>
          <li>
            <strong>ModalAction</strong>: Container for modal action buttons.
          </li>
          <li>
            <strong>ModalBackdrop</strong>:
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>onClose</strong> (function): Callback function to handle
                modal close events.
              </li>
            </ul>
          </li>
          <li>
            <strong>ModalTrigger</strong>:
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>id</strong> (string): ID of the modal to open.
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <SubHeading>Examples</SubHeading>
        <Text>Here are some examples of using the `Modal` components:</Text>

        <div className="space-y-8">
          {/* Basic Modal */}
          <div className="space-y-2">
            <SubHeading>Basic Modal</SubHeading>
            <ModalTrigger id="basic-modal">Open Basic Modal</ModalTrigger>
            <Modal id="basic-modal">
              <ModalBox id="basic-modal">
                <h3 className="font-bold text-lg">Basic Modal</h3>
                <p className="py-4">This is a simple modal example.</p>
                <ModalAction>
                  <Button
                    class="btn-primary"
                    onClick={() => closeModal("basic-modal")}
                  >
                    Close
                  </Button>
                </ModalAction>
              </ModalBox>
            </Modal>
          </div>
        </div>

        <CodeBlock language="language-javascript">
          {`import { Modal, ModalBox, ModalTrigger, ModalAction, closeModal } from "@components/ui/Modal";
import { Button } from "@components/ui/Button";

export default function ModalExample() {
  return (
    <div>
      {/* Trigger Button */}
      <ModalTrigger id="example-modal">Open Modal</ModalTrigger>

      {/* Modal */}
      <Modal id="example-modal">
        <ModalBox id="example-modal">
          <h3 className="font-bold text-lg">Example Modal</h3>
          <p className="py-4">This is a sample modal example.</p>
          <ModalAction>
            <Button onClick={() => closeModal("example-modal")}>Close</Button>
          </ModalAction>
        </ModalBox>
      </Modal>
    </div>
  );
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
