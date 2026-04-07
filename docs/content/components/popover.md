---
title: Popover
description: Displays rich content in a portal, triggered by a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/popover
  doc: https://bits-ui.com/docs/components/popover
  api: https://bits-ui.com/docs/components/popover#api-reference
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

<ComponentPreview name="popover-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="popover" />
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
  import * as Popover from "$lib/components/ui/popover/index.js";
</script>
```

```svelte showLineNumbers
<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>Place content for the popover here.</Popover.Content>
</Popover.Root>
```

## Examples

### Basic

A simple popover with a header, title, and description.

<ComponentPreview name="popover-basic">

<div></div>

</ComponentPreview>

### With Form

A popover with form fields inside.

<ComponentPreview name="popover-form">

<div></div>

</ComponentPreview>

## API Reference

### Popover.Root

Manages the popover's open/closed state.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | The open state of the popover. |
| `onOpenChange` | `(open: boolean) => void` | - | Called when the open state changes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | - | Called after the open/close animation completes. |
| `children` | `Snippet` | - | The children of the popover. |

### Popover.Trigger

Toggles the popover on interaction.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `openOnHover` | `boolean` | `false` | Opens the popover on hover. |
| `openDelay` | `number` | `700` | Delay in milliseconds before opening on hover. |
| `closeDelay` | `number` | `300` | Delay in milliseconds before closing on hover. |
| `children` | `Snippet` | - | The children of the trigger. |
| `child` | `Snippet` | - | Use for render delegation. |

### Popover.Content

Contains the content displayed inside the popover.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | The preferred side of the anchor to render the popover. |
| `sideOffset` | `number` | `0` | The distance in pixels from the anchor. |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | The preferred alignment of the popover relative to the anchor. |
| `alignOffset` | `number` | `0` | The distance in pixels from the alignment edge. |
| `avoidCollisions` | `boolean` | `true` | When `true`, overrides `side` and `align` to prevent collisions with boundaries. |
| `preventScroll` | `boolean` | `false` | When `true`, prevents scrolling the body when the popover is open. |
| `customAnchor` | `string \| HTMLElement \| null` | `null` | An alternative anchor element to position the popover against. |
| `trapFocus` | `boolean` | `true` | When `true`, focus is trapped within the popover content while open. |
| `forceMount` | `boolean` | `false` | Forces the popover to always be mounted in the DOM. Useful for controlling animations with external libraries. |
| `onInteractOutside` | `(event: Event) => void` | - | Called when a pointer interaction occurs outside the content. |
| `onEscapeKeydown` | `(event: KeyboardEvent) => void` | - | Called when the Escape key is pressed. |
| `interactOutsideBehavior` | `'close' \| 'ignore' \| 'defer-otherwise-close' \| 'defer-otherwise-ignore'` | `'close'` | How the popover responds to pointer interactions outside its content. |
| `escapeKeydownBehavior` | `'close' \| 'ignore' \| 'defer-otherwise-close' \| 'defer-otherwise-ignore'` | `'close'` | How the popover responds to the Escape key. |
| `class` | `string` | - | Additional CSS classes to apply to the content. |
| `children` | `Snippet` | - | The children of the content. |

### Popover.Close

A button that closes the popover when clicked.

### Popover.Arrow

An optional arrow element that points toward the trigger.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number` | `8` | The width of the arrow in pixels. |
| `height` | `number` | `8` | The height of the arrow in pixels. |

### Popover.Overlay

An optional overlay element rendered behind the popover content.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `forceMount` | `boolean` | `false` | Forces the overlay to always be mounted in the DOM. |

### Popover.Portal

Renders the popover content into a different part of the DOM.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `to` | `Element \| string` | `document.body` | The target element or CSS selector to portal the content into. |
| `disabled` | `boolean` | `false` | When `true`, disables portalling and renders the content in place. |
