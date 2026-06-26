---
title: Bubble
description: Displays conversational content in a message bubble.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/bubble
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

<ComponentPreview name="bubble-demo">

<div></div>

</ComponentPreview>

The `Bubble` component displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions.

For full-featured chat interfaces, use the [`Message`](/docs/components/message) component. `Bubble` is intentionally scoped to the bubble surface.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="bubble" />
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
  import * as Bubble from "$lib/components/ui/bubble/index.js";
</script>
```

```svelte
<Bubble.Root>
  <Bubble.Content>
    I checked the registry output and removed the stale route.
  </Bubble.Content>
  <Bubble.Reactions role="img" aria-label="Reactions: thumbs up">
    <span>+1</span>
  </Bubble.Reactions>
</Bubble.Root>
```

## Composition

```text
Bubble
├── BubbleContent
└── BubbleReactions
```

Use `Bubble.Group` to group consecutive bubbles from the same sender.

## Examples

### Variants

Use `variant` to change the visual treatment of the bubble.

<ComponentPreview name="bubble-variants">

<div></div>

</ComponentPreview>

### Alignment

Use `align` on `Bubble.Root` to align the bubble to the start or end of the conversation.

<ComponentPreview name="bubble-alignment">

<div></div>

</ComponentPreview>

### Bubble Group

Use `Bubble.Group` to group consecutive bubbles from the same sender.

<ComponentPreview name="bubble-group-demo">

<div></div>

</ComponentPreview>

### Reactions

Use `Bubble.Reactions` for reaction rows or quick actions. Use `side` and `align` to position the row.

<ComponentPreview name="bubble-reactions">

<div></div>

</ComponentPreview>

## Accessibility

`Bubble` renders the presentational message surface. Keep conversation-level semantics on the surrounding container.

When reactions are decorative, group them as a single image with a descriptive `aria-label`. When reactions are interactive, render buttons and label icon-only buttons.

## API Reference

### Bubble.Root

| Prop      | Type                                                                                       | Default     | Description                         |
| --------- | ------------------------------------------------------------------------------------------ | ----------- | ----------------------------------- |
| `variant` | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` | The bubble visual treatment.        |
| `align`   | `"start" \| "end"`                                                                         | `"start"`   | The inline alignment of the bubble. |

### Bubble.Reactions

| Prop    | Type                | Default    | Description                                     |
| ------- | ------------------- | ---------- | ----------------------------------------------- |
| `side`  | `"top" \| "bottom"` | `"bottom"` | The side of the bubble to anchor the reactions. |
| `align` | `"start" \| "end"`  | `"end"`    | The inline alignment of the reactions.          |
