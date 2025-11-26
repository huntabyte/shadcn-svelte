---
title: Kbd
description: Used to display textual user input from keyboard.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/kbd
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

<ComponentPreview name="kbd-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="kbd" />
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
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>
```

```svelte
<Kbd.Root>B</Kbd.Root>
```

## Examples

### Group

Use the `Kbd.Group` component to group keyboard keys together.

<ComponentPreview name="kbd-group-demo">

<div></div>

</ComponentPreview>

### Button

Use the `Kbd.Root` component inside a `Button` component to display a keyboard key inside a button.

<ComponentPreview name="kbd-button-demo">

<div></div>

</ComponentPreview>

### Tooltip

You can use the `Kbd.Root` component inside a `Tooltip` component to display a tooltip with a keyboard key.

<ComponentPreview name="kbd-tooltip-demo">

<div></div>

</ComponentPreview>

### Input Group

You can use the `Kbd.Root` component inside a `InputGroup.Addon` component to display a keyboard key inside an input group.

<ComponentPreview name="kbd-input-group-demo">

<div></div>

</ComponentPreview>
