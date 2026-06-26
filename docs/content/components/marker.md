---
title: Marker
description: Displays an inline status, system note, bordered row, or labeled separator in a conversation.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="marker-demo">

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
- Link and button composition for interactive markers
- Works with the `shimmer` utility for streaming status text

## Accessibility

For streaming or progress markers, set `role="status"` so assistive tech announces the update as it appears. Do not add `role="separator"` to labeled separators; let the visible text be announced as ordinary content.

## API Reference

### Marker.Root

| Prop      | Type                                   | Default     | Description        |
| --------- | -------------------------------------- | ----------- | ------------------ |
| `variant` | `"default" \| "border" \| "separator"` | `"default"` | The marker layout. |

### Marker.Icon

A decorative icon slot. Hidden from assistive tech with `aria-hidden`.

### Marker.Content

The marker text content.
