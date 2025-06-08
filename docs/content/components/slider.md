---
title: Slider
description: An input where the user selects a value from within a given range.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/slider
  doc: https://bits-ui.com/docs/components/slider
  api: https://bits-ui.com/docs/components/slider#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
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

Copy and paste the component source files linked at the top of this page into your project.

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

<Slider type="single" bind:value max={100} step={1} />
```

## Examples

### Multiple Thumbs

```svelte
<script lang="ts">
  import { Slider } from "$lib/components/ui/slider/index.js";
  let value = $state([25, 75]);
</script>

<Slider type="multiple" bind:value max={100} step={1} />
```

<ComponentPreview name="slider-multiple">

<div></div>

</ComponentPreview>

<ComponentPreview name="slider-vertical">

<div></div>

</ComponentPreview>
