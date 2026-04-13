---
title: Aspect Ratio
description: Displays content within a desired ratio.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/aspect-ratio
  doc: https://bits-ui.com/docs/components/aspect-ratio
  api: https://bits-ui.com/docs/components/aspect-ratio#api-reference
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

<ComponentPreview name="aspect-ratio-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="aspect-ratio" />
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

```svelte showLineNumbers
<script lang="ts">
  import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";
</script>
```

```svelte showLineNumbers
<div class="w-[450px]">
  <AspectRatio ratio={16 / 9} class="bg-muted">
    <img src="..." alt="..." class="rounded-md object-cover" />
  </AspectRatio>
</div>
```

## Examples

### Square

<ComponentPreview name="aspect-ratio-square">

<div></div>

</ComponentPreview>

### Portrait

<ComponentPreview name="aspect-ratio-portrait" previewClassName="h-96">

<div></div>

</ComponentPreview>

## API Reference

### AspectRatio.Root

The `AspectRatio.Root` component displays content within a desired ratio.

| Prop       | Type      | Default |
| ---------- | --------- | ------- |
| `ratio`    | `number`  | `1`     |
| `children` | `Snippet` | -       |
| `class`    | `string`  | -       |

Use the `data-aspect-ratio-root` attribute to target the root element in CSS.
