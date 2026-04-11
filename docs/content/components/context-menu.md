---
title: Context Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by right click.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/context-menu
  doc: https://bits-ui.com/docs/components/context-menu
  api: https://bits-ui.com/docs/components/context-menu#api-reference
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

<ComponentPreview name="context-menu-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="context-menu" />
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
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
</script>
```

```svelte showLineNumbers
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

## Composition

Use the following composition to build a `ContextMenu`:

```text
ContextMenu.Root
├── ContextMenu.Trigger
└── ContextMenu.Content
    ├── ContextMenu.Label
    ├── ContextMenu.Item
    ├── ContextMenu.CheckboxItem
    ├── ContextMenu.RadioGroup
    │   └── ContextMenu.RadioItem
    ├── ContextMenu.Sub
    │   ├── ContextMenu.SubTrigger
    │   └── ContextMenu.SubContent
    └── ContextMenu.Separator
```

## Examples

### Basic

A simple context menu with a few actions.

<ComponentPreview name="context-menu-basic">

<div></div>

</ComponentPreview>

### Submenu

Use `ContextMenuSub` to nest secondary actions.

<ComponentPreview name="context-menu-submenu">

<div></div>

</ComponentPreview>

### Shortcuts

Add `ContextMenuShortcut` to show keyboard hints.

<ComponentPreview name="context-menu-shortcuts">

<div></div>

</ComponentPreview>

### Groups

Group related actions and separate them with dividers.

<ComponentPreview name="context-menu-groups">

<div></div>

</ComponentPreview>

### Icons

Combine icons with labels for quick scanning.

<ComponentPreview name="context-menu-icons">

<div></div>

</ComponentPreview>

### Checkboxes

Use `ContextMenuCheckboxItem` for toggles.

<ComponentPreview name="context-menu-checkboxes">

<div></div>

</ComponentPreview>

### Radio Group

Use `ContextMenuRadioItem` for exclusive choices.

<ComponentPreview name="context-menu-radio-group">

<div></div>

</ComponentPreview>

### Destructive

Use `variant="destructive"` to style the menu item as destructive.

<ComponentPreview name="context-menu-destructive">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/context-menu#api-reference) documentation for more information.
