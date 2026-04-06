---
title: Command
description: Fast, composable, unstyled command menu for Svelte.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/command
  doc: https://bits-ui.com/docs/components/command
  api: https://bits-ui.com/docs/components/command#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import Callout from "$lib/components/callout.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="command-demo" align="start" class="[&_.preview>div]:max-w-[450px]">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="command" />
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
  import * as Command from "$lib/components/ui/command/index.js";
</script>
```

```svelte showLineNumbers
<Command.Root>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>Calendar</Command.Item>
      <Command.Item>Search Emoji</Command.Item>
      <Command.Item>Calculator</Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>Profile</Command.Item>
      <Command.Item>Billing</Command.Item>
      <Command.Item>Settings</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>
```

## Examples

### Basic

A simple command menu in a dialog.

<ComponentPreview name="command-basic">

<div></div>

</ComponentPreview>

### Shortcuts

<ComponentPreview name="command-shortcuts">

<div></div>

</ComponentPreview>

### Groups

A command menu with groups, icons and separators.

<ComponentPreview name="command-groups">

<div></div>

</ComponentPreview>

### Scrollable

Scrollable command menu with multiple items.

<ComponentPreview name="command-scrollable">

<div></div>

</ComponentPreview>

### Dialog

<ComponentPreview name="command-dialog">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/command#api-reference) documentation for more information.
