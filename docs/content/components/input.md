---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/input
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

<ComponentPreview name="input-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="input" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
</script>
```

```svelte
<Input />
```

## Examples

### Default

<ComponentPreview name="input-demo">

<div></div>

</ComponentPreview>

### File

<ComponentPreview name="input-file">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="input-disabled">

<div></div>

</ComponentPreview>

### With Label

<ComponentPreview name="input-with-label">

<div></div>

</ComponentPreview>

### With Button

<ComponentPreview name="input-with-button">

<div></div>

</ComponentPreview>
