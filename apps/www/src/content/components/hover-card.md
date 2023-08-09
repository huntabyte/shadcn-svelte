---
title: Hover Card
description: For sighted users to preview content available behind a link.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/hover-card
radix: https://www.radix-svelte.com/docs/hovercard
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/hovercard
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="hover-card-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add hover-card
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
  import * as HoverCard from "$components/ui/hover-card";
</script>

<HoverCard.Root>
  <HoverCard.Trigger>Hover</HoverCard.Trigger>
  <HoverCard.Content>
    SvelteKit - Web development, streamlined
  </HoverCard.Content>
</HoverCard.Root>
```
