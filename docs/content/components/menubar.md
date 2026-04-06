---
title: Menubar
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/menubar
  doc: https://bits-ui.com/docs/components/menubar
  api: https://bits-ui.com/docs/components/menubar#api-reference
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

<ComponentPreview name="menubar-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="menubar" />
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
  import * as Menubar from "$lib/components/ui/menubar/index.js";
</script>
```

```svelte showLineNumbers
<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        New Tab
        <Menubar.Shortcut>⌘T</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>New Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Share</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Print</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
```

## Examples

### Checkbox

Use `Menubar.CheckboxItem` for toggleable options.

<ComponentPreview name="menubar-checkbox">

<div></div>

</ComponentPreview>

### Radio

Use `Menubar.RadioGroup` and `Menubar.RadioItem` for single-select options.

<ComponentPreview name="menubar-radio">

<div></div>

</ComponentPreview>

### Submenu

Use `Menubar.Sub`, `Menubar.SubTrigger`, and `Menubar.SubContent` for nested menus.

<ComponentPreview name="menubar-submenu">

<div></div>

</ComponentPreview>

### With Icons

<ComponentPreview name="menubar-icons">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/menubar#api-reference) documentation for more information.
