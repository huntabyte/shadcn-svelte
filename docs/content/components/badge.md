---
title: Badge
description: Displays a badge or a component that looks like a badge.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/badge
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

<ComponentPreview name="badge-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="badge" />
{/snippet}
{#snippet manual()}
<Steps>

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
  import { Badge } from "$lib/components/ui/badge/index.js";
</script>
```

```svelte
<Badge variant="outline">Badge</Badge>
```

## Examples

### Variants

Use the `variant` prop to change the variant of the badge.

<ComponentPreview name="badge-variants">

<div></div>

</ComponentPreview>

### With Icon

You can render an icon inside the badge. Use `data-icon="inline-start"` to render the icon on the left and `data-icon="inline-end"` to render the icon on the right.

<ComponentPreview name="badge-with-icon">

<div></div>

</ComponentPreview>

### With Spinner

You can render a spinner inside the badge. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` prop to the spinner.

<ComponentPreview name="badge-with-spinner">

<div></div>

</ComponentPreview>

### Link

Use the `href` prop to render the badge as a link.

<ComponentPreview name="badge-link">

<div></div>

</ComponentPreview>

### Custom Colors

You can customize the colors of a badge by adding custom classes such as `bg-green-50 dark:bg-green-800` to the `Badge` component.

<ComponentPreview name="badge-custom-colors">

<div></div>

</ComponentPreview>

## API Reference

### Badge

The `Badge` component displays a badge or a component that looks like a badge.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` |
| `href` | `string` | — |
| `class` | `string` | — |
