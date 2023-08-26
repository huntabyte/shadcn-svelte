---
title: Aspect Ratio
description: Displays content within a desired ratio.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/aspect-ratio
bits: https://www.bits-ui.com/docs/components/aspect-ratio
---

<script>
  import { ComponentPreview, ManualInstall } from '$components/docs';
</script>

<ComponentPreview name="aspect-ratio-demo">

<div/>

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add aspect-ratio
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
  import { AspectRatio } from "lib/components/ui/aspect-ratio";
</script>

<div class="w-[450px]">
  <AspectRatio ratio={16 / 9} class="bg-muted">
    <img src="..." alt="..." class="rounded-md object-cover" />
  </AspectRatio>
</div>
```
