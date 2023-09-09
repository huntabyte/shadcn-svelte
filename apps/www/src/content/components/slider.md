---
title: Slider
description: An input where the user selects a value from within a given range.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/slider
bits: https://www.bits-ui.com/docs/components/slider
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="slider-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add slider
```

<ManualInstall>

1. Install `bits-ui`:

```bash
npm install bits-ui
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";
</script>

<Slider value={[33]} max={100} step={1} />
```
