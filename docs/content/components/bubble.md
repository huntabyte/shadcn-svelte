---
title: Bubble
description: Displays conversational content in a message bubble. Supports variants, alignment, grouping, reactions, and collapsible content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/bubble
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

The `Bubble` component displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions.

For full-featured chat interfaces, use the [`Message`](/docs/components/message) component. `Bubble` is intentionally scoped to the bubble surface. Place avatars, names, timestamps, metadata, and message-level actions in `Message`.

<ComponentPreview name="bubble-demo" previewClass="style-rhea theme-blue">

<div></div>

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add bubble
```

## Usage

```svelte
<script lang="ts">
  import * as Bubble from "$lib/components/ui/bubble/index.js";
</script>

<Bubble.Root variant="secondary">
  <Bubble.Content>
    I checked the registry output and removed the stale route.
  </Bubble.Content>
  <Bubble.Reactions role="img" aria-label="Reaction: thumbs up">
    <span>👍</span>
  </Bubble.Reactions>
</Bubble.Root>
```

## Variants and alignment

`variant` accepts `default`, `secondary`, `muted`, `tinted`, `outline`, `ghost`, or `destructive`. A bubble sizes to its content up to 80% of the row; `ghost` can span the full row.

Set `align="start"` or `align="end"` on `Bubble.Root`. When a bubble is inside `Message.Root`, the message alignment also positions it automatically.

Use `Bubble.Group` to stack consecutive bubbles from the same sender.

## Links and buttons

Use the `child` snippet on `Bubble.Content` to render an interactive element with the correct native semantics and built-in focus styles.

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

## Reactions

`Bubble.Reactions` accepts `side="top | bottom"` and `align="start | end"`. Reactions overlap the bubble edge, so leave enough vertical space between rows.

For presentational emoji, announce the row once with `role="img"` and an `aria-label`. For interactive reactions, render buttons and label icon-only actions.
