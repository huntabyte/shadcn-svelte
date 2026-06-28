---
title: Marker
description: Displays an inline status, system note, bordered row, or labeled separator in a conversation.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import Callout from "$lib/components/callout.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="marker-demo" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

The `Marker` component displays inline conversation markers such as status updates, system notes, bordered rows, and labeled separators. Compose it with [`Message`](/docs/components/message) in a conversation thread.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="marker" />
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
  import * as Marker from "$lib/components/ui/marker/index.js";
  import CheckIcon from "@lucide/svelte/icons/check";
</script>
```

```svelte
<Marker.Root>
  <Marker.Icon>
    <CheckIcon />
  </Marker.Icon>
  <Marker.Content>Explored 4 files</Marker.Content>
</Marker.Root>
```

## Composition

```text
Marker
├── MarkerIcon
└── MarkerContent
```

## Features

- Inline marker, bordered row, and labeled separator variants
- Decorative icon slot that is hidden from assistive tech
- Polymorphic root via the `child` snippet for link and button markers
- Pairs with the [`shimmer`](/docs/utils/shimmer) utility for streaming status text
- Customizable styling through the `class` prop on every part

## Examples

### Variants

Use `variant` to switch between an inline marker, bordered row, and labeled separator.

<ComponentPreview name="marker-variants" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

| Variant     | Description                                          |
| ----------- | ---------------------------------------------------- |
| `default`   | An inline marker for status, notes, and actions.     |
| `border`    | A default marker with a bottom border under the row. |
| `separator` | A centered label with divider lines on each side.    |

### Status

Set `role="status"` and include a [`Spinner`](/docs/components/spinner) for streaming or in-progress markers so updates are announced.

<ComponentPreview name="marker-status" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Shimmer

Add the [`shimmer`](/docs/utils/shimmer) utility class to `Marker.Content` for an animated streaming-text effect. See the shimmer docs for installation.

<ComponentPreview name="marker-shimmer" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Separator

Use the `separator` variant for labeled dividers, such as dates or section breaks, in a conversation.

<ComponentPreview name="marker-separator" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Border

Use the `border` variant for status rows that should keep the default marker alignment while separating the next row.

<ComponentPreview name="marker-border" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### With Icon

Use `Marker.Icon` to render an icon alongside the content. Use `flex-col` to stack the icon above the content.

<ComponentPreview name="marker-icon" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Links and Buttons

Turn a marker into a link or button with the `child` snippet on `Marker.Root`.

<ComponentPreview name="marker-link-button" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

```svelte
<Marker.Root>
  {#snippet child({ props })}
    <a href="#/" {...props}>
      <Marker.Content>View the pull request</Marker.Content>
    </a>
  {/snippet}
</Marker.Root>
```

## Accessibility

`Marker` is presentational by default. The correct semantics depend on how you use it, so choose the role based on intent rather than relying on a single default.

### Status and Progress

For streaming or progress markers such as "Thinking..." or a running tool, set `role="status"` so assistive tech announces the update as it appears. `Marker.Root` forwards `role` to the underlying element.

```svelte
<Marker.Root role="status">
  <Marker.Icon>
    <Spinner />
  </Marker.Icon>
  <Marker.Content>Compacting conversation</Marker.Content>
</Marker.Root>
```

### Labeled Separators

A separator that carries text, such as a date or a section label, needs no role. The divider lines are decorative CSS pseudo-elements, and the text is announced as ordinary content.

```svelte
<Marker.Root variant="separator">
  <Marker.Content>Today</Marker.Content>
</Marker.Root>
```

<Callout>
	**Note:** Do not add `role="separator"` to a labeled divider. A separator takes
	its accessible name from `aria-label`, not from its text, and its contents are
	treated as presentational, so the visible label would not be announced.
	Reserve `role="separator"` for a divider with no meaningful text.
</Callout>

### Bordered Markers

A bordered marker keeps the same semantics as the default marker. The bottom border is decorative, so choose `role="status"`, the `child` snippet, or no role based on the marker's purpose.

```svelte
<Marker.Root variant="border">
  <Marker.Icon>
    <FileTextIcon />
  </Marker.Icon>
  <Marker.Content>Opened implementation notes</Marker.Content>
</Marker.Root>
```

### Decorative Icons

`Marker.Icon` is decorative and hidden from assistive tech with `aria-hidden`, so the adjacent `Marker.Content` carries the meaning. For an icon-only marker, provide an `aria-label` or visible text so it is not announced as empty.

```svelte
<Marker.Root aria-label="Synced">
  <Marker.Icon>
    <CheckIcon />
  </Marker.Icon>
</Marker.Root>
```

### Interactive Markers

When a marker links or triggers an action, render it as a real `<button>` or `<a>` with the `child` snippet so it is focusable and exposes the correct role. The accessible name comes from the marker text.

```svelte
<Marker.Root>
  {#snippet child({ props })}
    <a href="/files" {...props}>
      <Marker.Icon>
        <FileTextIcon />
      </Marker.Icon>
      <Marker.Content>Explored 4 files</Marker.Content>
    </a>
  {/snippet}
</Marker.Root>
```

## API Reference

### Marker.Root

The root marker element. The file also exports `markerVariants` for composing the marker styles into custom components.

| Prop      | Type                                   | Default     | Description                                |
| --------- | -------------------------------------- | ----------- | ------------------------------------------ |
| `variant` | `"default" \| "border" \| "separator"` | `"default"` | The marker layout.                         |
| `child`   | `Snippet`                              |             | Render as a child element, such as a link. |
| `class`   | `string`                               |             | Additional classes for the marker root.    |

### Marker.Icon

A decorative icon slot. Hidden from assistive tech with `aria-hidden`.

| Prop    | Type     | Default | Description                              |
| ------- | -------- | ------- | ---------------------------------------- |
| `class` | `string` |         | Additional classes for the icon wrapper. |

### Marker.Content

The marker text content.

| Prop    | Type     | Default | Description                                 |
| ------- | -------- | ------- | ------------------------------------------- |
| `class` | `string` |         | Additional classes for the content wrapper. |
