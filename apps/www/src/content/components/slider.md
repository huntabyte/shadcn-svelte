---
title: Slider
description: An input where the user selects a value from within a given range.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/slider
radix: https://www.radix-svelte.com/docs/slider
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/slider
---

<script>
  import { ComponentExample, ManualInstall } from '$lib/components/docs';
  import { SliderDemo } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/slider/SliderDemo.svelte">

<div slot="example" style="width: 100%; display: flex; justify-content: center;">
<SliderDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add slider
```

<ManualInstall>

1. Install `@huntabyte/primitives`:

```bash
npm install @huntabyte/primitives
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Slider } from "$components/ui/slider";
</script>

<Slider value={33} max={100} step={1} />
```
