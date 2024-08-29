---
title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/scroll-area
bits: https://bits-ui.com/docs/components/scroll-area
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="scroll-area-demo">

<div />

</ComponentPreview>

## Installation

<PMAddComp name="scroll-area" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
</script>

<ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
  Jokester began sneaking into the castle in the middle of the night and
  leaving jokes all over the place: under the king's pillow, in his soup, even
  in the royal toilet. The king was furious, but he couldn't seem to stop
  Jokester. And then, one day, the people of the kingdom discovered that the
  jokes left by Jokester were so funny that they couldn't help but laugh. And
  once they started laughing, they couldn't stop.
</ScrollArea>
```

## Examples

### Horizontal Scrolling

Set the `orientation` prop to `"horizontal"` to enable horizontal scrolling.

<ComponentPreview name="scroll-area-horizontal">

<div />

</ComponentPreview>

### Horizontal and Vertical Scrolling

Set the `orientation` prop to `"both"` to enable both horizontal and vertical scrolling.

<ComponentPreview name="scroll-area-both">

<div />

</ComponentPreview>
