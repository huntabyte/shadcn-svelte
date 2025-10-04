---
title: Field
description: A versatile component for building form layouts with labels, descriptions, and error handling.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/field
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";
</script>

The `Field` component is a flexible container for building form layouts. It provides consistent spacing, orientation options, and built-in support for labels, descriptions, and error messages. Use it with the `FieldGroup` component to create organized form sections.

This component is perfect for creating consistent form layouts without having to repeat the same structure and styling patterns.

<ComponentPreview name="field-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="field" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the component source files linked at the top of this page into your project.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
</script>

<Field.Root>
  <Field.Label>Field Label</Field.Label>
  <Field.Content>
    <Field.Title>Field Title</Field.Title>
    <Field.Description>Field description text</Field.Description>
  </Field.Content>
</Field.Root>
```

## Field vs Item

Use Field when you need to display form inputs with labels, descriptions, and error handling.

If you only need to display content such as a title, description, and actions without form functionality, use `Item`.

## Examples

### Orientation

The `Field` component supports different orientations for different layouts.

<ComponentPreview name="field-orientation-demo">

<div></div>

</ComponentPreview>

### With Error

<ComponentPreview name="field-error-demo">

<div></div>

</ComponentPreview>

### Field Group

Use `FieldGroup` to organize multiple fields with consistent spacing.

<ComponentPreview name="field-group-demo">

<div></div>

</ComponentPreview>

### Field Set

Use `FieldSet` and `FieldLegend` for grouping related form fields.

<ComponentPreview name="field-set-demo">

<div></div>

</ComponentPreview>

### With Separator

<ComponentPreview name="field-separator-demo">

<div></div>

</ComponentPreview>
