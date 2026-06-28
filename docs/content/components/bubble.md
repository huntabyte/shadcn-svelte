---
title: Bubble
description: Displays conversational content in a message bubble. Supports variants, alignment, grouping, reactions, and collapsible content.
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

<ComponentPreview name="bubble-demo" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

The `Bubble` component displays framed conversational content. Use it for chat
text, short structured output, quoted replies, suggestions, and reactions.

For full-featured chat interfaces, use the
[`Message`](/docs/components/message) component. `Bubble` is intentionally
scoped to the bubble surface. Place avatars, names, timestamps, metadata, and
message-level actions in [`Message`](/docs/components/message).

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

```text
Bubble.Group
├── Bubble.Root
│   └── Bubble.Content
└── Bubble.Root
    └── Bubble.Content
```

## Features

- Seven visual variants, from a strong primary bubble to unframed ghost content
- Start and end alignment for sender and receiver bubbles
- Reactions that anchor to the bubble edge with configurable side and alignment
- Bubbles size to their content, up to 80% of the container width
- `child` snippet support on `Bubble.Content` for rendering links and buttons
- Customizable styling through the `class` prop on every part

## Examples

### Variants

Use `variant` to change the visual treatment of the bubble.

<ComponentPreview name="bubble-variants" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

| Variant       | Description                                            |
| ------------- | ------------------------------------------------------ |
| `default`     | A strong primary bubble, usually for the current user. |
| `secondary`   | The standard neutral bubble for conversation content.  |
| `muted`       | A lower-emphasis bubble for quiet supporting content.  |
| `tinted`      | A subtle primary-tinted bubble.                        |
| `outline`     | A bordered bubble for secondary or rich content.       |
| `ghost`       | Unframed content for assistant text or rich content.   |
| `destructive` | A destructive bubble for error or failed actions.      |

A bubble sizes to its content, up to 80% of the container width. The `ghost`
variant removes the max-width so assistant text and rich content can span the
full row.

### Alignment

Use `align` on `Bubble.Root` to align the bubble to the start or end of the
conversation.

<ComponentPreview name="bubble-alignment" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

| align   | Description                                        |
| ------- | -------------------------------------------------- |
| `start` | Align the bubble to the start of the conversation. |
| `end`   | Align the bubble to the end of the conversation.   |

**Note:** When building chat interfaces, you probably want to use alignment on
the `Message` component itself, not the `Bubble` component. You can use the
`role` prop on the `Message` component to automatically align the bubble to the
start or end of the conversation.

### Bubble Group

Use `Bubble.Group` to group consecutive bubbles from the same sender.

<ComponentPreview name="bubble-group-demo" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Links and Buttons

Use the `child` snippet on `Bubble.Content` when the bubble itself should be an
interactive element.

<ComponentPreview name="bubble-link-button" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

```svelte
<Bubble.Root variant="tinted" align="end">
  <Bubble.Content>
    {#snippet child({ props })}
      <button {...props}>I forgot my password</button>
    {/snippet}
  </Bubble.Content>
</Bubble.Root>
```

### Reactions

Use `Bubble.Reactions` for reaction rows or quick actions. Use `side` and
`align` to position the row. `side="top"` anchors it to the upper edge.
Reactions overlap the bubble edge, so leave vertical space between rows.

<ComponentPreview name="bubble-reactions" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Show More / Collapsible

Compose `Bubble.Content` with `Collapsible` for long assistant messages that can
be expanded in place.

<ComponentPreview name="bubble-collapsible" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Tooltip

Use `Tooltip` inside `Bubble.Reactions` for compact metadata such as read
receipts.

<ComponentPreview name="bubble-tooltip" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Popover

Use `Popover` inside `Bubble.Reactions` for richer contextual details.

<ComponentPreview name="bubble-popover" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

## Accessibility

`Bubble` renders the presentational message surface. Keep conversation-level
semantics on the surrounding container.

### Labeling Reactions

Reactions render as a row of emoji. A screen reader reads each glyph with no
context, and counters like `+8` are announced as "plus eight". Group the row as
a single image with a descriptive `aria-label` so it announces once.
`role="img"` also hides the individual emoji from assistive tech, so no
`aria-hidden` is needed.

```svelte
<Bubble.Reactions
  role="img"
  aria-label="Reactions: thumbs up, fire, and 8 more"
>
  <span>👍</span>
  <span>🔥</span>
  <span>+8</span>
</Bubble.Reactions>
```

When reactions are interactive, render buttons and label icon-only controls.

```svelte
<Bubble.Reactions>
  <Button aria-label="Mark as read" size="icon-xs" variant="ghost">
    <CheckIcon />
  </Button>
</Bubble.Reactions>
```

### Interactive Bubbles

If a bubble is a link or button, render a real `<a>` or `<button>` with the
`child` snippet so it is focusable and exposes the correct role. `Bubble.Content`
ships a visible focus ring for interactive elements, and the accessible name
comes from the bubble text. No extra label is needed.

```svelte
<Bubble.Root variant="muted" align="end">
  <Bubble.Content>
    {#snippet child({ props })}
      <button {...props} type="button" onclick={onReply}>
        I forgot my password
      </button>
    {/snippet}
  </Bubble.Content>
</Bubble.Root>
```

### Meaning Beyond Color

Do not rely on color alone to communicate destructive or error states. Include
clear text or an icon label in the bubble content.

## API Reference

### Bubble.Root

| Prop      | Type                                                                                       | Default     | Description                         |
| --------- | ------------------------------------------------------------------------------------------ | ----------- | ----------------------------------- |
| `variant` | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` | The bubble visual treatment.        |
| `align`   | `"start" \| "end"`                                                                         | `"start"`   | The inline alignment of the bubble. |
| `class`   | `string`                                                                                   |             | Additional classes for the root.    |

### Bubble.Content

| Prop    | Type      | Default | Description                                  |
| ------- | --------- | ------- | -------------------------------------------- |
| `child` | `Snippet` |         | Render as a child element, such as a button. |
| `class` | `string`  |         | Additional classes for the content element.  |

### Bubble.Reactions

| Prop    | Type                | Default    | Description                                     |
| ------- | ------------------- | ---------- | ----------------------------------------------- |
| `side`  | `"top" \| "bottom"` | `"bottom"` | The side of the bubble to anchor the reactions. |
| `align` | `"start" \| "end"`  | `"end"`    | The inline alignment of the reactions.          |
| `class` | `string`            |            | Additional classes for the reaction row.        |

### Bubble.Group

Groups consecutive bubbles from the same sender.

| Prop    | Type     | Default | Description                            |
| ------- | -------- | ------- | -------------------------------------- |
| `class` | `string` |         | Additional classes for the group root. |
