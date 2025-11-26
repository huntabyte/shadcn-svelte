---
title: Button
description: Displays a button or a component that looks like a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/button
  doc: https://bits-ui.com/docs/components/button
  api: https://bits-ui.com/docs/components/button#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData, links } = $props();
</script>

<ComponentPreview name="button-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="button" />
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
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button variant="outline">Button</Button>
```

## Examples

### Size

<ComponentPreview name="button-size" class="mb-4" >

<div></div>

</ComponentPreview>

### Default

<ComponentPreview name="button-default" description="A primary button" class="mb-4">

<div></div>

</ComponentPreview>

### Outline

<ComponentPreview name="button-outline" description="A button using the outline variant." class="mb-4">
  
<div></div>

</ComponentPreview>

### Secondary

<ComponentPreview name="button-secondary" description="A secondary button" class="mb-4">
  
<div></div>
  
</ComponentPreview>

### Ghost

<ComponentPreview name="button-ghost" description="A button using the ghost variant" class="mb-4">
  
<div></div>

</ComponentPreview>

### Destructive

<ComponentPreview name="button-destructive" description="A destructive button" class="mb-4">

<div></div>

</ComponentPreview>

### Link

<ComponentPreview name="button-link" description="A button using the link variant." class="mb-4">

<div></div>

</ComponentPreview>

### Icon

<ComponentPreview name="button-icon" description="An icon button" class="mb-4">

<div></div>

</ComponentPreview>

### With Icon

The spacing between the icon and the text is automatically adjusted based on the size of the button. You do not need any margin on the icon.

<ComponentPreview name="button-with-icon" description="A button with an icon" class="mb-4">

<div></div>

</ComponentPreview>

### Rounded

Use the `rounded-full` class to make the button rounded.

<ComponentPreview name="button-rounded" class="mb-4" >

<div></div>

</ComponentPreview>

### Spinner

<ComponentPreview name="button-loading" description="A button with a loading state." class="mb-4">

<div></div>

</ComponentPreview>

### Button Group

To create a button group, use the `ButtonGroup` component. See the [Button Group](/docs/components/button-group) documentation for more details.

<ComponentPreview name="button-group-demo" class="mb-4" >

<div></div>

</ComponentPreview>

### Link

You can convert the `<button>` into an `<a>` element by simply passing an `href` as a prop.

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button href="/dashboard">Dashboard</Button>
```

Alternatively, you can use the `buttonVariants` helper to create a link that looks like a button.

```svelte
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
</script>

<a href="/dashboard" class={buttonVariants({ variant: "outline" })}>
  Dashboard
</a>
```

### [API Reference](https://bits-ui.com/docs/components/button#api-reference)
