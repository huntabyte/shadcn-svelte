---
title: Badge
description: Displays a badge or a component that looks like a badge.
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/badge
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

### Link

You can use the `badgeVariants` helper to create a link that looks like a badge.

```svelte
<script lang="ts">
  import { badgeVariants } from "$lib/components/ui/badge/index.js";
</script>

<a href="/dashboard" class={badgeVariants({ variant: "outline" })}>Badge</a>
```

## Examples

### Variants

<ComponentPreview name="badge-demo">

<div></div>

</ComponentPreview>

<ComponentPreview name="badge-destructive">

<div></div>

</ComponentPreview>

<ComponentPreview name="badge-outline">

<div></div>

</ComponentPreview>

<ComponentPreview name="badge-secondary">

<div></div>

</ComponentPreview>

### With Icon

<ComponentPreview name="badge-with-icon">

<div></div>

</ComponentPreview>

### With Spinner

<ComponentPreview name="badge-with-spinner">

<div></div>

</ComponentPreview>

### Custom Colors

<ComponentPreview name="badge-custom-colors">

<div></div>

</ComponentPreview>
