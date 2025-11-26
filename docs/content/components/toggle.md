---
title: Toggle
description: A two-state button that can be either on or off.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/toggle
  doc: https://bits-ui.com/docs/components/toggle
  api: https://bits-ui.com/docs/components/toggle#api-reference
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

<ComponentPreview name="toggle-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="toggle" />
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

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>
```

```svelte
<Toggle>Toggle</Toggle>
```

## Examples

### Default

<ComponentPreview name="toggle-demo">

<div></div>

</ComponentPreview>

### Outline

<ComponentPreview name="toggle-outline">

<div></div>

</ComponentPreview>

### With Text

<ComponentPreview name="toggle-with-text">

<div></div>

</ComponentPreview>

### Small

<ComponentPreview name="toggle-sm">

<div></div>

</ComponentPreview>

### Large

<ComponentPreview name="toggle-lg">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="toggle-disabled">

<div></div>

</ComponentPreview>
