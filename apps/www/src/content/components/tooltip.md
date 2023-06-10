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
  import { TooltipDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/tooltip/TooltipDemo.svelte">

<div slot="example">
<TooltipDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add tooltip
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
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
  } from "$components/ui/tooltip";
</script>
```

```svelte
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```
