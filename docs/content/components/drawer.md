---
title: Drawer
description: A drawer component for Svelte.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/drawer
  doc: https://github.com/huntabyte/vaul-svelte
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

<ComponentPreview name="drawer-demo">

<div></div>

</ComponentPreview>

## About

Drawer is built on top of [Vaul Svelte](https://vaul-svelte.com), which is a Svelte port of [Vaul](https://vaul.emilkowal.ski) by [Emil Kowalski](https://twitter.com/emilkowalski_).

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="drawer" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `vaul-svelte`:

</Step>

<PMInstall command="vaul-svelte@next -D" />

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
  import * as Drawer from "$lib/components/ui/drawer/index.js";
</script>
```

```svelte showLineNumbers
<Drawer.Root>
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Are you absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
```

## Position

Use the `direction` prop to set the side of the drawer.

Available options are `top`, `right`, `bottom`, and `left`.

<ComponentPreview name="drawer-sides">

<div></div>

</ComponentPreview>

## Nested

Open drawers from inside another drawer using `<Drawer.NestedRoot />`. Parent drawers stay mounted and stack behind the frontmost drawer.

<ComponentPreview name="drawer-nested">

<div></div>

</ComponentPreview>

## Non Modal

Set `modal={false}` to allow interaction with the rest of the page while the drawer is open. Clicking outside a non-modal drawer does not close it.

<ComponentPreview name="drawer-non-modal">

<div></div>

</ComponentPreview>

## Snap Points

Use `snapPoints` to snap a drawer to preset heights. Numbers between `0` and `1` represent fractions of the viewport. String values support `px` units. Snap points apply to vertical drawers.

Track the active snap point with `bind:activeSnapPoint`.

<ComponentPreview name="drawer-snap-points">

<div></div>

</ComponentPreview>

## Responsive

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` component on desktop and a `Drawer` on mobile.

<ComponentPreview name="drawer-dialog">

<div></div>

</ComponentPreview>
