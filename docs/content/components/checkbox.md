---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/checkbox
  doc: https://bits-ui.com/docs/components/checkbox
  api: https://bits-ui.com/docs/components/checkbox#api-reference
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

<ComponentPreview name="checkbox-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="checkbox" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `bits-ui`:

</Step>

<PMInstall command="bits-ui -D" />

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
</script>
```

```svelte
<Checkbox />
```

## Checked State

Use `defaultChecked` for uncontrolled checkboxes, or `checked` and
`onCheckedChange` to control the state.

```svelte showLineNumbers
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  let checked = $state(false);
</script>

<Checkbox bind:checked />
```

## Invalid State

Set `aria-invalid` on the checkbox and `data-invalid` on the field wrapper to show the invalid styles.

<ComponentPreview name="checkbox-invalid" />

## Examples

### Basic

Pair the checkbox with `Field` and `Field.Label` for proper layout and labeling.

<ComponentPreview name="checkbox-basic">

<div></div>

</ComponentPreview>

### Description

Use `Field.Content` and `Field.Description` for helper text.

<ComponentPreview name="checkbox-description">

<div></div>

</ComponentPreview>

### Disabled

Use the `disabled` prop to prevent interaction and add the `data-disabled` attribute to the `<Field.Field>` component for disabled styles.

<ComponentPreview name="checkbox-disabled">

<div></div>

</ComponentPreview>

### Group

Use multiple fields to create a checkbox list.

<ComponentPreview name="checkbox-group">

<div></div>

</ComponentPreview>

### Table

<ComponentPreview name="checkbox-table" previewClassName="p-4 md:p-8">

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="checkbox-form-multiple">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/checkbox#api-reference) documentation for more information.
