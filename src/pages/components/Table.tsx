import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import { Table } from "@components/ui/Table";
import { logger } from "@core/logger";

const SAMPLE_COLUMNS = ["ID", "Name", "Role", "Status"];
const SAMPLE_ROWS = [
	{ id: 1, name: "Alice", role: "Admin", status: "Active" },
	{ id: 2, name: "Bob", role: "User", status: "Inactive" },
	{ id: 3, name: "Charlie", role: "Moderator", status: "Active" },
];

export default function TableDocumentationPage() {
	const handleSearch = (query: string) => {
		logger.info("Search Query:", query);
	};

	return (
		<div class="fade_in flex flex-col gap-10 px-4 py-8 max-w-full">
			<section className="space-y-4">
				<Heading>Table Component</Heading>
				<Text>
					The `Table` component is a dynamic and customizable solution for
					displaying tabular data. It features column visibility toggles, a
					search bar, and customizable styles.
				</Text>
			</section>

			<section>
				<SubHeading>Features</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<Text>
							<strong>Search Functionality</strong>: Quickly find rows using the
							search bar.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Column Toggles</strong>: Show or hide table columns using
							an interactive dropdown.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Customizable Styles</strong>: Modify appearance using
							props like `striped`, `dense`, and `grid`.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Accessibility</strong>: Includes ARIA attributes for
							enhanced usability.
						</Text>
					</li>
				</ul>
			</section>

			<section>
				<SubHeading>Props</SubHeading>
				<Text>The `Table` component accepts the following props:</Text>
				<ul className="list-disc ml-6 space-y-2">
					<li>
						<Text>
							<strong>`id`</strong>: Unique identifier for the table.
						</Text>
					</li>
					<li>
						<Text>
							<strong>`columns`</strong>: Array of column headers.
						</Text>
					</li>
					<li>
						<Text>
							<strong>`rows`</strong>: Array of data rows.
						</Text>
					</li>
					<li>
						<Text>
							<strong>`searchable`</strong>: Enables the search bar.
						</Text>
					</li>
					<li>
						<Text>
							<strong>`onSearch`</strong>: Callback invoked when the search
							query changes.
						</Text>
					</li>
					<li>
						<Text>
							<strong>`toggleableColumns`</strong>: Enables column visibility
							toggles.
						</Text>
					</li>
				</ul>
			</section>

			<section className="space-y-8">
				<SubHeading>Example</SubHeading>
				<Text>
					Here's an example of the `Table` component with search and toggleable
					column functionality:
				</Text>

				<Table
					id="example-table"
					columns={SAMPLE_COLUMNS}
					rows={SAMPLE_ROWS}
					searchable
					onSearch={handleSearch}
					toggleableColumns
					striped
				/>

				<CodeBlock language="language-javascript">
					{`import { Table } from "@components/ui/Table";

const SAMPLE_COLUMNS = ["ID", "Name", "Role", "Status"];
const SAMPLE_ROWS = [
  { id: 1, name: "Alice", role: "Admin", status: "Active" },
  { id: 2, name: "Bob", role: "User", status: "Inactive" },
  { id: 3, name: "Charlie", role: "Moderator", status: "Active" },
];

export default function ExampleTablePage() {
  const handleSearch = (query: string) => {
    console.log("Search Query:", query);
  };

  return (
    <Table
      id="example-table"
      columns={SAMPLE_COLUMNS}
      rows={SAMPLE_ROWS}
      searchable
      onSearch={handleSearch}
      toggleableColumns
      striped
      grid
      dense
    />
  );
}`}
				</CodeBlock>
			</section>

			<section>
				<SubHeading>How It Works</SubHeading>
				<Text>
					The `Table` component uses reactive state management to control the
					visibility of columns and dynamically filter rows based on the search
					query. The state updates the DOM in real-time for seamless
					interaction.
				</Text>
				<ul className="list-disc ml-6 space-y-2">
					<li>
						<Text>
							<strong>Column Visibility</strong>: Use `TableColumnToggles` to
							dynamically toggle column visibility.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Search</strong>: Filter rows using the search bar.
						</Text>
					</li>
				</ul>
			</section>
		</div>
	);
}
