---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/toggle-group
  doc: https://bits-ui.com/docs/components/toggle-group
  api: https://bits-ui.com/docs/components/toggle-group#api-reference
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

<ComponentPreview name="toggle-group-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="toggle-group" />
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

```svelte
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>
```

```svelte
<ToggleGroup.Root type="single">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
```

## Composition

Use the following composition to build a `ToggleGroup`:

```text
ToggleGroup.Root
├── ToggleGroup.Item
└── ToggleGroup.Item
```

## Examples

### Outline

Use `variant="outline"` for an outline style.

<ComponentPreview name="toggle-group-outline">

<div></div>

</ComponentPreview>

### Sizes

Use the `size` prop to change the size of the toggle group.

<ComponentPreview name="toggle-group-sizes">

<div></div>

</ComponentPreview>

### Spacing

Use `spacing` to add spacing between toggle group items.

<ComponentPreview name="toggle-group-spacing">

<div></div>

</ComponentPreview>

### Vertical

Use `orientation="vertical"` for vertical toggle groups.

<ComponentPreview name="toggle-group-vertical">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="toggle-group-disabled">

<div></div>

</ComponentPreview>

### Custom

A custom toggle group example.

<ComponentPreview name="toggle-group-font-weight-selector" previewClassName="*:data-[slot=field]:max-w-xs">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI Toggle Group](https://bits-ui.com/docs/components/toggle-group#api-reference) documentation.
