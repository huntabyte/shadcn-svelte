---
title: October 2026 - Components for Chat Interfaces
description: MessageScroller, Message, Bubble, Attachment, and Marker. Components for building chat interfaces.
date: 2026-10-04
---

<script>
  import ComponentPreview from "$lib/components/component-preview.svelte";
  import Button from "$lib/registry/ui/button/button.svelte";
</script>

<ComponentPreview previewStyle="rhea" name="message-scroller-demo" class="rounded-[34px] sm:rounded-4xl" previewClassName="h-auto theme-blue bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16">

<div></div>

</ComponentPreview>

Today, we’re releasing a new set of components for building chat interfaces:
[**MessageScroller**](/docs/components/message-scroller),
[**Message**](/docs/components/message), [**Bubble**](/docs/components/bubble),
[**Attachment**](/docs/components/attachment), and
[**Marker**](/docs/components/marker).

This is the first phase of the chat components work. We’re taking it one piece at a time, reimagining the abstraction behind each part, and shipping them as shadcn-svelte components you can copy, compose, and adapt to your product.

We are starting with the conversation layer: scrolling, message rows, bubbles, attachments, and markers.

We asked ourselves: what makes a great streaming chat experience? Then we abstracted the core rules into a set of primitives: `MessageScroller`.

```bash
npx shadcn-svelte@latest add message-scroller message bubble attachment marker
```

## MessageScroller

`MessageScroller` is the scroll container for a conversation. It handles the
parts that are easy to get wrong: anchored turns, streamed replies, saved thread
restore, prepended history, jump-to-message, scroll controls, and visibility
tracking.

`MessageScroller` owns that behavior without owning your messages, AI state,
transport, persistence, or model state. You bring the content renderer.

The `MessageScroller` is also available as an unstyled headless component in `@shadcn-svelte/primitives`.

## Message, Bubble, Attachment, and Marker

The rest of the components cover the everyday pieces you need around the
scroller.

- `Message` lays out a row in the conversation with avatar, alignment, header,
  content, footer, and grouped messages.
- `Bubble` renders the message surface, with variants, alignment, reactions,
  links, buttons, and collapsible content.
- `Attachment` renders files and images with media, metadata, upload state,
  actions, and a full-card trigger that keeps actions separately clickable.
- `Marker` renders status updates, system notes, bordered rows, and labeled
  separators for things like streaming state, tool activity, and date breaks.

They are intentionally small. Compose them together for AI chats, support
inboxes, team threads, group chats, and product-specific conversations.

## scroll-fade and shimmer

We also added two new CSS utilities for the details that make chat interfaces
feel better.

[`scroll-fade`](/docs/utils/scroll-fade) adds scroll-aware edge fades to scroll
containers. Use it on `MessageScroller`, `ScrollArea`, attachment rows, and any
long list where you want to hint at more content without adding overlays or
scroll listeners.

<ComponentPreview previewStyle="rhea" name="scroll-fade-demo" class="rounded-2xl" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

[`shimmer`](/docs/utils/shimmer) adds a text shimmer for live status. Use it
for things like "Thinking…", "Generating response…", running tools, and
streaming markers.

<ComponentPreview previewStyle="rhea" name="shimmer-demo" class="rounded-2xl" previewClassName="h-72 min-h-0">

<div></div>

</ComponentPreview>

Both utilities ship with `shadcn-svelte/tailwind.css`, so projects initialized with
`npx shadcn-svelte@latest init` already have them.

## @shadcn-svelte/primitives

We also created `@shadcn-svelte/primitives`, a new package for unstyled, headless Svelte
components.

The first primitive is `@shadcn-svelte/primitives/message-scroller`. The registry component
wraps it with shadcn-svelte styles, but the scroll behavior lives in the package:
anchoring, auto-follow, prepend preservation, scroll commands, and visibility.

This lets us ship behavior without locking it to a visual style. You still get
copy-and-paste components that match your project, and the hard interaction
logic stays tested in one place.

Available now for Svelte across all eight styles.

## AI Elements

These components complement [Svelte AI Elements](https://svelte-ai-elements.vercel.app/),
the Svelte port of AI Elements. You can keep using its components for conversations,
messages, prompt inputs, and other AI interface patterns while adopting the new
shadcn-svelte chat components one piece at a time.

If you already use Svelte AI Elements, you do not need to rewrite your app. Keep
what works, and try the shadcn-svelte components when their abstractions or styling
fit your project.

The goal is to make these pieces easy to adopt independently. Replace one part,
compose it with what you already have, and keep building.

<Button size="sm" href="/docs/components" class="mt-6 no-underline!">
  View Components
</Button>
