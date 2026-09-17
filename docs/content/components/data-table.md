---
title: Data Table
description: Powerful table and datagrids built using TanStack Table.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/blob/next/docs/src/lib/registry/examples/data-table-demo.svelte
  doc: https://tanstack.com/table/latest/docs/framework/svelte/quick-start
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import Callout from "$lib/components/callout.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="data-table-demo" align="start" previewClassName="h-auto items-start px-4 pb-16 md:px-8">

<div></div>

</ComponentPreview>

## Introduction

Data tables are difficult to componentize because of the wide variety of features they support, and the uniqueness of every data set.

So instead of trying to create a one-size-fits-all solution, we've created a guide to help you build your own data tables.

We'll start with the basic `<Table />` component, and work our way up to a fully-featured data table.

<Callout>

Tip: If you find yourself using the same table in multiple places, you can always extract it into a reusable component.

</Callout>

## Table of Contents

This guide will show you how to use [TanStack Table](https://tanstack.com/table) and the `<Table />` component to build your own custom data table. We'll cover the following topics:

- [Set up Table Features](#set-up-table-features)
- [Basic Table](#basic-table)
- [Row Actions](#row-actions)
- [Pagination](#pagination)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Visibility](#visibility)
- [Row Selection](#row-selection)
- [Reusable Components](#reusable-components)

## Installation

1. Add the `<Table />` component to your project:

<PMAddComp name="table" />

2. Add the `@tanstack/svelte-table` dependency. This guide uses **TanStack Table v9**:

<PMInstall command="@tanstack/svelte-table" />

## Prerequisites

We're going to build a table to show recent payments. Here's what our data looks like:

```ts showLineNumbers
type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];
```

## Project Structure

Start by creating a route where your data table will live (we'll call ours payments), along with the following files:

```txt
routes
└── payments
    ├── columns.ts
    ├── data-table-features.ts
    ├── data-table.svelte
    ├── data-table-actions.svelte
    ├── data-table-checkbox.svelte
    ├── data-table-email-button.svelte
    └── +page.svelte
```

- `columns.ts` will contain our column definitions.
- `data-table-features.ts` will contain the shared `features` object that tells TanStack Table which behavior to enable.
- `data-table.svelte` will contain the `<Table />` component and the complete `<DataTable />` component.
- `data-table-actions.svelte` will contain the actions menu for each row.
- `data-table-checkbox.svelte` will contain the checkbox for each row.
- `data-table-email-button.svelte` will contain the sortable email header button.
- `+page.svelte` is where we'll render and access `<DataTable />` component.

## Set up Table Features

TanStack Table v9 is feature-based: you opt into the behavior you want — sorting, filtering, pagination, and so on — by declaring it with `tableFeatures()`. Anything you don't register is tree-shaken out of your bundle. That includes the built-in filter and sort functions: register the ones your columns rely on under `filterFns` and `sortFns`. Our email filter uses `includesString`, and string columns sort with `alphanumeric` / `text`.

We'll define the `features` object once and share it between our column definitions and the `<DataTable />` component.

```ts showLineNumbers title="routes/payments/data-table-features.ts"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/svelte-table";

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

// Pass this as the first generic argument to `ColumnDef`, `Column`, `Table`,
// and `Row` so each type knows which feature APIs are available.
export type DataTableFeatures = typeof features;
```

<Callout class="mt-4">

**Note:** The core row model is always included, so you never register it yourself. Row models for optional features are created with `create*RowModel()` and registered on the features object — there are no more `get*RowModel` table options.

</Callout>

## Basic Table

Let's start by building a basic table.

<Steps>

### Column Definitions

First, we'll define our columns using a column helper typed with our features.

```ts showLineNumbers {1-2,14,16-26} title="routes/payments/columns.ts"
import { createColumnHelper } from "@tanstack/svelte-table";
import type { DataTableFeatures } from "./data-table-features.js";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

export const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
]);
```

<Callout class="mt-4">

**Note:** Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

</Callout>

### `<DataTable />` Component

Next, we'll create a `<DataTable />` component to render our table.

`createTable` must be called during component initialization (the top level of your `<script>`) so it can wire itself into Svelte's reactivity. From there the table manages its own state: reads like `table.getRowModel()` or `table.atoms.pagination.get()` are rune-reactive, so your markup updates automatically — no `$state` mirrors or change handlers required. We pass `data` through a getter so the table always reads the current value of the prop.

```svelte showLineNumbers title="routes/payments/data-table.svelte"
<script lang="ts" generics="TData extends RowData">
  import {
    type ColumnDef,
    type RowData,
    createTable,
    FlexRender,
  } from "@tanstack/svelte-table";
  import * as Table from "$lib/components/ui/table/index.js";
  import { features, type DataTableFeatures } from "./data-table-features.js";

  type DataTableProps<TData extends RowData> = {
    columns: ColumnDef<DataTableFeatures, TData>[];
    data: TData[];
  };

  let { data, columns }: DataTableProps<TData> = $props();

  const table = createTable({
    features,
    get data() {
      return data;
    },
    columns,
  });
</script>

<div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <Table.Row>
          {#each headerGroup.headers as header (header.id)}
            <Table.Head colspan={header.colSpan}>
              {#if !header.isPlaceholder}
                <FlexRender {header} />
              {/if}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body>
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row data-state={row.getIsSelected() && "selected"}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <Table.Cell>
              <FlexRender {cell} />
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={columns.length} class="h-24 text-center">
            No results.
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
```

`<FlexRender />` takes the `header` or `cell` instance you pass it and renders whatever the column definition provides — a plain string, a snippet, or a component.

<Callout>

**Tip**: If you find yourself using `<DataTable />` in multiple places, this is the component you could make reusable by extracting it to `components/ui/data-table.svelte`.

`<DataTable columns={columns} data={data} />`

</Callout>

<Callout class="mt-4">

**Controlled state:** because v9 owns table state internally, you won't write `$state` mirrors or change handlers for most of this guide. If something outside the table needs to own a state slice (syncing filters to the URL, server-driven pagination, etc.), controlled state still exists — we'll use `createTableState` to manage the row selection slice externally in the [Row Selection](#row-selection) section. See the [migration guide](https://tanstack.com/table/latest/docs/framework/svelte/guide/migrating) for details.

</Callout>

### Render the table

Finally, we'll render our table in our page component.

```ts showLineNumbers title="routes/payments/+page.server.ts"
export async function load() {
  // logic to fetch payments data here
  const payments = await getPayments();
  return {
    payments,
  };
}
```

```svelte showLineNumbers {8} title="routes/payments/+page.svelte"
<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";

  let { data } = $props();
</script>

<DataTable data={data.payments} {columns} />
```

</Steps>

## Cell Formatting

Let's format the amount cell to display the dollar amount. We'll also align the cell to the right.

<Steps>

### Update columns definition

Update the `header` and `cell` definitions for amount as follows:

```ts showLineNumbers title="routes/payments/columns.ts"
import { createColumnHelper, renderSnippet } from "@tanstack/svelte-table";
import { createRawSnippet } from "svelte";
import type { DataTableFeatures } from "./data-table-features.js";

const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

export const columns = columnHelper.columns([
  columnHelper.accessor("amount", {
    header: () => {
      const amountHeaderSnippet = createRawSnippet(() => ({
        render: () => `<div class="text-end">Amount</div>`,
      }));
      return renderSnippet(amountHeaderSnippet);
    },
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      const amountCellSnippet = createRawSnippet<[{ amount: number }]>(
        (getAmount) => {
          const { amount } = getAmount();
          const formatted = formatter.format(amount);
          return {
            render: () =>
              `<div class="text-end font-medium">${formatted}</div>`,
          };
        }
      );

      return renderSnippet(amountCellSnippet, {
        amount: row.original.amount,
      });
    },
  }),
]);
```

We're using the `createRawSnippet` function to create a Svelte Snippet for rendering simple HTML elements that don't require full lifecycle and state capabilities like a component. We then use the `renderSnippet` helper function to render the snippet. Both `renderSnippet` and `renderComponent` are imported directly from `@tanstack/svelte-table`.

You can use the same approach to format other cells and headers.

</Steps>

## Row Actions

Let's add row actions to our table. We'll use the `<DropdownMenu />` and the `<Button />` components for this, so you have install them if not done already:

<PMAddComp name="button dropdown-menu" />

<Steps>

### Create actions component

We'll start by defining the actions menu in our `data-table-actions.svelte` component.

```svelte showLineNumbers title="routes/payments/data-table-actions.svelte"
<script lang="ts">
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        size="icon"
        class="relative size-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <EllipsisIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
        Copy payment ID
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>View customer</DropdownMenu.Item>
    <DropdownMenu.Item>View payment details</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Update columns definition

Now that we've defined the `<DataTableActions />` component, let's add an `actions` column to use it. Because the column doesn't read a data field, we define it with `columnHelper.display`.

```ts showLineNumbers title="routes/payments/columns.ts"
import { createColumnHelper, renderComponent } from "@tanstack/svelte-table";
import DataTableActions from "./data-table-actions.svelte";

export const columns = columnHelper.columns([
  // ...
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      // You can pass whatever you need from `row.original` to the component
      return renderComponent(DataTableActions, { id: row.original.id });
    },
  }),
]);
```

You can access the row data using `row.original` in the `cell` function. Use this to handle actions for your row eg. use the `id` to make a DELETE call to your API.

</Steps>

## Pagination

Next, we'll add pagination to our table.

<Steps>

### Pagination is already enabled

Because our features object registers `rowPaginationFeature` and `createPaginatedRowModel()`, the table automatically paginates rows into pages of 10 — there's nothing to add to `createTable`. See the [pagination docs](https://tanstack.com/table/latest/docs/framework/svelte/guide/pagination) for more information on customizing page size and implementing manual pagination.

### Adding pagination controls

We can add pagination controls to our table using the `<Button />` component and the `table.previousPage()`, `table.nextPage()` API methods.

```svelte showLineNumbers title="routes/payments/data-table.svelte"
<script lang="ts" generics="TData extends RowData">
  import { Button } from "$lib/components/ui/button/index.js";

  // ...the rest of the script stays the same
</script>

<div>
  <div class="rounded-md border">
    <Table.Root>
      <!--- ... table implementation -->
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-2 py-4">
    <Button
      variant="outline"
      size="sm"
      onclick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </Button>
    <Button
      variant="outline"
      size="sm"
      onclick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </Button>
  </div>
</div>
```

See [Reusable Components](#reusable-components) section for a more advanced pagination component.

### Change the page size

To change the page size, call `table.setPageSize()`. To read the current pagination state — say, for a page indicator — read `table.atoms.pagination.get()`. The read is rune-reactive: use it in your template or a `$derived` and it updates whenever the page changes.

```svelte
<script lang="ts">
  // Rune-reactive read — updates whenever the user changes pages.
  const pagination = $derived(table.atoms.pagination.get());
</script>

<Button variant="outline" size="sm" onclick={() => table.setPageSize(20)}>
  Show 20 rows
</Button>

<div class="text-muted-foreground text-sm">
  Page {pagination.pageIndex + 1} of {table.getPageCount()}
</div>
```

</Steps>

## Sorting

Let's make the email column sortable.

The `rowSortingFeature` and sorted row model are already registered in our features object — along with the `alphanumeric` and `text` sort functions that string columns resolve through the default `auto` setting — so there's nothing to change in `<DataTable />`. We just add the UI.

<Steps>

### Define `<DataTableEmailButton />` component

We'll start by creating a component to render a sortable email header button.

```svelte showLineNumbers title="routes/payments/data-table-email-button.svelte"
<script lang="ts">
  import type { ComponentProps } from "svelte";
  import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
  import { Button } from "$lib/components/ui/button/index.js";

  let { variant = "ghost", ...restProps }: ComponentProps<typeof Button> =
    $props();
</script>

<Button {variant} {...restProps}>
  Email
  <ArrowUpDownIcon class="ms-2 size-4" />
</Button>
```

### Make header cell sortable

We can now update the `email` header cell to add sorting controls.

```ts showLineNumbers title="routes/payments/columns.ts"
import { createColumnHelper, renderComponent } from "@tanstack/svelte-table";
import DataTableEmailButton from "./data-table-email-button.svelte";

export const columns = columnHelper.columns([
  // ...
  columnHelper.accessor("email", {
    header: ({ column }) =>
      renderComponent(DataTableEmailButton, {
        onclick: column.getToggleSortingHandler(),
      }),
  }),
]);
```

This will automatically sort the table (asc and desc) when the user toggles on the header cell. The table owns the sorting state — no wiring required.

</Steps>

## Filtering

Let's add a search input to filter emails in our table.

The `columnFilteringFeature`, filtered row model, and the `includesString` filter function are already registered in our features object, so the only work left is rendering an input.

<Steps>

### Add the search input

```svelte showLineNumbers title="routes/payments/data-table.svelte"
<script lang="ts" generics="TData extends RowData">
  import { Input } from "$lib/components/ui/input/index.js";

  // ...the rest of the script stays the same
</script>

<div>
  <div class="flex items-center py-4">
    <Input
      placeholder="Filter emails..."
      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
      onchange={(e) => {
        table.getColumn("email")?.setFilterValue(e.currentTarget.value);
      }}
      oninput={(e) => {
        table.getColumn("email")?.setFilterValue(e.currentTarget.value);
      }}
      class="max-w-sm"
    />
  </div>
  <div class="rounded-md border">
    <Table.Root><!-- ... --></Table.Root>
  </div>
</div>
```

Filtering is now enabled for the `email` column. You can add filters to other columns as well — just remember that string-based filter references only resolve functions you've registered, so if another column needs a different built-in filter, add it to `filterFns` in `data-table-features.ts` first. See the [filtering docs](https://tanstack.com/table/latest/docs/framework/svelte/guide/column-filtering) for more information on customizing filters.

</Steps>

## Visibility

Adding column visibility is fairly simple using the `@tanstack/svelte-table` visibility API. The `columnVisibilityFeature` is already registered in our features object, so we only need to add the dropdown.

<Steps>

### Add the column toggle dropdown

```svelte showLineNumbers title="routes/payments/data-table.svelte"
<script lang="ts" generics="TData extends RowData">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  // ...the rest of the script stays the same
</script>

<div>
  <div class="flex items-center py-4">
    <Input
      placeholder="Filter emails..."
      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
      onchange={(e) =>
        table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
      oninput={(e) =>
        table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
      class="max-w-sm"
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="outline" class="ms-auto">Columns</Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {#each table
          .getAllColumns()
          .filter((col) => col.getCanHide()) as column (column.id)}
          <DropdownMenu.CheckboxItem
            class="capitalize"
            bind:checked={
              () => column.getIsVisible(), (v) => column.toggleVisibility(!!v)
            }
          >
            {column.id}
          </DropdownMenu.CheckboxItem>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="rounded-md border">
    <Table.Root><!--...--></Table.Root>
  </div>
</div>
```

This adds a dropdown menu that you can use to toggle column visibility.

</Steps>

## Row Selection

Next, we're going to add row selection to our table. The `rowSelectionFeature` is already registered in our features object, so the table tracks selection for us — we just render the checkboxes.

<Steps>

### Define `<DataTableCheckbox />` component

We'll start by defining the checkbox component in our `data-table-checkbox.svelte` component.

```svelte showLineNumbers title="routes/payments/data-table-checkbox.svelte"
<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";

  let {
    checked = false,
    onCheckedChange = (v) => (checked = v),
    ...restProps
  }: ComponentProps<typeof Checkbox> = $props();
</script>

<Checkbox bind:checked={() => checked, onCheckedChange} {...restProps} />
```

### Update columns definition

Now that we have a new component, we can add a `select` column definition to render a checkbox.

```ts showLineNumbers title="routes/payments/columns.ts"
import { createColumnHelper, renderComponent } from "@tanstack/svelte-table";
import DataTableCheckbox from "./data-table-checkbox.svelte";

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) =>
      renderComponent(DataTableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate:
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected(),
        onCheckedChange: (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      renderComponent(DataTableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  }),
  // ...
]);
```

This adds a checkbox to each row and a checkbox in the header to select all rows.

<Callout class="mt-4">

**Note:** In v9, `table.getIsSomePageRowsSelected()` returns `true` whenever at least one page row is selected — even when all are. That's why we gate the header checkbox's `indeterminate` state with `!table.getIsAllPageRowsSelected()`, so it clears at full selection.

</Callout>

### Manage the selection state externally

The table tracks selection internally by default. To show how a slice can live outside the table — handy when your page needs to read or drive the selection — we'll own just this one slice with `createTableState` and leave everything else internal. Add `createTableState` and `type RowSelectionState` to the `@tanstack/svelte-table` import, then update `createTable`:

```ts showLineNumbers title="routes/payments/data-table.svelte" {1-2,10-15}
// Keep row selection outside the table so the rest of the app can read or update it.
const [rowSelection, setRowSelection] = createTableState<RowSelectionState>(
  {}
);

const table = createTable({
  features,
  get data() {
    return data;
  },
  columns,
  state: {
    get rowSelection() {
      return rowSelection();
    },
  },
  onRowSelectionChange: setRowSelection,
});
```

`rowSelection()` can now be read anywhere in the component — it's a rune-backed getter — and `setRowSelection` accepts a value or updater function.

### Show selected rows

You can show the number of selected rows using the `table.getFilteredSelectedRowModel()` API.

```svelte
<div class="text-muted-foreground flex-1 text-sm">
  {table.getFilteredSelectedRowModel().rows.length} of
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>
```

</Steps>

## Reusable Components

Check out the [Tasks](/examples/tasks) example to learn about creating reusable components for your data tables.
