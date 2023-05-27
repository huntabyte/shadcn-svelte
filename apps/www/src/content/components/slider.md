---
title: Slider
description: An input where the user selects a value from within a given range.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/slider
radix: https://www.radix-svelte.com/docs/slider
---

<script>
  import { SliderDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/slider/SliderDemo.svelte">

<div slot="example" style="width: 100%; display: flex; justify-content: center;">
<SliderDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add slider
```

<ManualInstall>

1. Install `radix-svelte`:

```bash
npm install radix-svelte
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Slider } from "$components/ui/slider";
</script>
```

```svelte
<Slider value={33} max={100} step={1} />
```
