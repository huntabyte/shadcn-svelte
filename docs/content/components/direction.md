---
title: Direction
description: A provider component that sets the text direction for your application.
component: true
links:
  doc: https://bits-ui.com/docs/utilities/bits-config
  api: https://bits-ui.com/docs/utilities/bits-config#api-reference
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

The `DirectionProvider` component is used to set the text direction (`ltr` or `rtl`) for your application. This is essential for supporting right-to-left languages like Arabic, Hebrew, and Persian.

Here's a preview of the component in RTL mode. Use the language selector to switch the language. To see more examples, look for the RTL section on components pages.

<ComponentPreview name="card-rtl" direction="rtl" previewClassName="h-auto" hideCode>

<div></div>

</ComponentPreview>

## Installation

This draft requires the upcoming Bits UI release containing [#2288](https://github.com/huntabyte/bits-ui/pull/2288), which has already merged. Bits UI 2.21.0 does not include `BitsConfig.dir`.

<InstallTabs>
{#snippet cli()}
<PMAddComp name="direction" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>Install the following dependencies:</Step>

<PMInstall command="bits-ui -D" />

<Step>Copy and paste the following code into your project.</Step>

{#if viewerData}
<ComponentSource item={viewerData} data-llm-ignore />
{/if}

<Step>Update the import paths to match your project setup.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
</script>
```

Set the HTML direction in `src/app.html`:

```html showLineNumbers
<html lang="ar" dir="rtl">
  <!-- Your app document -->
</html>
```

Wrap your app content in `src/routes/+layout.svelte`:

```svelte showLineNumbers
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
  let { children } = $props();
</script>

<DirectionProvider direction="rtl">
  {@render children()}
</DirectionProvider>
```

## useDirection

The `useDirection` function is used to get the current direction of the application. Call it during component initialization and read `current` to track the direction reactively.

```svelte showLineNumbers
<script lang="ts">
  import { useDirection } from "$lib/components/ui/direction/index.js";

  const direction = useDirection();
</script>

<div>Current direction: {direction.current}</div>
```

## Logical floating sides

`ContextMenu.Content`, `ContextMenu.SubContent`, and `DropdownMenu.SubContent` default to `side="inline-end"`. They also accept `inline-start`, resolving the logical side reactively from the provider or an explicit `dir`. Physical `left`, `right`, `top`, and `bottom` values keep their usual meaning.

Bits UI itself still takes physical sides. These wrappers adapt shadcn/ui's logical intent without passing unsupported values to Bits UI. [Bits UI #2306](https://github.com/huntabyte/bits-ui/pull/2306) addresses primitive submenu defaults separately; this adapter does not depend on it.
