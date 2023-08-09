---
title: Dropdown Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/dropdown-menu
radix: https://www.radix-svelte.com/docs/radiogroup
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/radiogroup
---

<script>
    import { ComponentPreview, ManualInstall } from '$lib/components/docs'
</script>

<ComponentPreview name="dropdown-menu-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add dropdown-menu
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
  import * as DropdownMenu from "$components/ui/dropdown-menu";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Item>Subscription</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```
