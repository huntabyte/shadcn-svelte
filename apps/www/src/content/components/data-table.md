---
title: Data Table
description: Powerful table and datagrids built using Svelte Headless Table.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/examples/data-table-demo.svelte
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
npm shadcn-svelte@latest add table
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

```svelte showLineNumbers title="routes/payments/data-table.svelte" {2-3,21}
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
      accessor: ({ id }) => id,
      header: ""
    })
  ]);
</script>
```

The last column is where we'll render a menu of actions for each row. Since our dataset doesn't have an `actions` property, we'll use a function to access the `id` property as the accessor. The header we'll leave as an empty string for now.

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
      accessor: ({ id }) => id,
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
              <Subscribe
                attrs={cell.attrs()}
                let:attrs
                props={cell.props()}
                let:props
              >
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
