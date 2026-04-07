---
title: Tooltip
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/tooltip
  doc: https://bits-ui.com/docs/components/tooltip
  api: https://bits-ui.com/docs/components/tooltip#api-reference
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

<ComponentPreview name="tooltip-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="tooltip" />
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

The `Tooltip.Provider` component should be placed once in your root layout, wrapping all content that will contain tooltips. This ensures that only one tooltip within the provider can be open at a time.

```svelte title="src/routes/+layout.svelte" showLineNumbers
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  let { children } = $props();
</script>

<Tooltip.Provider>
  {@render children()}
</Tooltip.Provider>
```

Then use tooltips anywhere in your app:

```svelte
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Root>
  <Tooltip.Trigger>Hover</Tooltip.Trigger>
  <Tooltip.Content>
    <p>Add to library</p>
  </Tooltip.Content>
</Tooltip.Root>
```

### Nested Providers

You can nest providers to create groups with different settings. Tooltips use the closest ancestor provider. This is useful when you want instant tooltips in specific areas:

```svelte
<Tooltip.Provider delayDuration={0}>
  <!-- Tooltips here will open instantly -->
</Tooltip.Provider>
```

## Examples

### Side

Use the `side` prop to change the position of the tooltip.

<ComponentPreview name="tooltip-side">

<div></div>

</ComponentPreview>

### With Keyboard Shortcut

<ComponentPreview name="tooltip-keyboard-shortcut">

<div></div>

</ComponentPreview>

### Disabled Button

Show a tooltip on a disabled button by wrapping it with a span.

<ComponentPreview name="tooltip-disabled-button">

<div></div>

</ComponentPreview>

---

## Changelog

### 2025-12 Update tooltip colors

We've updated the tooltip colors to use the foreground color for the background and the background color for the foreground.

Replace `bg-primary text-primary-foreground` with `bg-foreground text-background` for `<Tooltip.Content />`.

## API Reference

### Tooltip.Provider

Container providing shared state for tooltips within its subtree.

| Prop                         | Type      | Default | Description                                                                      |
| ---------------------------- | --------- | ------- | -------------------------------------------------------------------------------- |
| `delayDuration`              | `number`  | `700`   | The delay in milliseconds before the tooltip opens on hover.                     |
| `disableHoverableContent`    | `boolean` | `false` | When `true`, disables hoverable content behavior.                                |
| `disabled`                   | `boolean` | `false` | When `true`, disables all tooltips within the provider.                          |
| `disableCloseOnTriggerClick` | `boolean` | `false` | When `true`, prevents the tooltip from closing when the trigger is clicked.      |
| `skipDelayDuration`          | `number`  | `300`   | The grace period in milliseconds for instant opens when moving between tooltips. |
| `ignoreNonKeyboardFocus`     | `boolean` | `false` | When `true`, ignores non-keyboard focus events.                                  |
| `children`                   | `Snippet` | -       | The children of the provider.                                                    |

### Tooltip.Root

Root component managing a tooltip's open/closed state. Must be a descendant of `Tooltip.Provider`.

| Prop                         | Type                      | Default | Description                                                                |
| ---------------------------- | ------------------------- | ------- | -------------------------------------------------------------------------- |
| `open`                       | `boolean`                 | `false` | The open state of the tooltip. Use `bind:open` for two-way binding.        |
| `onOpenChange`               | `(open: boolean) => void` | -       | Called when the open state changes.                                        |
| `onOpenChangeComplete`       | `(open: boolean) => void` | -       | Called after the open/close animation completes.                           |
| `disabled`                   | `boolean`                 | `false` | When `true`, disables this tooltip.                                        |
| `delayDuration`              | `number`                  | `700`   | The hover delay in milliseconds. Overrides the provider's `delayDuration`. |
| `disableHoverableContent`    | `boolean`                 | `false` | When `true`, disables hoverable content for this tooltip.                  |
| `disableCloseOnTriggerClick` | `boolean`                 | `false` | When `true`, prevents closing when the trigger is clicked.                 |
| `ignoreNonKeyboardFocus`     | `boolean`                 | `false` | When `true`, ignores non-keyboard focus events.                            |
| `children`                   | `Snippet`                 | -       | The children of the root.                                                  |

### Tooltip.Trigger

The interactive element that opens and closes the tooltip on hover or focus.

| Prop       | Type      | Default | Description                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `disabled` | `boolean` | `false` | When `true`, disables this trigger. |
| `children` | `Snippet` | -       | The children of the trigger.        |
| `child`    | `Snippet` | -       | Use for render delegation.          |

### Tooltip.Content

Contains the content displayed inside the tooltip, positioned using Floating UI.

| Prop                      | Type                                                                         | Default       | Description                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `side`                    | `'top' \| 'right' \| 'bottom' \| 'left'`                                     | `'bottom'`    | The preferred side of the anchor to render the tooltip.                                                                |
| `sideOffset`              | `number`                                                                     | `0`           | The distance in pixels from the anchor.                                                                                |
| `align`                   | `'start' \| 'center' \| 'end'`                                               | `'start'`     | The preferred alignment of the tooltip relative to the anchor.                                                         |
| `alignOffset`             | `number`                                                                     | `0`           | The distance in pixels from the alignment edge.                                                                        |
| `avoidCollisions`         | `boolean`                                                                    | `true`        | When `true`, overrides `side` and `align` to prevent collisions with boundaries.                                       |
| `collisionBoundary`       | `Element \| null`                                                            | -             | The element(s) to check for collisions against.                                                                        |
| `collisionPadding`        | `number \| Partial<Record<Side, number>>`                                    | `0`           | Virtual padding around the boundary for collision detection.                                                           |
| `arrowPadding`            | `number`                                                                     | `0`           | Virtual padding around the viewport for the arrow.                                                                     |
| `sticky`                  | `'partial' \| 'always'`                                                      | `'partial'`   | The sticky behavior on the align axis.                                                                                 |
| `hideWhenDetached`        | `boolean`                                                                    | `true`        | When `true`, hides the content when detached from the DOM.                                                             |
| `updatePositionStrategy`  | `'optimized' \| 'always'`                                                    | `'optimized'` | How often to update the floating position.                                                                             |
| `strategy`                | `'fixed' \| 'absolute'`                                                      | `'fixed'`     | The CSS positioning strategy to use.                                                                                   |
| `preventScroll`           | `boolean`                                                                    | `true`        | When `true`, prevents scrolling the body when the tooltip is open.                                                     |
| `customAnchor`            | `string \| HTMLElement \| null`                                              | `null`        | An alternative anchor element to position the tooltip against.                                                         |
| `forceMount`              | `boolean`                                                                    | `false`       | Forces the tooltip content to always be mounted in the DOM. Useful for controlling animations with external libraries. |
| `onInteractOutside`       | `(event: PointerEvent) => void`                                              | -             | Called when a pointer interaction occurs outside the content.                                                          |
| `onFocusOutside`          | `(event: FocusEvent) => void`                                                | -             | Called when focus moves outside the content.                                                                           |
| `interactOutsideBehavior` | `'close' \| 'ignore' \| 'defer-otherwise-close' \| 'defer-otherwise-ignore'` | `'close'`     | How the tooltip responds to pointer interactions outside its content.                                                  |
| `onEscapeKeydown`         | `(event: KeyboardEvent) => void`                                             | -             | Called when the Escape key is pressed.                                                                                 |
| `escapeKeydownBehavior`   | `'close' \| 'ignore' \| 'defer-otherwise-close' \| 'defer-otherwise-ignore'` | `'close'`     | How the tooltip responds to the Escape key.                                                                            |
| `dir`                     | `'ltr' \| 'rtl'`                                                             | `'ltr'`       | The reading direction of the content.                                                                                  |
| `class`                   | `string`                                                                     | -             | Additional CSS classes to apply to the content.                                                                        |
| `children`                | `Snippet`                                                                    | -             | The children of the content.                                                                                           |
| `child`                   | `Snippet`                                                                    | -             | Use for render delegation.                                                                                             |

### Tooltip.Arrow

An optional arrow element that points toward the trigger.

| Prop       | Type      | Default | Description                        |
| ---------- | --------- | ------- | ---------------------------------- |
| `width`    | `number`  | `8`     | The width of the arrow in pixels.  |
| `height`   | `number`  | `8`     | The height of the arrow in pixels. |
| `children` | `Snippet` | -       | The children of the arrow.         |
| `child`    | `Snippet` | -       | Use for render delegation.         |

### Tooltip.Portal

Renders the tooltip content into a different part of the DOM.

| Prop       | Type                | Default         | Description                                                        |
| ---------- | ------------------- | --------------- | ------------------------------------------------------------------ |
| `to`       | `Element \| string` | `document.body` | The target element or CSS selector to portal the content into.     |
| `disabled` | `boolean`           | `false`         | When `true`, disables portalling and renders the content in place. |
| `children` | `Snippet`           | -               | The children of the portal.                                        |
