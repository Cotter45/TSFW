import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Badge } from "@components/ui/Badge";
import { CodeBlock } from "@components/CodeBlock";
import { Avatar, AvatarGroup } from "@components/ui/Avatar";

export default function AvatarDocumentationPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <Heading>Avatar Documentation</Heading>

        <Text>
          The `Avatar` component provides a customizable UI element for
          displaying profile pictures, placeholders, or presence indicators.
          Additionally, the `AvatarGroup` component allows arranging multiple
          avatars in a visually appealing way.
        </Text>
      </section>

      <section>
        <SubHeading>Features</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <Text>
              <strong>Customizable Sizes</strong>: Predefined size classes like
              `w-8`, `w-12`, `w-16`, and more.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Flexible Shapes</strong>: Options for rounded, circular,
              squircle, and other masks.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Presence Indicators</strong>: Built-in online and offline
              status styles.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Group Support</strong>: Use <Badge>AvatarGroup</Badge> for
              arranging multiple avatars with adjustable spacing.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Custom Rings</strong>: Add decorative rings with custom
              colors and offsets.
            </Text>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SubHeading>Props</SubHeading>
        <Text>
          The following are the props available for the `Avatar` component:
        </Text>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <strong>size</strong>: Avatar size (e.g., `w-8`, `w-16`).
          </li>
          <li>
            <strong>shape</strong>: Avatar shape (e.g., `rounded-full`,
            `mask-squircle`).
          </li>
          <li>
            <strong>presence</strong>: Adds online or offline indicators.
          </li>
          <li>
            <strong>placeholder</strong>: Shows a placeholder style if `true`.
          </li>
          <li>
            <strong>ring</strong>: Enables a decorative ring.
          </li>
          <li>
            <strong>ringColor</strong>: Sets the ring color.
          </li>
          <li>
            <strong>ringOffsetColor</strong>: Sets the offset ring color.
          </li>
          <li>
            <strong>ringOffsetSize</strong>: Adjusts the offset size.
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <SubHeading>Examples</SubHeading>
        <Text>
          The following examples showcase different configurations for the
          `Avatar` and `AvatarGroup` components:
        </Text>

        <div className="space-y-8">
          {/* Single Avatar */}
          <div class="space-y-2">
            <SubHeading>Single Avatar</SubHeading>
            <Avatar size="w-16" shape="rounded-full">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
              />
            </Avatar>
          </div>

          {/* Placeholder Avatar */}
          <div className="space-y-2">
            <SubHeading>Placeholder Avatar</SubHeading>
            <Avatar size="w-12" placeholder>
              <span>AB</span>
            </Avatar>
          </div>

          {/* Avatar with Presence */}
          <div class="space-y-2">
            <SubHeading>Avatar with Presence</SubHeading>
            <Avatar size="w-20" presence="online">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Online User"
              />
            </Avatar>
          </div>

          {/* Avatar Group */}
          <div class="space-y-2">
            <SubHeading>Avatar Group</SubHeading>
            <AvatarGroup spaceX="-space-x-4">
              <Avatar size="w-12">
                <img
                  src="https://randomuser.me/api/portraits/men/10.jpg"
                  alt="User 1"
                />
              </Avatar>
              <Avatar size="w-12">
                <img
                  src="https://randomuser.me/api/portraits/women/23.jpg"
                  alt="User 2"
                />
              </Avatar>
              <Avatar size="w-12" placeholder>
                <span>+3</span>
              </Avatar>
            </AvatarGroup>
          </div>
        </div>

        <CodeBlock language="language-javascript">
          {`import { Avatar, AvatarGroup } from "@components/ui/Avatar";

export default function AvatarExamples() {
  return (
    <div className="space-y-8">
      {/* Single Avatar */}
      <Avatar size="w-16" shape="rounded-full" ring ringColor="ring-success">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
      </Avatar>

      {/* Placeholder Avatar */}
      <Avatar size="w-12" placeholder>
        <span>AB</span>
      </Avatar>

      {/* Avatar with Presence */}
      <Avatar size="w-20" presence="online">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Online User" />
      </Avatar>

      {/* Avatar Group */}
      <AvatarGroup spaceX="-space-x-4">
        <Avatar size="w-12" shape="mask-squircle">
          <img src="https://randomuser.me/api/portraits/men/10.jpg" alt="User 1" />
        </Avatar>
        <Avatar size="w-12" shape="mask-hexagon">
          <img src="https://randomuser.me/api/portraits/women/23.jpg" alt="User 2" />
        </Avatar>
        <Avatar size="w-12" placeholder>
          <span>+3</span>
        </Avatar>
      </AvatarGroup>
    </div>
  );
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
