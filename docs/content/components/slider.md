---
title: Slider
description: An input where the user selects a value from within a given range.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/slider
  doc: https://bits-ui.com/docs/components/slider
  api: https://bits-ui.com/docs/components/slider#api-reference
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

<ComponentPreview name="slider-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="slider" />
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
  import { Slider } from "$lib/components/ui/slider/index.js";
  let value = $state(33);
</script>
```

```svelte
<Slider type="single" bind:value max={100} step={1} />
```

## Examples

### Range

Use an array with two values for a range slider.

<ComponentPreview name="slider-range">

<div></div>

</ComponentPreview>

### Multiple Thumbs

Use an array with multiple values for multiple thumbs.

<ComponentPreview name="slider-multiple">

<div></div>

</ComponentPreview>

### Vertical

Use `orientation="vertical"` for a vertical slider.

<ComponentPreview name="slider-vertical">

<div></div>

</ComponentPreview>

### Controlled

<ComponentPreview name="slider-controlled">

<div></div>

</ComponentPreview>

### Disabled

Use the `disabled` prop to disable the slider.

<ComponentPreview name="slider-disabled">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI Slider](https://bits-ui.com/docs/components/slider#api-reference) documentation.
