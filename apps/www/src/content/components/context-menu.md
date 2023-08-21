---
title: Context Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by right click.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/context-menu
bits: https://www.bits-ui.com/docs/components/context-menu
---

<script>
    import { ComponentPreview, ManualInstall } from '$lib/components/docs'
</script>

<ComponentPreview name="context-menu-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add context-menu
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
  import * as ContextMenu from "$lib/components/ui/context-menu";
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Profile</ContextMenu.Item>
    <ContextMenu.Item>Billing</ContextMenu.Item>
    <ContextMenu.Item>Team</ContextMenu.Item>
    <ContextMenu.Item>Subscription</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
```
