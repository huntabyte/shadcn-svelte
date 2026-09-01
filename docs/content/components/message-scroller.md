---
title: Message Scroller
description: A chat scroll container that anchors turns, follows streamed responses, preserves history position, and jumps to messages.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/message-scroller
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

<ComponentPreview name="message-scroller-demo" />

## What Makes a Great Streaming Chat Experience

A useful chat scroller keeps the newest response visible while the reader is following along, stops moving when they scroll away, preserves position when history is prepended, and provides a clear way back to the live edge.

## MessageScroller

`MessageScroller` owns transcript scrolling and positioning. Message state, transport, persistence, and rendering stay in your application.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="message-scroller" />
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
  import * as MessageScroller from "$lib/components/ui/message-scroller/index.js";
</script>

<div class="h-96">
  <MessageScroller.Provider autoScroll>
    <MessageScroller.Root>
      <MessageScroller.Viewport>
        <MessageScroller.Content>
          {#each messages as message (message.id)}
            <MessageScroller.Item
              messageId={message.id}
              scrollAnchor={message.role === "user"}
            >
              <div>{message.text}</div>
            </MessageScroller.Item>
          {/each}
        </MessageScroller.Content>
      </MessageScroller.Viewport>
      <MessageScroller.Button />
    </MessageScroller.Root>
  </MessageScroller.Provider>
</div>
```

The root fills its parent, so give the parent a constrained height.

## Composition

```text
MessageScroller.Provider
└── MessageScroller.Root
    ├── MessageScroller.Viewport
    │   └── MessageScroller.Content
    │       └── MessageScroller.Item
    └── MessageScroller.Button
```

## Core Concepts

### Anchoring Turns

Set `scrollAnchor` on the item that begins a meaningful turn. Newly appended anchors settle near the top while retaining a peek of the previous item.

<ComponentPreview name="message-scroller-anchoring" />

### Group Chat

Anchors can be messages or system markers. This is useful when membership or status events begin a new section.

<ComponentPreview name="message-scroller-group-chat" />

### Keeping Context Visible

Use `scrollPreviousItemPeek` to control how much of the prior exchange remains visible above an anchor.

<ComponentPreview name="message-scroller-previous-context" />

### Following the Live Edge

Enable `autoScroll` to follow streamed content while the reader remains at the end. User scrolling disengages follow mode.

<ComponentPreview name="message-scroller-streaming" />

### Opening Saved Threads

Set `defaultScrollPosition` to `start`, `end`, or `last-anchor`.

<ComponentPreview name="message-scroller-opening-position" />

### Loading Earlier Messages

`MessageScroller.Viewport` preserves the first visible item when content is prepended by default.

<ComponentPreview name="message-scroller-load-history" />

### Animating New Messages

Apply entrance classes to `MessageScroller.Item`. The scroller continues to observe size changes while the animation runs.

<ComponentPreview name="message-scroller-animation" />

### Jumping to Messages

Call `useMessageScroller()` inside the provider to access `scrollToStart`, `scrollToEnd`, and `scrollToMessage`.

<ComponentPreview name="message-scroller-commands" />

```svelte
<script lang="ts">
  import { useMessageScroller } from "$lib/components/ui/message-scroller/index.js";

  const { scrollToMessage } = useMessageScroller();
</script>

<button onclick={() => scrollToMessage("message-42", { behavior: "smooth" })}>
  Jump to message
</button>
```

### Tracking the Reader's Position

`useMessageScrollerVisibility()` exposes the current anchor and visible message IDs.

<ComponentPreview name="message-scroller-visibility" />

### Reading Scroll State

`useMessageScrollerScrollable()` reports whether more content exists before or after the viewport.

<ComponentPreview name="message-scroller-scrollable" />

## Performance

`MessageScroller.Item` applies `content-visibility: auto` and an intrinsic size hint, allowing the browser to skip rendering off-screen message contents. Use stable `messageId` values and keyed each blocks.

## Virtualization

The component does not virtualize your data. For very large transcripts, pair it with a virtualizer and preserve stable message IDs and DOM order.

## Accessibility

`MessageScroller.Viewport` is a labeled, keyboard-focusable region. `MessageScroller.Content` is a live log with `aria-relevant="additions"` by default. The scroll button has an accessible label and leaves the tab order when its direction is unavailable.

## Unstyled

Layout and state are exposed through `data-slot`, `data-scrollable`, `data-autoscrolling`, `data-message-id`, and `data-scroll-anchor` attributes. Override classes on any part without changing controller behavior.

## API Reference

### MessageScroller.Provider

| Prop                     | Type                                | Default |
| ------------------------ | ----------------------------------- | ------- |
| `autoScroll`             | `boolean`                           | `false` |
| `defaultScrollPosition`  | `"start" \| "end" \| "last-anchor"` | `"end"` |
| `scrollEdgeThreshold`    | `number`                            | `8`     |
| `scrollPreviousItemPeek` | `number`                            | `64`    |
| `scrollMargin`           | `number`                            | `0`     |

### MessageScroller.Root

The positioned scroll container. It fills its parent and accepts standard `<div>` attributes.

### MessageScroller.Viewport

| Prop                      | Type      | Default      |
| ------------------------- | --------- | ------------ |
| `preserveScrollOnPrepend` | `boolean` | `true`       |
| `aria-label`              | `string`  | `"Messages"` |
| `role`                    | `string`  | `"region"`   |
| `tabindex`                | `number`  | `0`          |

### MessageScroller.Content

| Prop              | Type     | Default       |
| ----------------- | -------- | ------------- |
| `role`            | `string` | `"log"`       |
| `aria-relevant`   | `string` | `"additions"` |
| `spacerClassName` | `string` |               |

### MessageScroller.Item

| Prop           | Type      | Default |
| -------------- | --------- | ------- |
| `messageId`    | `string`  |         |
| `scrollAnchor` | `boolean` | `false` |
| `class`        | `string`  |         |

### MessageScroller.Button

| Prop        | Type               | Default       |
| ----------- | ------------------ | ------------- |
| `direction` | `"start" \| "end"` | `"end"`       |
| `behavior`  | `ScrollBehavior`   | `"smooth"`    |
| `variant`   | `ButtonVariant`    | `"secondary"` |
| `size`      | `ButtonSize`       | `"icon-sm"`   |
| `child`     | `Snippet`          |               |

### `useMessageScroller`

Returns `scrollToStart`, `scrollToEnd`, and `scrollToMessage`.

### `useMessageScrollerVisibility`

Returns `currentAnchorId` and `visibleMessageIds`.

### `useMessageScrollerScrollable`

Returns boolean `start` and `end` values.
