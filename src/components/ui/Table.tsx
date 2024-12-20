import { createState, type TSFWState } from "@core/state";
import { clsx } from "@core/clsx";
import { getElements } from "@core/utils";
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  DropdownTrigger,
} from "./Dropdown";

interface TableRow {
  id: number;
  [key: string]: any;
}

interface TableState {
  visibleColumns: string[];
  query: string;
  data: TableRow[];
}

const createTableState = (
  id: string,
  initialColumns: string[],
  initialData: TableRow[]
) =>
  createState<TableState>(`table-${id}`, {
    visibleColumns: initialColumns,
    query: "",
    data: initialData,
  });

let tableState: TSFWState<TableState> | null = null;

interface TableProps {
  id: string;
  columns: string[];
  rows: TableRow[];
  bleed?: boolean;
  dense?: boolean;
  grid?: boolean;
  striped?: boolean;
  class?: string;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  toggleableColumns?: boolean;
}

export function Table({
  id,
  columns,
  rows,
  bleed = false,
  dense = false,
  grid = false,
  striped = false,
  class: className,
  searchable = false,
  onSearch,
  toggleableColumns = false,
}: TableProps) {
  tableState = createTableState(id, columns, rows);

  tableState.subscribe((state, oldState) => {
    const rows = getElements(`#${id} .table-row`);

    for (const row of Array.from(rows)) {
      const cells = row.querySelectorAll("td");
      for (const [index, cell] of Array.from(cells).entries()) {
        if (state.visibleColumns.includes(columns[index])) {
          (cell as HTMLElement).style.display = "";
        } else {
          (cell as HTMLElement).style.display = "none";
        }
      }
    }

    const headers = getElements(`#${id} th`);

    headers.forEach((header, index) => {
      if (state.visibleColumns.includes(columns[index])) {
        (header as HTMLElement).style.display = "";
      } else {
        (header as HTMLElement).style.display = "none";
      }
    });

    if (state.query !== oldState.query) {
      const filteredRows = Array.from(rows).filter((row) => {
        return row.textContent
          ?.toLowerCase()
          .includes(state.query.toLowerCase());
      });

      for (const row of Array.from(rows)) {
        if (filteredRows.includes(row)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    }
  }, `table-${id}-listener`);

  const handleSearch = (query: string) => {
    tableState!.setState({ query });

    if (onSearch) {
      onSearch(query);
    }
  };

  const filteredRows = rows.filter((row) => {
    const { query } = tableState!.getState();
    return JSON.stringify(row).toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div class={clsx("space-y-4", className)}>
      <div class="flex items-center justify-between gap-4">
        {searchable ? (
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search Table"
            class="input input-bordered flex-1"
            onInput={(e: any) =>
              handleSearch((e.target as HTMLInputElement).value)
            }
          />
        ) : null}
        {toggleableColumns ? (
          <TableColumnToggles
            id={id}
            tableState={tableState}
            columns={columns}
          />
        ) : null}
      </div>

      <table
        id={id}
        class={clsx("table w-full border-collapse", bleed && "-mx-[--gutter]")}
        aria-label="Data Table"
      >
        <thead class="bg-base-200 dark:bg-base-300 text-left">
          <tr>
            {columns.map((col) => (
              <th
                class={clsx(
                  "p-4 text-sm font-medium",
                  grid && "border border-zinc-500 dark:border-zinc-700",
                  dense ? "py-2" : "py-4"
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr
              class={clsx(
                "table-row hover:bg-base-300 dark:hover:bg-base-100 transition",
                striped && "even:bg-base-100 dark:even:bg-base-300"
              )}
            >
              {columns.map((col) => (
                <td
                  class={clsx(
                    "p-4 text-sm text-base-content",
                    dense ? "py-2" : "py-4",
                    grid &&
                      "border-l border-r border-b border-zinc-500 dark:border-zinc-700"
                  )}
                >
                  {row[col.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableColumnToggles({
  id,
  tableState,
  columns,
}: {
  id: string;
  tableState: ReturnType<typeof createTableState>;
  columns: string[];
}) {
  const toggleColumn = (column: string) => {
    const { visibleColumns } = tableState.getState();
    const updatedColumns = visibleColumns.includes(column)
      ? visibleColumns.filter((col) => col !== column)
      : [...visibleColumns, column];
    tableState.setState({ visibleColumns: updatedColumns });
  };

  return (
    <Dropdown class="relative" align="left">
      <DropdownTrigger color="outline">Columns</DropdownTrigger>
      <DropdownList class="max-h-64 overflow-auto">
        {columns.map((col) => (
          <DropdownItem class="w-full gap-2 px-2">
            <input
              type="checkbox"
              checked={tableState.getState().visibleColumns.includes(col)}
              onChange={() => toggleColumn(col)}
              class="checkbox flex-none"
              id={`${id}-toggle-${col}`}
            />
            <label
              htmlFor={`${id}-toggle-${col}`}
              class="min-w-full w-full text-left cursor-pointer"
            >
              {col}
            </label>
          </DropdownItem>
        ))}
      </DropdownList>
    </Dropdown>
  );
}
