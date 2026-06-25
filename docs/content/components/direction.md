---
title: Direction
description: A provider component that sets the text direction for your application.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/docs/src/lib/registry/ui/direction
---

<script>
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

The `DirectionProvider` component sets the text direction for your application.

It supports left-to-right languages like English and Spanish, and right-to-left languages like Arabic, Hebrew, and Persian.

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

Set the document direction.

```html title="src/app.html" showLineNumbers
<html lang="en" dir="rtl">
  <!-- ... -->
</html>
```

Wrap your application with `DirectionProvider`.

```svelte showLineNumbers
<DirectionProvider direction="rtl">
  <!-- Your app content -->
</DirectionProvider>
```

## useDirection

Use the `useDirection` hook to access the current direction.

```svelte showLineNumbers
<script lang="ts">
  import { useDirection } from "$lib/components/ui/direction/index.js";

  const direction = useDirection();
</script>
```
