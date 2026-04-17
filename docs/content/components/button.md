---
title: Button
description: Displays a button or a component that looks like a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/button
  api: https://bits-ui.com/docs/components/button#api-reference
---

<script>
  import Callout from "$lib/components/callout.svelte";
  import InfoIcon from "@lucide/svelte/icons/info";
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData, links } = $props();
</script>

<ComponentPreview name="button-demo" class="mb-4">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<Button variant="outline">Button</Button>
<Button variant="outline" size="icon" aria-label="Submit">
  <ArrowUpIcon />
</Button>
```

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

<Step>

Update the import paths to match your project setup.

</Step>

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

## Cursor

Tailwind v4 [switched](https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor) from `cursor: pointer` to `cursor: default` for the button component.

If you want to keep the `cursor: pointer` behavior, add the following code to your CSS file:

```css showLineNumbers title="app.css"
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
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

Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the icon for the correct spacing.

<ComponentPreview name="button-with-icon" description="A button with an icon" class="mb-4">

<div></div>

</ComponentPreview>

### Rounded

Use the `rounded-full` class to make the button rounded.

<ComponentPreview name="button-rounded" class="mb-4" >

<div></div>

</ComponentPreview>

### Spinner

Render a `<Spinner />` component inside the button to show a loading state. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the spinner for the correct spacing.

<ComponentPreview name="button-spinner" description="A button with a loading state." class="mb-4">

<div></div>

</ComponentPreview>

### Button Group

To create a button group, use the `ButtonGroup` component. See the [Button Group](/docs/components/button-group) documentation for more details.

<ComponentPreview name="button-group-demo" class="mb-4" >

<div></div>

</ComponentPreview>

### Child Snippet

You can use `buttonVariants` helper on `<Button />` to make another component look like a button. Here's an example of a link that looks like a button.

<ComponentPreview name="button-as-child" class="mb-4">

<div></div>

</ComponentPreview>

## API Reference

### Button

The Button component is a wrapper around the button element that adds a variety of styles and functionality.

| Prop       | Type                                                                                 | Default     |
| ---------- | ------------------------------------------------------------------------------------ | ----------- |
| `variant`  | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"`        | `"default"` |
| `size`     | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` |
| `href`     | `string`                                                                             | -           |
| `children` | `Snippet`                                                                            | -           |
