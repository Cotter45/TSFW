import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import { Menu, MenuItem, SubMenu } from "@components/ui/Menu";
import { Link } from "@components/ui/Link";

export default function MenuDocumentationPage() {
  return (
    <div class="fade_in flex flex-col gap-10 px-4 py-8 max-w-full">
      <section className="space-y-4">
        <Heading>Menu Component Documentation</Heading>

        <Text>
          The <code>Menu</code> component provides a versatile structure for
          navigation menus. It supports vertical, horizontal, and compact
          layouts, with optional active and disabled states for menu items.
        </Text>
      </section>

      <section>
        <SubHeading>Features</SubHeading>
        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
          <li>
            <Text>
              <strong>Layout Options</strong>: Supports vertical, horizontal,
              and compact menus.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Active and Disabled States</strong>: Easily mark menu
              items as active or disabled.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Submenus</strong>: Nested menus with expandable and
              collapsible functionality.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Route Awareness</strong>: Automatically expands submenus
              based on the active route.
            </Text>
          </li>
        </ul>
      </section>

      <section>
        <SubHeading>Props</SubHeading>
        <Text>Below are the available props for the menu components:</Text>

        <ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
          <li>
            <strong>Menu</strong>:
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>vertical</strong> (boolean): Default orientation for
                menus.
              </li>
              <li>
                <strong>horizontal</strong> (boolean): Enables horizontal menu
                layout.
              </li>
              <li>
                <strong>compact</strong> (boolean): Enables compact spacing
                between items.
              </li>
            </ul>
          </li>
          <li>
            <strong>MenuItem</strong>:
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>active</strong> (boolean): Marks the item as active.
              </li>
              <li>
                <strong>disabled</strong> (boolean): Disables the menu item.
              </li>
            </ul>
          </li>
          <li>
            <strong>SubMenu</strong>:
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>title</strong> (string): The title of the submenu.
              </li>
              <li>
                <strong>basePath</strong> (string): Expands submenu if route
                matches.
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <SubHeading>Examples</SubHeading>
        <Text>Here are practical examples of using the `Menu` components:</Text>

        <div className="space-y-8">
          {/* Vertical Menu */}
          <div className="space-y-2">
            <SubHeading>Vertical Menu</SubHeading>
            <Menu>
              <MenuItem>Dashboard</MenuItem>
              <MenuItem active>Profile</MenuItem>
              <MenuItem disabled>Settings</MenuItem>
            </Menu>
          </div>

          {/* Horizontal Menu */}
          <div className="space-y-2">
            <SubHeading>Horizontal Menu</SubHeading>
            <Menu horizontal>
              <MenuItem>Home</MenuItem>
              <MenuItem active>About</MenuItem>
              <MenuItem>Contact</MenuItem>
            </Menu>
          </div>

          {/* Submenu */}
          <div className="space-y-2">
            <SubHeading>Menu with Submenus using links</SubHeading>
            <Menu>
              <SubMenu title="Settings" basePath="/">
                <MenuItem>
                  <Link href="/">Account</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/">Security</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/">Privacy</Link>
                </MenuItem>
              </SubMenu>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </div>
        </div>

        <CodeBlock language="language-javascript">
          {`import { Menu, MenuItem, SubMenu } from "@components/ui/Menu";

export default function ExamplePage() {
  return (
    <div>
      // Vertical Menu
      <Menu>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem active>Profile</MenuItem>
        <MenuItem disabled>Settings</MenuItem>
      </Menu>

      // Horizontal Menu
      <Menu horizontal>
        <MenuItem>Home</MenuItem>
        <MenuItem active>About</MenuItem>
        <MenuItem>Contact</MenuItem>
      </Menu>

      // Menu with Submenus
      <Menu>
        <SubMenu title="Settings" basePath="/">
          <MenuItem>
            <Link href="/">Account</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/">Security</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/">Privacy</Link>
          </MenuItem>
        </SubMenu>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
