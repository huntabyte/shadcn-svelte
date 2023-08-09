---
title: Popover
description: Displays rich content in a portal, triggered by a button.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/popover
radix: https://www.radix-svelte.com/docs/label
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/label
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="popover-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add popover
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
  import * as Popover from "$components/ui/popover";
</script>

<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>Place content for the popover here.</Popover.Content>
</Popover.Root>
```
