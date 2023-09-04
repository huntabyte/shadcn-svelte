---
title: Data Table
description: Powerful table and datagrids built using Svelte Headless Table.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/example/data-table-demo.svelte
---

<script>
    import { ComponentPreview, ManualInstall, Callout, Steps } from '@/components/docs'
</script>

<ComponentPreview name="data-table-demo">

<div />

</ComponentPreview>

## Introduction

Data tables are difficult to componentize because of the wide variety of features they support, and the uniqueness of every data set.

So instead of trying to create a one-size-fits-all solution, we've created a guide to help you build your own data tables.

We'll start with the basic `<Table />` component, and work our way up to a fully-featured data table.

<Callout>

<strong>Tip:</strong> If you find yourself using the same table in multiple places, you can always extract it into a reusable component.

</Callout>

## Table of Contents

This guide will show you how to use [Svelte Headless Table](https://svelte-headless-table.bryanmylee.com/) and the `<Table />` component to build your own custom data table. We'll cover the following topics:

- Basic Table
- Row Actions
- Pagination
- Sorting
- Filtering
- Visibility
- Row Selection
- Reusable Components

## Installation

1. Add the `<Table />` component to your project:

```bash
npx shadcn-svelte@latest add table
```

2. Add `svelte-headless-table` as a dependency:

```bash
npm install -D svelte-headless-table
```

## Prerequisites

We're going to build a table to show recent payments. Here's what our data looks like:

```ts showLineNumbers
type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com"
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com"
  }
  // ...
];
```

## Project Structure

Start by creating a route where your data table will live (we'll call ours payments), along with the following files:

```txt
routes
└── payments
    ├── data-table.svelte
    ├── data-table-actions.svelte
    ├── data-table-checkbox.svelte
    └── +page.svelte
```

- `data-table.svelte` will contain the `<Table />` component all of our data table logic.
- `data-table-actions.svelte` will contain the actions menu for each row.
- `data-table-checkbox.svelte` will contain the checkbox for each row.
- `+page.svelte` is where we'll render and access `<DataTable />` component.

## Basic Table

Let's start by building a basic table.

<Steps>

### Get/Add Data

Before we can initialize a table, we need to get our data. You can retrieve your data from anywhere, but for this example we'll use a `payments` array.

```svelte showLineNumbers title="routes/payments/data-table.svelte"
<script lang="ts">
  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    // ...
  ];
</script>
```

### Initialize Table

Next, we'll initialize a new table using `svelte-headless-table`.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {2-3,22}
<script lang="ts">
  import { createTable } from "svelte-headless-table";
  import { readable } from "svelte/store";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    // ...
  ];

  const table = createTable(readable(data));
</script>
```

### Create Columns

Now that we have a table, we can define our columns.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {24-45}
<script lang="ts">
  import { createTable } from "svelte-headless-table";
  import { readable } from "svelte/store";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    // ...
  ];

  const table = createTable(readable(data));

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID"
    }),
    table.column({
      accessor: "status",
      header: "Status"
    }),
    table.column({
      accessor: "email",
      header: "Email"
    }),
    table.column({
      accessor: "amount",
      header: "Amount"
    }),
    table.column({
      accessor: ({ email }) => email,
      header: ""
    })
  ]);
</script>
```

The last column is where we'll render a menu of actions for each row.

### Create View Model & Render Table

Finally, we'll create a view model which we'll use to build our table.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {2,4,48-49,52-90}
<script lang="ts">
  import { createTable, Render, Subscribe } from "svelte-headless-table";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    // ...
  ];

  const table = createTable(readable(data));

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID"
    }),
    table.column({
      accessor: "status",
      header: "Status"
    }),
    table.column({
      accessor: "email",
      header: "Email"
    }),
    table.column({
      accessor: "amount",
      header: "Amount"
    }),
    table.column({
      accessor: ({ email }) => email,
      header: ""
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns);
</script>

<div class="rounded-md border">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
                  <Render of={cell.render()} />
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
```

### Render the table

Finally, we'll render our table in our `+page.svelte` file.

```svelte showLineNumbers title="routes/payments/+page.svelte"
<script lang="ts">
  import DataTable from "./data-table.svelte";
</script>

<div class="container mx-auto py-10">
  <DataTable />
</div>
```

</Steps>

## Cell Formatting

Now that we have a basic table, let's format the `amount` cell to display the dollar amount. We'll also align the cell to the right.

<Steps>

### Update columns definition

First, we'll update our columns definition for the `amount` column to return a formatted string.

```ts showLineNumbers title="routes/payments/data-table.svelte" {17-23}
const columns = table.createColumns([
  table.column({
    accessor: "id",
    header: "ID"
  }),
  table.column({
    accessor: "status",
    header: "Status"
  }),
  table.column({
    accessor: "email",
    header: "Email"
  }),
  table.column({
    accessor: "amount",
    header: "Amount",
    cell: ({ value }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(value);
      return formatted;
    }
  }),
  table.column({
    accessor: ({ email }) => email,
    header: ""
  })
]);
```

### Update styles

Now that we're returning a formatted string, let's now align the `amount` header and cell to the right. We'll also capitalize our `status` cell values.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {10-16,31-41}
<div class="rounded-md border">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
                  {#if cell.id === "amount"}
                    <div class="text-right">
                      <Render of={cell.render()} />
                    </div>
                  {:else}
                    <Render of={cell.render()} />
                  {/if}
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  {#if cell.id === "amount"}
                    <div class="text-right font-medium">
                      <Render of={cell.render()} />
                    </div>
                  {:else if cell.id === "status"}
                    <div class="capitalize">
                      <Render of={cell.render()} />
                    </div>
                  {:else}
                    <Render of={cell.render()} />
                  {/if}
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
```

You can use this approach to customize the styles of any cell in your table. In the following sections, we'll demonstrate how you can use a component to render a cell as well.

</Steps>

## Row Actions

Let's now add row actions to our table. We'll use a `<DropdownMenu />` and `<Button />` component for this.

<Steps>

### Create actions component

We'll start by creating a new component called `data-table-actions.svelte` which will contain our actions menu. It's going to receive an `id` prop, which we'll use to identify and perform specific actions on the row.

```svelte showLineNumbers title="routes/payments/data-table-actions.svelte"
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import { MoreHorizontal } from "lucide-svelte";

  export let id: string;
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative w-8 h-8 p-0"
    >
      <span class="sr-only">Open menu</span>
      <MoreHorizontal class="w-4 h-4" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item on:m-click={() => navigator.clipboard.writeText(id)}>
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

Now that we've defined our actions component, let's update our `actions` column definition to use it.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {6,10,58-60}
<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender
  } from "svelte-headless-table";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    //...
  ];

  const table = createTable(readable(data));

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID"
    }),
    table.column({
      accessor: "status",
      header: "Status"
    }),
    table.column({
      accessor: "email",
      header: "Email"
    }),
    table.column({
      accessor: "amount",
      header: "Amount",
      cell: ({ value }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value);
        return formatted;
      }
    }),
    table.column({
      accessor: ({ email }) => email,
      header: "",
      cell: (item) => {
        return createRender(DataTableActions, { id: item.id });
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns);
</script>
```

We're just passing the `id` to our actions component, but you could pass whatever information you need to perform actions on the row. In this example, we could use the `id` to make a DELETE request to our API to delete the payment.

</Steps>

## Pagination

Next, we'll add pagination to our table

<Steps>

### Enable the `addPagination` plugin

```svelte showLineNumbers title="routes/payments/data-table.svelte" {8,31-33,12,68,71}
<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender
  } from "svelte-headless-table";
  import { addPagination } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import { Button } from "$lib/components/ui/button";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    //...
  ];

  const table = createTable(readable(data), {
    page: addPagination()
  });

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID"
    }),
    table.column({
      accessor: "status",
      header: "Status"
    }),
    table.column({
      accessor: "email",
      header: "Email"
    }),
    table.column({
      accessor: "amount",
      header: "Amount",
      cell: ({ value }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value);
        return formatted;
      }
    }),
    table.column({
      accessor: ({ email }) => email,
      header: "",
      cell: (item) => {
        return createRender(DataTableActions, { id: item.id });
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);

  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>
```

### Add pagination controls

We can add pagination controls to our table using the `<Button />` component and the `hasNextPage`, `hasPreviousPage`, and `pageIndex` variables.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {1,7-20,21}
<div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <!-- .... -->
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-2 py-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>
```

See the [pagination docs](https://svelte-headless-table.bryanmylee.com/docs/plugins/add-pagination) for more information on how to customize the pagination behavior.

</Steps>

## Sorting

Let's make the email column sortable.

<Steps>

### Enable the `addSortBy` plugin

Let's enable the `addSortBy` plugin and import the icon we'll use to indicate the sort option for the column.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {8,13,34,41-45,50-54,70-74,82-86}
<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender
  } from "svelte-headless-table";
  import { addPagination, addSortBy } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUpDown } from "lucide-svelte";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    //...
  ];

  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy()
  });

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID",
      plugins: {
        sort: {
          disable: true
        }
      }
    }),
    table.column({
      accessor: "status",
      header: "Status",
      plugins: {
        sort: {
          disable: true
        }
      }
    }),
    table.column({
      accessor: "email",
      header: "Email"
    }),
    table.column({
      accessor: "amount",
      header: "Amount",
      cell: ({ value }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value);
        return formatted;
      },
      plugins: {
        sort: {
          disable: true
        }
      }
    }),
    table.column({
      accessor: ({ email }) => email,
      header: "",
      cell: (item) => {
        return createRender(DataTableActions, { id: item.id });
      },
      plugins: {
        sort: {
          disable: true
        }
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);

  const { hasNextPage, hasPreviewPage, pageIndex } = pluginStates.page;
</script>
```

### Make header cell sortable

We can now update the `email` header cell to add sorting controls.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {11,18-22}
<Table.Root {...$tableAttrs}>
  <Table.Header>
    {#each $headerRows as headerRow}
      <Subscribe rowAttrs={headerRow.attrs()}>
        <Table.Row>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe
              attrs={cell.attrs()}
              let:attrs
              props={cell.props()}
              let:props
            >
              <Table.Head {...attrs}>
                {#if cell.id === "amount"}
                  <div class="text-right">
                    <Render of={cell.render()} />
                  </div>
                {:else if cell.id === "email"}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()} />
                    <ArrowUpDown class={"ml-2 h-4 w-4"} />
                  </Button>
                {:else}
                  <Render of={cell.render()} />
                {/if}
              </Table.Head>
            </Subscribe>
          {/each}
        </Table.Row>
      </Subscribe>
    {/each}
  </Table.Header>
  <Table.Body {...$tableBodyAttrs}>
    <!-- ... -->
  </Table.Body>
</Table.Root>
```

See the [sort docs](https://svelte-headless-table.bryanmylee.com/docs/plugins/add-sort-by) for more information on how to customize the sort behavior.

</Steps>

## Filtering

Let's add a search input to filter emails in our table.

<Steps>

### Enable the `addTableFilter` plugin

We'll start by enabling the `addTableFilter` plugin and importing the `<Input />` component we'll use for the search input.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {11,18,40-43,54-56,66-68,89-91,112}
<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender
  } from "svelte-headless-table";
  import {
    addPagination,
    addSortBy,
    addTableFilter
  } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUpDown } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    // ...
  ];

  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase())
    })
  });

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID",
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: "status",
      header: "Status",
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: "email",
      header: "Email"
    }),
    table.column({
      accessor: "amount",
      header: "Amount",
      cell: ({ value }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value);
        return formatted;
      },
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: ({ email }) => email,
      header: "",
      cell: (item) => {
        return createRender(DataTableActions, { id: item.id });
      },
      plugins: {
        sort: {
          disable: true
        }
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);

  const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
</script>
```

We're excluding all columns except for `email` from the filter plugin, and we're using a case-insensitive filter function to match the email value.

### Add search input

Now that our table is configured to filter by email, let's add a search input on top of our table.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {2-9}
<div>
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter emails..."
      type="text"
      bind:value={$filterValue}
    />
  </div>
  <div class="rounded-md border">
    <Table.Root>
      <!-- ... -->
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <!-- ... -->
  </div>
</div>
```

Since `filterValue` is a store, we can bind it to the input value and it will automatically update as the user types.

See the [filter docs](https://svelte-headless-table.bryanmylee.com/docs/plugins/add-table-filter) for more information on how to customize the pagination behavior.

</Steps>

## Visibility

Let's add the ability to control which columns are visible in our table.

<Steps>

### Enable `addHiddenColumns` plugin

```svelte showLineNumbers title="routes/payments/data-table.svelte" {12,18,20,44,115,120,122-123,125-127,129}
<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender
  } from "svelte-headless-table";
  import {
    addPagination,
    addSortBy,
    addTableFilter,
    addHiddenColumns
  } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUpDown, ChevronDown } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };
  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    // ...
  ];

  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy({ disableMultiSort: true }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.includes(filterValue)
    }),
    hide: addHiddenColumns()
  });

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID",
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: "status",
      header: "Status",
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: "email",
      header: "Email"
    }),
    table.column({
      accessor: "amount",
      header: "Amount",
      cell: ({ value }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value);
        return formatted;
      },
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: ({ email }) => email,
      header: "",
      cell: (item) => {
        return createRender(DataTableActions, { id: item.id });
      }
      plugins: {
        sort: {
          disable: true
        },
      }
    })
  ]);

  const {
    headerRows,
    pageRows,
    tableAttrs,
    tableBodyAttrs,
    pluginStates,
    flatColumns
  } = table.createViewModel(columns);

  const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;

  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  const hidableCols = ["status", "email", "amount"];
</script>
```

### Add column visibility controls

We'll use the `<DropdownMenu />` we imported in the previous step to render a menu of columns that can be hidden.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {9-24}
<div>
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter emails..."
      type="text"
      bind:value={$filterValue}
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" class="ml-auto" builders={[builder]}>
          Columns <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#each flatColumns as col}
          {#if hidableCols.includes(col.id)}
            <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
              {col.header}
            </DropdownMenu.CheckboxItem>
          {/if}
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="rounded-md border">
    <Table.Root>
      <!-- ... -->
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <!-- .... -->
  </div>
</div>
```

</Steps>

## Row Selection

Next, we're going to add row selection to our table.

<Steps>

### Create checkbox component

We'll start by creating a new component called `data-table-checkbox.svelte` which will be used to render a checkbox for each row.

```svelte showLineNumbers title="routes/payments/data-table-checkbox.svelte"
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
  import type { Writable } from "svelte/store";

  export let checked: Writable<boolean>;
</script>

<Checkbox bind:checked={$checked} />
```

### Enable `addSelectedRows` plugin

Next, we'll enable the `addSelectedRows` plugin and import the `<Checkbox />` component we just created.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {13,22,48,54-67,119,125}
<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender
  } from "svelte-headless-table";
  import {
    addPagination,
    addSortBy,
    addTableFilter,
    addHiddenColumns,
    addSelectedRows
  } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import * as Table from "@/registry/new-york/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import { Button } from "@/registry/new-york/ui/button";
  import { ArrowUpDown, ChevronDown } from "lucide-svelte";
  import { Input } from "@/registry/new-york/ui/input";
  import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
  import DataTableCheckbox from "./data-table-checkbox.svelte";

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    }
    // ...
  ];

  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy({ disableMultiSort: true }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.includes(filterValue)
    }),
    hide: addHiddenColumns(),
    select: addSelectedRows()
  });

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;
        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected
        });
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);

        return createRender(DataTableCheckbox, {
          checked: isSelected
        });
      },
      plugins: {
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: "status",
      header: "Status",
      plugins: {
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: "email",
      header: "Email"
    }),
    table.column({
      accessor: "amount",
      header: "Amount",
      cell: ({ value }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value);
        return formatted;
      },
      plugins: {
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: ({ email }) => email,
      header: "",
      cell: (item) => {
        return createRender(DataTableActions, { id: item.id });
      }
    })
  ]);

  const {
    headerRows,
    pageRows,
    tableAttrs,
    tableBodyAttrs,
    pluginStates,
    flatColumns,
    rows
  } = table.createViewModel(columns);

  const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;
  const { selectedDataIds } = pluginStates.select;

  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  const hidableCols = ["status", "email", "amount"];
</script>
```

### Update styles & show selected rows

To accommodate the checkbox, we'll need to update our table styles. We'll also add a message to show how many rows are selected.

```svelte showLineNumbers title="routes/payments/data-table.svelte" {39,65,87-90}
<div>
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter emails..."
      type="text"
      bind:value={$filterValue}
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" class="ml-auto" builders={[builder]}>
          Columns <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#each flatColumns as col}
          {#if hidableCols.includes(col.id)}
            <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
              {col.header}
            </DropdownMenu.CheckboxItem>
          {/if}
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe
                  attrs={cell.attrs()}
                  let:attrs
                  props={cell.props()}
                  let:props
                >
                  <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                    {#if cell.id === "amount"}
                      <div class="text-right">
                        <Render of={cell.render()} />
                      </div>
                    {:else if cell.id === "email"}
                      <Button variant="ghost" on:click={props.sort.toggle}>
                        <Render of={cell.render()} />
                        <ArrowUpDown class={"ml-2 h-4 w-4"} />
                      </Button>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs} class="[&:has([role=checkbox])]:pl-3">
                    {#if cell.id === "amount"}
                      <div class="text-right font-medium">
                        <Render of={cell.render()} />
                      </div>
                    {:else if cell.id === "status"}
                      <div class="capitalize">
                        <Render of={cell.render()} />
                      </div>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <div class="flex-1 text-sm text-muted-foreground">
      {Object.keys($selectedDataIds).length} of{" "}
      {$rows.length} row(s) selected.
    </div>
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>
```

See the [selected row docs](https://svelte-headless-table.bryanmylee.com/docs/plugins/add-selected-rows) for more information on how to customize the pagination behavior.

</Steps>
