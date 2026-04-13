---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/radio-group
  doc: https://bits-ui.com/docs/components/radio-group
  api: https://bits-ui.com/docs/components/radio-group#api-reference
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

<ComponentPreview name="radio-group-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="radio-group" />
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

```svelte showLineNumbers
<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
</script>
```

```svelte showLineNumbers
<RadioGroup.Root value="option-one">
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="option-one" id="option-one" />
    <Label for="option-one">Option One</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="option-two" id="option-two" />
    <Label for="option-two">Option Two</Label>
  </div>
</RadioGroup.Root>
```

## Composition

Use the following composition to build a `RadioGroup`:

```text
RadioGroup.Root
└── RadioGroup.Item
```

## Examples

### Description

Radio group items with a description using the `Field` component.

<ComponentPreview name="radio-group-description">

<div></div>

</ComponentPreview>

### Choice Card

Use `Field.Label` to wrap the entire `Field` for a clickable card-style selection.

<ComponentPreview name="radio-group-choice-card">

<div></div>

</ComponentPreview>

### Fieldset

Use `FieldSet` and `FieldLegend` to group radio items with a label and description.

<ComponentPreview name="radio-group-fieldset">

<div></div>

</ComponentPreview>

### Disabled

Use the `disabled` prop on `RadioGroup.Item` to disable individual items.

<ComponentPreview name="radio-group-disabled">

<div></div>

</ComponentPreview>

### Invalid

Use `aria-invalid` on `RadioGroup.Item` and `data-invalid` on `Field` to show validation errors.

<ComponentPreview name="radio-group-invalid">

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="radio-group-form">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/radio-group#api-reference) documentation for more information.
