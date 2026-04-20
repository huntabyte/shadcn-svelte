---
title: Resizable
description: Accessible resizable panel groups and layouts with keyboard support.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/resizable
  doc: https://www.paneforge.com
  api: https://www.paneforge.com/docs/components/pane-group
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="resizable-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="resizable" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `paneforge`:

</Step>

<PMInstall command="paneforge@next -D" />

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
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>
```

```svelte showLineNumbers
<Resizable.PaneGroup direction="horizontal">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

## Composition

Use the following composition to build a `Resizable` layout:

```text
Resizable.PaneGroup
├── Resizable.Pane
├── Resizable.Handle
└── Resizable.Pane
```

## Examples

### Vertical

Use `direction="vertical"` for vertical resizing.

<ComponentPreview name="resizable-vertical">

<div></div>

</ComponentPreview>

### Handle

Use the `withHandle` prop on `Resizable.Handle` to show a visible handle.

<ComponentPreview name="resizable-handle">

<div></div>

</ComponentPreview>

## API Reference

See the [PaneForge documentation](https://paneforge.com) documentation for more information.
