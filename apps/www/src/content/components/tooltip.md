---
title: Tooltip
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/tooltip
radix: https://www.radix-svelte.com/docs/tooltip
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/tooltip
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="tooltip-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add tooltip
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
  import * as Tooltip from "$components/ui/tooltip";
</script>

<Tooltip.Root>
  <Tooltip.Trigger>Hover</Tooltip.Trigger>
  <Tooltip.Content>
    <p>Add to library</p>
  </Tooltip.Content>
</Tooltip.Root>
```
