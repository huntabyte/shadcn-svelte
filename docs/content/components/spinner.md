---
title: Spinner
description: An indicator that can be used to show a loading state.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/spinner
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

<ComponentPreview name="spinner-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="spinner" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `@lucide/svelte`:

</Step>

<PMInstall command="@lucide/svelte -D" />

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
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>
```

```svelte
<Spinner />
```

## Customization

You can replace the default spinner icon with any other icon by editing the `Spinner` component.

<ComponentPreview name="spinner-custom-demo">

<div></div>

</ComponentPreview>

## Examples

### Size

Use the `size-*` utility class to change the size of the spinner.

<ComponentPreview name="spinner-size-demo">

<div></div>

</ComponentPreview>

### Button

Add a spinner to a button to indicate a loading state. Place the `<Spinner />` before the label with `data-icon="inline-start"` for a start position, or after the label with `data-icon="inline-end"` for an end position.

<ComponentPreview name="spinner-button-demo">

<div></div>

</ComponentPreview>

### Badge

Add a spinner to a badge to indicate a loading state. Place the `<Spinner />` before the label with `data-icon="inline-start"` for a start position, or after the label with `data-icon="inline-end"` for an end position.

<ComponentPreview name="spinner-badge-demo">

<div></div>

</ComponentPreview>

### Input Group

<ComponentPreview name="spinner-input-group-demo">

<div></div>

</ComponentPreview>

### Empty

<ComponentPreview name="spinner-empty">

<div></div>

</ComponentPreview>
