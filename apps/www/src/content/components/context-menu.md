---
title: Context Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by right click.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/context-menu
radix: https://www.radix-svelte.com/docs/radiogroup
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/radiogroup
---

<script>
    import { ComponentPreview, ManualInstall } from '$lib/components/docs'
</script>

<ComponentPreview name="context-menu-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add context-menu
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
  import * as ContextMenu from "$components/ui/context-menu";
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
