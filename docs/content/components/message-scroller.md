---
title: Message Scroller
description: A chat scroll container that anchors turns, opens saved transcripts, follows streamed responses, loads history without jumping, and jumps to any message.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/message-scroller
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

`MessageScroller` owns transcript scroll behavior without owning your messages, transport, persistence, or AI state. It follows streamed output only while the reader is following, anchors new turns near the top, preserves position when history is prepended, and supports message jumps.

<ComponentPreview name="message-scroller-demo" class="rounded-[34px] sm:rounded-4xl" previewClass="style-rhea theme-blue h-auto bg-surface p-4! min-[480px]:p-8! min-[560px]:p-10! sm:px-10! sm:py-16! dark:bg-background">

<div></div>

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add message-scroller
```

## Usage

```svelte
<script lang="ts">
  import * as MessageScroller from "$lib/components/ui/message-scroller/index.js";
</script>

<MessageScroller.Provider autoScroll defaultScrollPosition="last-anchor">
  <MessageScroller.Root>
    <MessageScroller.Viewport>
      <MessageScroller.Content>
        {#each messages as message (message.id)}
          <MessageScroller.Item
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <!-- message, marker, or other transcript row -->
          </MessageScroller.Item>
        {/each}
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
  </MessageScroller.Root>
</MessageScroller.Provider>
```

The root fills its parent, so use a height-constrained layout.

```svelte
<div class="flex h-screen flex-col">
  <MessageScroller.Provider>
    <MessageScroller.Root class="flex-1">...</MessageScroller.Root>
  </MessageScroller.Provider>
</div>
```

## Anchoring turns

Mark the row that starts a meaningful turn with `scrollAnchor`. When a new anchor is appended, the viewport positions it near the top and keeps part of the previous row visible.

```svelte
<MessageScroller.Item
  messageId={message.id}
  scrollAnchor={message.role === "user"}
>
  ...
</MessageScroller.Item>
```

Anchors are role-independent: a message, system marker, handoff, or join event can start a turn. Change the previous-context amount with `scrollPreviousItemPeek` on the provider.

## Following streamed output

`MessageScroller` does not generate or transport text. Your chat state must append the assistant row and update its text as chunks arrive; the scroller observes those layout changes. With `autoScroll`, streamed content stays visible only while the reader remains at the live edge. Wheel, touch, keyboard scrolling, scrollbar dragging, and explicit message jumps release follow mode. Calling `scrollToEnd` or activating the end button resumes it.

The root and viewport expose `data-autoscrolling` during a programmatic jump and `data-scrollable="start end"` for styling.

## Opening saved transcripts

`defaultScrollPosition` accepts:

- `last-anchor`: open at the last meaningful turn, falling back to the end when that turn fits.
- `end`: open at the absolute latest content.
- `start`: open at the beginning.

## Loading earlier messages

`MessageScroller.Viewport` preserves the first visible stable `messageId` when older rows are prepended. This behavior is enabled by default; set `preserveScrollOnPrepend={false}` to disable it.

## Commands

Call `useMessageScroller` inside the provider:

```svelte
<script lang="ts">
  import { useMessageScroller } from "$lib/components/ui/message-scroller/index.js";

  const scroller = useMessageScroller();

  function openResult(id: string) {
    scroller.scrollToMessage(id, {
      align: "center",
      behavior: "smooth",
      scrollMargin: 16,
    });
  }
</script>
```

`scrollToMessage`, `scrollToStart`, and `scrollToEnd` return whether the command ran or was queued. A message jump can be queued before the initial transcript mounts; after rows exist, an unknown id returns `false`.

## Scroll and visibility state

```svelte
<script lang="ts">
  import {
    useMessageScrollerScrollable,
    useMessageScrollerVisibility,
  } from "$lib/components/ui/message-scroller/index.js";

  const scrollable = useMessageScrollerScrollable();
  const visibility = useMessageScrollerVisibility();
</script>
```

- `scrollable.start` and `scrollable.end` report hidden content in either direction.
- `visibility.visibleMessageIds` contains visible stable ids in document order.
- `visibility.currentAnchorId` reports the current anchored turn and remains set after its anchor scrolls above the viewport.

## Provider API

| Prop                     | Default | Description                                              |
| ------------------------ | ------- | -------------------------------------------------------- |
| `autoScroll`             | `false` | Follow output while the reader stays at the live edge.   |
| `defaultScrollPosition`  | `end`   | Initial `start`, `end`, or `last-anchor` position.       |
| `scrollEdgeThreshold`    | `8`     | Pixel tolerance used for edge detection.                 |
| `scrollPreviousItemPeek` | `64`    | Previous-row context kept above an anchored turn.        |
| `scrollMargin`           | `0`     | Default aligned-edge margin for commands and visibility. |

`MessageScroller.Button` accepts `direction="start | end"`, `behavior`, button `variant` and `size`, and a `child` snippet. It becomes inert and leaves the tab order when no content exists in its direction.

## Accessibility

The viewport defaults to a labelled, focusable `role="region"`. Content defaults to `role="log"` and `aria-relevant="additions"`. Set `aria-busy={status === "streaming"}` on `MessageScroller.Content` when announcements should wait for a completed streamed row.
