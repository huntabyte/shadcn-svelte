---
title: Direction
description: A provider component that sets the text direction for your application.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/docs/src/lib/registry/ui/direction
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

The `DirectionProvider` component is used to set the text direction (`ltr` or `rtl`) for your application. This is essential for supporting right-to-left languages like Arabic, Hebrew, and Persian.

Here's a preview of the component in RTL mode. Use the language selector to switch the language. To see more examples, look for the RTL section on components pages.

<ComponentPreview name="card-rtl" hideCode class="mb-8">
	<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="direction" />
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

```svelte showLineNumbers
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
</script>
```

```svelte showLineNumbers
<DirectionProvider direction="rtl">
  <!-- Your app content -->
</DirectionProvider>
```

## useDirection

The `useDirection` hook is used to get the current direction of the application.

```svelte showLineNumbers
<script lang="ts">
  import { useDirection } from "$lib/components/ui/direction/index.js";

  const direction = useDirection();
</script>

<div>Current direction: {direction}</div>
```
