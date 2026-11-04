---
title: Record table
description: A list of records for a CRM. Sortable columns, a text filter, row selection, a sticky header, click to open, and an inline Add new row.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="record-table-demo">

<div></div>

</ComponentPreview>

## Source

Ported from the shadcn-svelte Data Table: TanStack Table v9 (`@tanstack/svelte-table`) with the `Table` component, as in the [Data Table](/docs/components/data-table) page. This wraps it so an app describes its columns and does not write TanStack code. Sorting and selection come from TanStack, the text filter and the layout are ours. The look follows Twenty: 32 px rows, a sticky header, an "Add new" row at the bottom.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="record-table" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install the TanStack Table package:

<PMInstall command="@tanstack/svelte-table" />

</Step>

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { goto } from "$app/navigation";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import {
    RecordTable,
    type RecordTableColumn,
  } from "$lib/components/ui/record-table/index.js";

  type Company = { id: string; name: string; stage: string };

  let { companies }: { companies: Company[] } = $props();

  const columns: RecordTableColumn<Company>[] = [
    { id: "name", header: "Name", accessor: (c) => c.name },
    { id: "stage", header: "Stage", accessor: (c) => c.stage, cell: stage },
  ];
  let filter = $state("");
  let selectedIds = $state<string[]>([]);

  async function createCompany(name: string) {
    // your app: save it, then add it to `companies`
  }
</script>

{#snippet stage({ value }: { value: unknown })}
  <Badge tone="blue">{value}</Badge>
{/snippet}

<RecordTable
  data={companies}
  {columns}
  getRowId={(c) => c.id}
  {filter}
  selectable
  bind:selectedIds
  onRowClick={(c) => goto(`/companies/${c.id}`)}
  onCreate={createCompany}
/>
```

## Props

| Prop                             | What it does                                                                                                                                                                                                                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data`, `columns`, `getRowId`    | The rows, the column definitions and a stable id per row.                                                                                                                                                                                                                                                                                  |
| `filter`                         | Keeps the rows where a filterable column contains this text (case insensitive). Bind it to your own `Input`.                                                                                                                                                                                                                               |
| `selectable`, `selectedIds`      | Adds a checkbox column. `selectedIds` is bindable, so you can read it and clear it. Only visible rows stay selected: a row hidden by the filter, or removed from `data`, is dropped from `selectedIds`, so a bulk action never touches rows the user cannot see.                                                                           |
| `onRowClick`                     | Called when a row is clicked, or Enter is pressed on a focused row. Clicks on a checkbox, link, button or input in the row do not count.                                                                                                                                                                                                   |
| `onCreate`, `onCreateError`      | Shows the "Add new" row. Click it, type, press Enter to call `onCreate(text)` (it may be async); the input stays open and focused for the next one, Escape closes it. If `onCreate` throws, the text is kept, the input is marked invalid and `onCreateError(error, text)` is called. `createPlaceholder` and `createLabel` set the texts. |
| `loading`                        | Shows skeleton rows while there is no data yet.                                                                                                                                                                                                                                                                                            |
| `empty`                          | A snippet for the empty state. Default: "No records." or "No results." when a filter is active.                                                                                                                                                                                                                                            |
| `maxHeight`, `stickyFirstColumn` | A CSS height that makes the body scroll under the sticky header, and keeping the first column in view when scrolling sideways.                                                                                                                                                                                                             |

Replace an item to change it (`companies[0] = { ...companies[0], value: 5 }`): sorting re-reads the rows when the array or an item is replaced, not when a field is edited in place. Numbers sort as numbers (decimals and negatives too), other values alphanumerically.

A column is `{ id, header, accessor?, cell?, sortable?, filterable?, align?, width?, class? }`. The accessor gives the value for sorting and filtering and the default cell text. `cell` is a snippet receiving `{ row, value }`, for a badge, a link or an avatar.

## Not in this version

Virtualised rows, column resize and reorder, inline cell editing, group headers and an aggregate footer are on the plan; this version is for lists of a few thousand rows.
