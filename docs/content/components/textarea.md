---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/textarea
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

<ComponentPreview name="textarea-demo" previewClassName="*:max-w-xs">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="textarea" />
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
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>
```

```svelte
<Textarea />
```

## Examples

### Field

Use `Field`, `Field.Label`, and `Field.Description` to create a textarea with a label and description.

<ComponentPreview name="textarea-field" previewClassName="*:max-w-xs">

<div></div>

</ComponentPreview>

### Disabled

Use the `disabled` prop to disable the textarea. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

<ComponentPreview name="textarea-disabled" previewClassName="*:max-w-xs">

<div></div>

</ComponentPreview>

### Invalid

Use the `aria-invalid` attribute to mark the textarea as invalid.

<ComponentPreview name="textarea-invalid" previewClassName="*:max-w-xs">

<div></div>

</ComponentPreview>

### Button

Pair with `Button` to create a textarea with a submit button.

<ComponentPreview name="textarea-button" previewClassName="*:max-w-xs">

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="textarea-form">

<div></div>

</ComponentPreview>
