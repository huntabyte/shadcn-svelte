---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/checkbox
  doc: https://bits-ui.com/docs/components/checkbox
  api: https://bits-ui.com/docs/components/checkbox#api-reference
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

<ComponentPreview name="checkbox-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="checkbox" />
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
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
</script>
```

```svelte
<Checkbox />
```

## Examples

### Basic

<ComponentPreview name="checkbox-basic">

<div></div>

</ComponentPreview>

### With Text

<ComponentPreview name="checkbox-with-text">

<div></div>

</ComponentPreview>

### Description

<ComponentPreview name="checkbox-description">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="checkbox-disabled">

<div></div>

</ComponentPreview>

### Invalid

<ComponentPreview name="checkbox-invalid">

<div></div>

</ComponentPreview>

### Group

<ComponentPreview name="checkbox-group">

<div></div>

</ComponentPreview>

### Table

<ComponentPreview name="checkbox-table">

<div></div>

</ComponentPreview>

### Form (Multiple)

<ComponentPreview name="checkbox-form-multiple">

<div></div>

</ComponentPreview>

### Form (Single)

<ComponentPreview name="checkbox-form-single">

<div></div>

</ComponentPreview>

## API Reference

See the [Checkbox API Reference](https://bits-ui.com/docs/components/checkbox#api-reference) for a full list of props.
