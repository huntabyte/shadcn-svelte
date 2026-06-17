---
title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/scroll-area
  doc: https://bits-ui.com/docs/components/scroll-area
  api: https://bits-ui.com/docs/components/scroll-area#api-reference
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

<ComponentPreview name="scroll-area-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="scroll-area" />
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

```svelte showLineNumbers
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
</script>
```

```svelte showLineNumbers
<ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
  Jokester began sneaking into the castle in the middle of the night and
  leaving jokes all over the place: under the king's pillow, in his soup, even
  in the royal toilet. The king was furious, but he couldn't seem to stop
  Jokester. And then, one day, the people of the kingdom discovered that the
  jokes left by Jokester were so funny that they couldn't help but laugh. And
  once they started laughing, they couldn't stop.
</ScrollArea>
```

## Examples

### Horizontal Scrolling

Set the `orientation` prop to `"horizontal"` to enable horizontal scrolling.

<ComponentPreview name="scroll-area-horizontal">

<div></div>

</ComponentPreview>
