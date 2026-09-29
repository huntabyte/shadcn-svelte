---
title: Button
description: Displays a button or a component that looks like a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/button
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

## Size

Use the `size` prop to change the size of the button.

<ComponentPreview name="button-size">

<div></div>

</ComponentPreview>

## Default

<ComponentPreview name="button-default">

<div></div>

</ComponentPreview>

## Outline

<ComponentPreview name="button-outline">

<div></div>

</ComponentPreview>

## Secondary

<ComponentPreview name="button-secondary">

<div></div>

</ComponentPreview>

## Ghost

<ComponentPreview name="button-ghost">

<div></div>

</ComponentPreview>

## Destructive

<ComponentPreview name="button-destructive">

<div></div>

</ComponentPreview>

## Link

<ComponentPreview name="button-link">

<div></div>

</ComponentPreview>

## Icon

<ComponentPreview name="button-icon">

<div></div>

</ComponentPreview>

## With Icon

Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the icon for the correct spacing.

<ComponentPreview name="button-with-icon">

<div></div>

</ComponentPreview>

## Rounded

Use the `rounded-full` class to make the button rounded.

<ComponentPreview name="button-rounded">

<div></div>

</ComponentPreview>

## Spinner

Render a `<Spinner />` component inside the button to show a loading state. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the spinner for the correct spacing.

<ComponentPreview name="button-loading">

<div></div>

</ComponentPreview>

## Button Group

To create a button group, use the `ButtonGroup` component. See the [Button Group](/docs/components/button-group) documentation for more details.

<ComponentPreview name="button-group-demo">

<div></div>

</ComponentPreview>

## As Link

Pass an `href` prop to `<Button />` to render it as an `<a>` element that looks like a button. You can also use the `buttonVariants` helper to make any other element look like a button.

<ComponentPreview name="button-as-link">

<div></div>

</ComponentPreview>
