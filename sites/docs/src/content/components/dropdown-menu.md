---
title: Dropdown Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/dropdown-menu
  doc: https://next.bits-ui.com/docs/components/dropdown-menu
  api: https://next.bits-ui.com/docs/components/dropdown-menu#api-reference
---

<script>
    import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs'
</script>

<ComponentPreview name="dropdown-menu-demo">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="dropdown-menu" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui -D" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Item>Subscription</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

## Examples

### Checkboxes

<ComponentPreview name="dropdown-menu-checkboxes">

<div></div>

</ComponentPreview>

### Radio Group

<ComponentPreview name="dropdown-menu-radio-group">

<div></div>

</ComponentPreview>
