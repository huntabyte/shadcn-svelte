---
title: Dropdown Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/dropdown-menu
  doc: https://bits-ui.com/docs/components/dropdown-menu
  api: https://bits-ui.com/docs/components/dropdown-menu#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="dropdown-menu-demo" description="A dropdown menu with icons, shortcuts and sub menu items.">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="dropdown-menu" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `bits-ui`:

</Step>

<PMInstall command="bits-ui -D" />

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>
```

```svelte showLineNumbers
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

## Composition

Use the following composition to build a `DropdownMenu`:

```text
DropdownMenu.Root
├── DropdownMenu.Trigger
└── DropdownMenu.Content
    ├── DropdownMenu.Label
    ├── DropdownMenu.Item
    ├── DropdownMenu.Separator
    ├── DropdownMenu.Group
    │   ├── DropdownMenu.GroupHeading
    │   └── DropdownMenu.Item
    ├── DropdownMenu.CheckboxItem
    ├── DropdownMenu.RadioGroup
    │   └── DropdownMenu.RadioItem
    └── DropdownMenu.Sub
        ├── DropdownMenu.SubTrigger
        └── DropdownMenu.SubContent
            └── DropdownMenu.Item
```

## Examples

### Basic

A basic dropdown menu with labels and separators.

<ComponentPreview name="dropdown-menu-basic">

<div></div>

</ComponentPreview>

### Submenu

Use `DropdownMenu.Sub` to nest secondary actions.

<ComponentPreview name="dropdown-menu-submenu">

<div></div>

</ComponentPreview>

### Shortcuts

Add `DropdownMenu.Shortcut` to show keyboard hints.

<ComponentPreview name="dropdown-menu-shortcuts">

<div></div>

</ComponentPreview>

### Icons

Combine icons with labels for quick scanning.

<ComponentPreview name="dropdown-menu-icons">

<div></div>

</ComponentPreview>

### Checkboxes

Use `DropdownMenu.CheckboxItem` for toggles.

<ComponentPreview name="dropdown-menu-checkboxes">

<div></div>

</ComponentPreview>

### Checkboxes with Icons

Add icons to checkbox items.

<ComponentPreview name="dropdown-menu-checkboxes-icons">

<div></div>

</ComponentPreview>

### Radio Group

Use `DropdownMenu.RadioGroup` for exclusive choices.

<ComponentPreview name="dropdown-menu-radio-group">

<div></div>

</ComponentPreview>

### Radio Group with Icons

Show radio options with icons.

<ComponentPreview name="dropdown-menu-radio-icons">

<div></div>

</ComponentPreview>

### Destructive

Use `variant="destructive"` for irreversible actions.

<ComponentPreview name="dropdown-menu-destructive">

<div></div>

</ComponentPreview>

### Avatar

An account switcher dropdown triggered by an avatar.

<ComponentPreview name="dropdown-menu-avatar">

<div></div>

</ComponentPreview>

### Complex

A richer example combining groups, icons, and submenus.

<ComponentPreview name="dropdown-menu-complex">

<div></div>

</ComponentPreview>

### Dialog

This example shows how to open a dialog from a dropdown menu.

```svelte showLineNumbers
<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
    Actions
  </DropdownMenu.Trigger>
</DropdownMenu.Root>
```

<ComponentPreview name="dropdown-menu-dialog" >

<div></div>

</ComponentPreview>

## Changelog

### 2024-10-30 Classes for DropdownMenu.SubTrigger

- Added `gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0` to the `<DropdownMenu.SubTrigger>` to automatically style icon inside the dropdown menu sub trigger.
- Removed `size-4` from the icon inside the `<DropdownMenu.SubTrigger>` since it is now handled by the parent `<DropdownMenu.SubTrigger>`.

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/dropdown-menu#api-reference) documentation for more information.
