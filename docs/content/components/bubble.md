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

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="bubble-demo">

<div></div>

</ComponentPreview>

The `Bubble` component displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions.

For full-featured chat interfaces, use the [`Message`](/docs/components/message) component. `Bubble` is intentionally scoped to the bubble surface. Place avatars, names, timestamps, metadata, and message-level actions in [`Message`](/docs/components/message).

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

```svelte showLineNumbers
<script lang="ts">
  import * as Bubble from "$lib/components/ui/bubble/index.js";
</script>
```

```svelte showLineNumbers
<Bubble.Root>
  <Bubble.Content>
    I checked the registry output and removed the stale route.
  </Bubble.Content>
  <Bubble.Reactions>
    <span>👍</span>
  </Bubble.Reactions>
</Bubble.Root>
```

## Composition

Use the following composition to build a bubble:

```text
Bubble.Root
├── Bubble.Content
└── Bubble.Reactions
```

Use `Bubble.Group` to group consecutive bubbles from the same sender:

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
- Polymorphic content via the `child` snippet for link and button bubbles
- Customizable styling through the `class` prop on every part

## Variants

Use `variant` to change the visual treatment of the bubble.

<ComponentPreview name="bubble-variants">

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

A bubble sizes to its content, up to 80% of the container width. The `ghost` variant removes the max-width so assistant text and rich content can span the full row.

## Alignment

Use `align` on `Bubble.Root` to align the bubble to the start or end of the conversation.

<ComponentPreview name="bubble-alignment">

<div></div>

</ComponentPreview>

| align   | Description                                        |
| ------- | -------------------------------------------------- |
| `start` | Align the bubble to the start of the conversation. |
| `end`   | Align the bubble to the end of the conversation.   |

**Note:** When building chat interfaces, you probably want to use alignment on the `Message` component itself, not the `Bubble` component.

## Bubble Group

Use `Bubble.Group` to group consecutive bubbles from the same sender. Note the `align` prop should be set on the `Bubble.Root` component itself, not the `Bubble.Group` component.

```text
Bubble.Group
├── Bubble.Root
│   └── Bubble.Content
└── Bubble.Root
    └── Bubble.Content
```

<ComponentPreview name="bubble-group-demo">

<div></div>

</ComponentPreview>

## Links and Buttons

You can turn a bubble into a link or button by using the `child` snippet on `Bubble.Content`.

<ComponentPreview name="bubble-link-button">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<script lang="ts">
  import * as Bubble from "$lib/components/ui/bubble/index.js";
</script>

<Bubble.Root variant="muted">
  <Bubble.Content>
    {#snippet child({ props })}
      <button {...props}>Click here</button>
    {/snippet}
  </Bubble.Content>
</Bubble.Root>
```

## Reactions

Use `Bubble.Reactions` for bubble reactions. You can use it to display reactions or quick action buttons. Use `side` and `align` to position the row. `side="top"` anchors it to the upper edge. Reactions overlap the bubble edge, so leave vertical space between rows. The examples below use a larger `gap` for this reason.

<ComponentPreview name="bubble-reactions">

<div></div>

</ComponentPreview>

## Show More / Collapsible

Long bubble content can be composed with [`Collapsible`](/docs/components/collapsible) to allow for a show more or show less interaction. Use the `Collapsible.Trigger` component to trigger the collapsible content.

<ComponentPreview name="bubble-collapsible">

<div></div>

</ComponentPreview>

## Tooltip

Wrap a bubble in a [`Tooltip`](/docs/components/tooltip) to reveal metadata on hover, such as when a message was read.

<ComponentPreview name="bubble-tooltip">

<div></div>

</ComponentPreview>

## Popover

Pair a bubble with a [`Popover`](/docs/components/popover) to surface more information on demand, such as the full error message for a failed action.

<ComponentPreview name="bubble-popover">

<div></div>

</ComponentPreview>

## Accessibility

`Bubble` renders the presentational message surface. Keep conversation-level semantics on the surrounding container and follow the guidelines below.

### Labeling Reactions

Reactions render as a row of emoji. A screen reader reads each glyph with no context, and counters like `+8` are announced as "plus eight". Group the row as a single image with a descriptive `aria-label` so it announces once. `role="img"` also hides the individual emoji from assistive tech, so no `aria-hidden` is needed.

```svelte showLineNumbers
<Bubble.Reactions
  role="img"
  aria-label="Reactions: thumbs up, fire, and 8 more"
>
  <span>👍</span>
  <span>🔥</span>
  <span>+8</span>
</Bubble.Reactions>
```

When reactions are interactive, render buttons instead and give icon-only buttons an `aria-label`.

```svelte showLineNumbers
<Bubble.Reactions>
  <Button aria-label="Thumbs up" variant="secondary" size="icon-xs">
    <ThumbsUpIcon />
  </Button>
</Bubble.Reactions>
```

### Interactive Bubbles

When a bubble is clickable, render it as a real `<button>` or `<a>` with the `child` snippet so it is focusable and exposes the correct role. `Bubble.Content` ships a visible focus ring for interactive elements, and the accessible name comes from the bubble text. No extra label is needed.

```svelte showLineNumbers
<Bubble.Root variant="muted" align="end">
  <Bubble.Content>
    {#snippet child({ props })}
      <button type="button" {...props} onclick={onReply}>
        I forgot my password
      </button>
    {/snippet}
  </Bubble.Content>
</Bubble.Root>
```

### Meaning Beyond Color

Bubble variants signal role and tone with color. Pair them with text, alignment, or icons so meaning is not conveyed by color alone. For a `destructive` bubble, keep the error context in the message text rather than relying on the color treatment.

## API Reference

### Bubble

The root bubble wrapper.

| Prop      | Type                                                                                       | Default     | Description                                      |
| --------- | ------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------ |
| `variant` | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` | The bubble visual treatment.                     |
| `align`   | `"start" \| "end"`                                                                         | `"start"`   | The inline alignment of the bubble.              |
| `class`   | `string`                                                                                   | -           | Additional classes to apply to the root element. |

### Bubble.Content

The bubble content wrapper.

| Prop    | Type      | Default | Description                                         |
| ------- | --------- | ------- | --------------------------------------------------- |
| `child` | `snippet` | -       | Render the content as the child element.            |
| `class` | `string`  | -       | Additional classes to apply to the content element. |

### Bubble.Reactions

Displays overlapped reactions for a bubble.

| Prop    | Type                | Default    | Description                                      |
| ------- | ------------------- | ---------- | ------------------------------------------------ |
| `side`  | `"top" \| "bottom"` | `"bottom"` | The side of the bubble to anchor the reactions.  |
| `align` | `"start" \| "end"`  | `"end"`    | The inline alignment of the reactions.           |
| `class` | `string`            | -          | Additional classes to apply to the reaction row. |

### Bubble.Group

Groups consecutive bubbles from the same sender.

| Prop    | Type     | Default | Description                                    |
| ------- | -------- | ------- | ---------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the group root. |
