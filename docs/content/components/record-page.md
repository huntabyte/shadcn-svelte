---
title: Record page
description: The parts of a record page for a CRM. A fields list with editing in place, and a layout with a header, a fields rail and a main area.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="record-page-demo">

<div></div>

</ComponentPreview>

## Source

Two small pieces, composed from parts the fork already has, in the layout of the Twenty record page.

- `RecordFields` is a list of label and value rows. Each value is a ghost `Button` that turns into the right control when clicked: `Input` (text, number, currency, date, email, URL), `Textarea`, `NativeSelect` with a `Badge` tone for display, or a `Switch`.
- `RecordLayout` is the frame: a header, a 20 rem fields rail and a main area for `Tabs`, a timeline or related records.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="record-fields" />
<PMAddComp name="record-layout" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy the `record-fields` and `record-layout` folders into your `ui` folder.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import {
    RecordFields,
    type RecordField,
  } from "$lib/components/ui/record-fields/index.js";
  import { RecordLayout } from "$lib/components/ui/record-layout/index.js";

  let { company } = $props();

  const companyFields: RecordField<typeof company>[] = [
    { id: "name", label: "Name", type: "text" },
    { id: "value", label: "Value", type: "currency" },
    {
      id: "stage",
      label: "Stage",
      type: "select",
      options: [{ value: "lead", label: "Lead", tone: "blue" }],
    },
  ];

  async function change(id: string, value: unknown) {
    await saveCompany(company.id, { [id]: value }); // throw to reject the edit
  }
</script>

<RecordLayout>
  {#snippet header()}<h1>{company.name}</h1>{/snippet}
  {#snippet fields()}
    <RecordFields record={company} fields={companyFields} onChange={change} />
  {/snippet}
  <!-- the main area: Tabs, a timeline, related records -->
</RecordLayout>
```

In `RecordLayout` the snippet that holds the fields is named `fields`, so name your own list of field definitions something else (`companyFields` above).

## RecordFields

| Prop                 | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `record`             | The object to show.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `fields`             | `{ id, label, type, options?, currency?, placeholder?, readonly?, get? }[]`. The value is `record[id]`, or `get(record)`.                                                                                                                                                                                                                                                                                                                    |
| `onChange`           | `(fieldId, value) => void \| Promise<void>`. Called with a string, a number, a boolean or `null` (an emptied field). Throw to reject the edit: the field stays open and marked invalid, and Escape puts the old value back. A boolean switch is controlled by the record, so a rejected change snaps it back. An email or URL field is checked with the browser's validation first, so `onChange` never gets text the browser calls invalid. |
| `readonly`, `locale` | `readonly` shows the values without editing (one field can be `readonly` on its own too; a locked value is plain text, not a button). `locale` is a BCP 47 tag for numbers, currency and dates; the default is the browser's.                                                                                                                                                                                                                |

Field types: `text`, `textarea`, `number`, `currency`, `date` (a `yyyy-mm-dd` string), `select`, `boolean`, `email`, `url`. Click a value to edit. Enter or leaving the field saves, Escape cancels. A textarea saves with Cmd or Ctrl plus Enter, and Enter adds a line. A boolean saves as soon as you flip it. If a save fails after you pressed Enter, focus returns to the field; if you tabbed or clicked away first, the field stays open and marked invalid and focus stays where you put it. Each value button is named "Edit Label:" followed by the value, so a screen reader reads both.

## RecordLayout

`header`, `fields` and the default content are three snippets. The layout fills its parent, so give the parent a height. The fields rail and the main area scroll on their own. Below the md breakpoint the rail stacks above the main area and is capped at 45% of the viewport height, so the main area is never pushed out of reach. `fieldsLabel` sets the accessible name of the rail (default "Fields"); give each layout on a page its own.
