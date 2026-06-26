---
title: June 2026 - Components for Chat Interfaces
description: Message Scroller, Message, Bubble, Attachment, and Marker. Components for building chat interfaces.
date: 2026-06-26
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

<ComponentPreview name="message-scroller-demo" previewClassName="h-auto p-4 sm:p-8" />

Today, we're adding a new set of components for building chat interfaces:
[**Message Scroller**](/docs/components/message-scroller),
[**Message**](/docs/components/message), [**Bubble**](/docs/components/bubble),
[**Attachment**](/docs/components/attachment), and
[**Marker**](/docs/components/marker).

This is the first phase of the chat components work. We're taking it one piece
at a time, reimagining the abstraction behind each part, and shipping them as
shadcn-svelte components you can copy, compose, and adapt to your product.

We are starting with the conversation layer: scrolling, message rows, bubbles,
attachments, and markers.

```bash
npx shadcn-svelte@latest add message-scroller message bubble attachment marker
```

## Message Scroller

`MessageScroller` is the scroll container for a conversation. It handles the
viewport, transcript content, message rows, and scroll controls without owning
your messages, AI state, transport, persistence, or model state.

Bring your own data and rendering. If your chat is powered by the AI SDK, compose
these components with `@ai-sdk/svelte` state.

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

We also added two CSS utilities for the details that make chat interfaces feel
better.

`scroll-fade` adds scroll-aware edge fades to scroll containers. Use it on
`MessageScroller`, attachment rows, and any long list where you want to hint at
more content without adding overlays or scroll listeners.

`shimmer` adds a text shimmer for live status. Use it for things like
"Thinking...", "Generating response...", running tools, and streaming markers.

Both utilities ship with `shadcn-svelte/tailwind.css`, so projects initialized
with `npx shadcn-svelte@latest init` can use them.

## AI Elements

This does not replace [AI Elements](https://ai-sdk.dev/elements/overview). You
can keep using AI Elements for AI interface components and patterns. This
release brings the core pieces of chat into shadcn-svelte as local Svelte
components.

If you are already using a component from AI Elements, you do not need to
rewrite your app. Keep what works. Try the shadcn-svelte version when you want
copy-and-paste components that are easy to adapt in a Svelte project.

The goal is to make these pieces easy to adopt independently. Replace one part,
compose it with what you already have, and keep building.

<Button href="/docs/components" size="sm" class="mt-6 no-underline!">
	View Components
</Button>
