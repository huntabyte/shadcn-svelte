---
title: Slider
description: An input where the user selects a value from within a given range.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/slider
  doc: https://next.bits-ui.com/docs/components/slider
  api: https://next.bits-ui.com/docs/components/slider#api-reference
---

<script>
  import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
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
<Step>Copy and paste the component source files linked at the top of this page into your project.</Step>
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
