---
title: Data Table
description: Powerful table and datagrids built using Svelte Headless Table.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/examples/data-table-demo.svelte
---

<script>
    import { ComponentPreview, ManualInstall, Callout } from '@/components/docs'
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
