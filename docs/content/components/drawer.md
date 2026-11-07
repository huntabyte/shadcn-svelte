---
title: Drawer
description: A drawer component for Svelte.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/drawer
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

<ComponentPreview previewStyle="rhea" name="drawer-demo">

<div></div>

</ComponentPreview>

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

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
</script>
```

```svelte showLineNumbers
<Drawer.Root>
  <Drawer.Trigger class={buttonVariants({ variant: "outline" })}>Open</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Are you absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header>
    <div class="p-4"><!-- Content here --></div>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close class={buttonVariants({ variant: "outline" })}>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
```

## Composition

Use the following composition to build a drawer:

```text
Drawer.Root
├── Drawer.Trigger
└── Drawer.Content
    ├── Drawer.Header
    │   ├── Drawer.Title
    │   └── Drawer.Description
    └── Drawer.Footer
```

## Custom Sizes

A vertical drawer sizes itself to its content and is capped at `calc(100dvh - 6rem)` by default. A side drawer spans `75%` of the viewport width, or `24rem` on larger screens.

To customize the height of a vertical drawer, use the `h-*` and `max-h-*` utilities on `Drawer.Content`.

```svelte
<Drawer.Content class="h-[50vh]">
```

To customize the width of a side drawer, use the `w-*` and `max-w-*` utilities on `Drawer.Content`.

```svelte
<Drawer.Content class="w-96">
```

When the same component renders in multiple directions, scope an override to one axis using the `data-[swipe-axis=*]` variants.

```svelte
<Drawer.Content class="data-[swipe-axis=y]:max-h-[50vh] data-[swipe-axis=x]:w-96">
```

To make a region of the drawer scrollable, make the scroll container a flex item. Avoid `h-full`, which does not resolve inside a content-sized drawer.

```svelte
<Drawer.Content>
  <Drawer.Header>...</Drawer.Header>
  <div class="flex-1 overflow-y-auto p-4"><!-- Scrollable content --></div>
  <Drawer.Footer>...</Drawer.Footer>
</Drawer.Content>
```

## Styling

The drawer exposes a CSS variable for style-level customization. Set the sizing variable on `Drawer.Content`.

| Variable | Default | Description |
| --- | --- | --- |
| `--drawer-inset` | `0px` | Floats the drawer from the viewport edges. |

The drawer also sets data attributes you can target with variants such as `data-[swipe-direction=down]:` on `Drawer.Content`, or `group-data-[swipe-axis=y]/drawer-popup:` on its descendants.

| Attribute | Values | Set when |
| --- | --- | --- |
| `data-swipe-direction` | `up`, `right`, `down`, `left` | Always. |
| `data-swipe-axis` | `x`, `y` | Always. |

## Position

Use the `direction` prop to set the side of the drawer.

Available options are `top`, `right`, `bottom`, and `left`.

<ComponentPreview previewStyle="rhea" name="drawer-sides">

<div></div>

</ComponentPreview>

## Swipe Handle

Use `showSwipeHandle` on `Drawer.Root` to render a swipe handle.

<ComponentPreview previewStyle="rhea" name="drawer-swipe-handle">

<div></div>

</ComponentPreview>

## Nested

Open drawers from inside another drawer using `<Drawer.NestedRoot />`. Parent drawers stay mounted and stack behind the frontmost drawer.

<ComponentPreview previewStyle="rhea" name="drawer-nested">

<div></div>

</ComponentPreview>

## Non Modal

Set `modal={false}` to allow interaction with the rest of the page while the drawer is open. Clicking outside a non-modal drawer does not close it.

<ComponentPreview previewStyle="rhea" name="drawer-non-modal">

<div></div>

</ComponentPreview>

## Snap Points

Use `snapPoints` to snap a drawer to preset heights. Numbers between `0` and `1` represent fractions of the viewport. String values support `px` units. Snap points apply to vertical drawers.

Track the active snap point with `bind:activeSnapPoint`.

<ComponentPreview previewStyle="rhea" name="drawer-snap-points">

<div></div>

</ComponentPreview>

## Responsive

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` component on desktop and a `Drawer` on mobile.

<ComponentPreview previewStyle="rhea" name="drawer-dialog">

<div></div>

</ComponentPreview>

## API Reference

See the [Vaul Svelte documentation](https://vaul-svelte.com) for the full API reference.
