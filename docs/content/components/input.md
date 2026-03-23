---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/input
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="input-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="input" />
{/snippet}
{#snippet manual()}
<Steps>

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
  import { Input } from "$lib/components/ui/input/index.js";
</script>
```

```svelte
<Input />
```

## Examples

### Basic

<ComponentPreview name="input-basic">

<div></div>

</ComponentPreview>

### Field

Use `Field`, `Field.Label`, and `Field.Description` to create an input with a label and description.

<ComponentPreview name="input-field">

<div></div>

</ComponentPreview>

### Field Group

Use `Field.Group` to show multiple `Field` blocks and to build forms.

<ComponentPreview name="input-fieldgroup">

<div></div>

</ComponentPreview>

### Disabled

Use the `disabled` prop to disable the input. Add the `data-disabled` attribute to the `Field` component to style the disabled state.

<ComponentPreview name="input-disabled">

<div></div>

</ComponentPreview>

### Invalid

Use the `aria-invalid` prop to mark the input as invalid. Add the `data-invalid` attribute to the `Field` component to style the invalid state.

<ComponentPreview name="input-invalid">

<div></div>

</ComponentPreview>

### File

Use the `type="file"` prop to create a file input.

<ComponentPreview name="input-file">

<div></div>

</ComponentPreview>

### Inline

Use `Field` with `orientation="horizontal"` to create an inline input. Pair with `Button` to create a search input with a button.

<ComponentPreview name="input-inline">

<div></div>

</ComponentPreview>

### Grid

Use a grid layout to place multiple inputs side by side.

<ComponentPreview name="input-grid">

<div></div>

</ComponentPreview>

### Required

Use the `required` attribute to indicate required inputs.

<ComponentPreview name="input-required">

<div></div>

</ComponentPreview>

### Badge

Use `Badge` in the label to highlight a recommended field.

<ComponentPreview name="input-badge">

<div></div>

</ComponentPreview>

### Input Group

To add icons, text, or buttons inside an input, use the `InputGroup` component.

<ComponentPreview name="input-input-group">

<div></div>

</ComponentPreview>

### Button Group

To add buttons to an input, use the `ButtonGroup` component.

<ComponentPreview name="input-button-group">

<div></div>

</ComponentPreview>

### Form

A full form example with multiple inputs, a select, and a button.

<ComponentPreview name="input-form">

<div></div>

</ComponentPreview>

### With Label

<ComponentPreview name="input-with-label">

<div></div>

</ComponentPreview>

### With Text

<ComponentPreview name="input-with-text">

<div></div>

</ComponentPreview>

### With Button

<ComponentPreview name="input-with-button">

<div></div>

</ComponentPreview>
