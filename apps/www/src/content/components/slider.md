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
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="slider-demo">

<div />

</ComponentPreview>

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
