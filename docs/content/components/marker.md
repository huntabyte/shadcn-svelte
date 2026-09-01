---
title: Marker
description: Marks dates, status changes, unread boundaries, and other events in a conversation.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/marker
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Step from "$lib/components/step.svelte";
	import Steps from "$lib/components/steps.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="marker-demo" />

`Marker` displays dates, status changes, unread boundaries, and other events between messages.

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
	<ComponentSource item={viewerData} data-llm-ignore />
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Marker from "$lib/components/ui/marker/index.js";
</script>

<Marker.Root variant="separator">
  <Marker.Content>Today</Marker.Content>
</Marker.Root>
```

## Composition

```text
Marker.Root
├── Marker.Icon
└── Marker.Content
```

## Features

- Default, separator, and border variants
- Icons, spinners, and shimmer status text
- Polymorphic links and buttons through a `child` snippet
- Class overrides on every part

## Variants

<ComponentPreview name="marker-variants" />

## Status

Use `role="status"` for live progress and place a spinner in `Marker.Icon`.

<ComponentPreview name="marker-status" />

## Shimmer

Apply the `shimmer` utility to status content that is actively progressing.

<ComponentPreview name="marker-shimmer" />

## Separator

Use `variant="separator"` for labeled boundaries between sections of a transcript.

<ComponentPreview name="marker-separator" />

## Border

Use `variant="border"` for a full-width row boundary.

<ComponentPreview name="marker-border" />

## With Icon

Add a decorative icon with `Marker.Icon`. Keep meaningful event text in `Marker.Content`.

<ComponentPreview name="marker-icon" />

## Links and Buttons

Use the `child` snippet to render an interactive marker as a real link or button.

<ComponentPreview name="marker-link-button" />

```svelte
<Marker.Root>
  {#snippet child({ props })}
    <a {...props} href="/pull/42">
      <Marker.Icon><GitBranchIcon /></Marker.Icon>
      <Marker.Content>View the pull request</Marker.Content>
    </a>
  {/snippet}
</Marker.Root>
```

## Accessibility

### Status and progress

Use `role="status"` when a marker reports changing progress. Keep the status text visible so the spinner is not the only cue.

### Labeled separators

Include text such as a date or boundary description in separator markers.

### Bordered markers

The border is decorative. Keep the event description in `Marker.Content`.

### Decorative icons

`Marker.Icon` is hidden from assistive technology. Put all meaningful information in `Marker.Content`.

### Interactive markers

Render links and buttons with the `child` snippet so they expose the correct keyboard and accessibility behavior.

## API Reference

### Marker.Root

| Prop      | Type                                   | Default     |
| --------- | -------------------------------------- | ----------- |
| `variant` | `"default" \| "separator" \| "border"` | `"default"` |
| `child`   | `Snippet`                              |             |
| `class`   | `string`                               |             |

### Marker.Icon

Holds a decorative icon and accepts standard `<span>` attributes.

### Marker.Content

Holds the event text and accepts standard `<span>` attributes.
