---
title: Table
description: A responsive table component.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/table
---

<script>
  import { ComponentPreview, PMAddComp, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="table-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="table" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Copy and paste the component source files linked at the top of this page into your project.</Step>
</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
</script>
```

```svelte
<Table.Root>
  <Table.Caption>A list of your recent invoices.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Invoice</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Method</Table.Head>
      <Table.Head class="text-right">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell class="font-medium">INV001</Table.Cell>
      <Table.Cell>Paid</Table.Cell>
      <Table.Cell>Credit Card</Table.Cell>
      <Table.Cell class="text-right">$250.00</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```
