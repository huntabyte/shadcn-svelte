---
title: Message Scroller
description: A chat scroll container that anchors turns, opens saved transcripts, follows streamed responses, loads history without jumping, and jumps to any message.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/message-scroller
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="message-scroller-demo" class="rounded-[34px] sm:rounded-4xl">

<div></div>

</ComponentPreview>

## What Makes a Great Streaming Chat Experience

Building a chat interface used to be simple. You create an inverted list with
an input. Type a message, it appends at the bottom. When a reply comes in, the
list grows and scrolls. Done.

Streaming breaks that model. Messages arrive in chunks while you may still be
reading, scrolling, or looking somewhere else entirely.

Now the challenge is preserving the reader's place while the conversation keeps
changing. Get that wrong and the experience feels jumpy: people are pulled to
the bottom, lose context, and have to find their way back.

In practice, this comes down to scroll: when to follow, when to hold, and when
to let the reader decide. A great streaming chat should:

1. **Move only when the reader asked to move.** If someone is reading, don’t pull them somewhere else. Auto-scroll should never be the default.
2. **Follow only while they’re following.** If they’re at the live edge, keep the stream in view. If they scroll away, leave them there.
3. **Every interaction is a signal.** Scrolling is not the only one. Selecting text, using the keyboard, opening a link, or searching should all stop the interface from moving.
4. **Start a new turn near the top of the viewport.** This gives the new turn somewhere it can be read from the beginning.
5. **Then stream in the answer.** The answer should grow into the screen, not immediately push everything away.
6. **Keep part of the previous conversation in context.** The prompt and reply should stay visually connected, and enough of the previous turn should remain visible so the reader knows where they are.
7. **Let new content arrive offscreen.** The conversation can keep streaming without changing what the reader is looking at.
8. **Show what’s happening out of view.** Make it clear when a response is still streaming or when new messages have arrived.
9. **Make it easy to return to the latest reply.** A “Jump to latest” action should bring the reader back and resume following.
10. **Let people jump anywhere in the conversation.** Long threads need message links, search, unread markers, and direct navigation.
11. **Reopen where the reader left off.** A saved conversation should open at the last meaningful turn. Often this is the last user message. Not the absolute bottom.
12. **Keep the reader’s place when layout changes.** Images load. Markdown expands. Code blocks render. Older messages appear above. None of that should make the reader lose their place.
13. **Handle interruptions without stealing position.** Stopping, retrying, regenerating, branching, or errors should not unexpectedly move the conversation.
14. **Stay responsive in long threads.** Streaming text, markdown, code, images, and long history should still feel responsive.
15. **Be accessible without the noise.** Keep the transcript navigable, preserve keyboard focus, and announce important events at a comfortable pace.

**Never move the reader against their intent.**

## MessageScroller

MessageScroller is a chat transcript scroller built for these behaviors.
`MessageScroller.Provider` owns the scroll state and transcript-row behavior:
opening position, streamed output, new-turn anchoring, prepended history,
visibility, and scroll controls. `MessageScroller.Root` is the styled frame that
renders inside it.

MessageScroller is scoped to the scroll viewport. It does not own messages, AI state,
transport, persistence, branching, or model state. Your product code stays
focused on composing messages, markers, tools, attachments, and prompt inputs.

It gives you the scroll behavior that chat needs, without taking over the rest
of the chat UI. And it stays fast, even in long conversations with rich
markdown.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="message-scroller" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `@shadcn-svelte/primitives`:

</Step>

<PMInstall command="@shadcn-svelte/primitives -D" />

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
  import * as Message from "$lib/components/ui/message/index.js";
  import * as MessageScroller from "$lib/components/ui/message-scroller/index.js";
</script>
```

```svelte showLineNumbers
<MessageScroller.Provider>
  <MessageScroller.Root>
    <MessageScroller.Viewport>
      <MessageScroller.Content>
        {#each messages as message (message.id)}
          <MessageScroller.Item
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message.Root />
          </MessageScroller.Item>
        {/each}
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
  </MessageScroller.Root>
</MessageScroller.Provider>
```

`MessageScroller` fills its parent, so place it inside a height-constrained
container.

```svelte showLineNumbers
<div class="flex h-screen flex-col">
  <MessageScroller.Provider>
    <MessageScroller.Root class="flex-1">
      <!-- transcript -->
    </MessageScroller.Root>
  </MessageScroller.Provider>
</div>
```

## Composition

```svelte showLineNumbers
<MessageScroller.Provider>
  <MessageScroller.Root>
    <MessageScroller.Viewport>
      <MessageScroller.Content>
        <MessageScroller.Item>
          <!-- a message, marker, or row -->
        </MessageScroller.Item>
        <MessageScroller.Item />
        <MessageScroller.Item />
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
  </MessageScroller.Root>
</MessageScroller.Provider>
```

- **`MessageScroller.Provider`** — the headless root. Owns scroll state and the behavior props for opening position, auto-scroll, anchoring, scroll commands, and visibility tracking.
- **`MessageScroller.Root`** — the styled frame. Lays out the viewport, content, and controls inside the provider.
- **`MessageScroller.Viewport`** — the scrollable element. Receives native scroll events and preserves the visible row when older messages are prepended.
- **`MessageScroller.Content`** — the transcript container. Holds the rows and provides the live-region defaults for new messages.
- **`MessageScroller.Item`** — the transcript row boundary. Wrap every direct child of the content so the scroller can measure, anchor, preserve position, track visibility, and jump to it. An item can be a message, marker, typing indicator, separator, join/leave event, or "load earlier" row.
- **`MessageScroller.Button`** — the scroll control. Scrolls to the start or end of the transcript and is inert until there is content in its direction.

## Core Concepts

### Anchoring Turns

A turn is the part of the conversation that starts a new exchange. In a simple
AI chat, that is usually the user's message and the assistant reply that follows.

An anchor is the row the viewport should treat as the start of that turn. Mark
that row with `scrollAnchor`. When a new anchor is appended, the viewport moves
it near the top and keeps a peek of the previous item above it, so the new turn
does not feel detached from its context.

```svelte showLineNumbers
<!-- This tells the scroller to anchor the user's message for the next turn. -->
<MessageScroller.Item
  messageId={message.id}
  scrollAnchor={message.role === "user"}
/>
```

Scroll anchors are not tied to message role. You can turn any row into an anchor:
a user message, a system marker, a handoff event, or anything else that starts a
meaningful turn. `MessageScroller` only needs to know which row should anchor the
viewport.

In the following example, the user's message is anchored. When you send a new message, the viewport anchors it near the top and appends the assistant reply below it. Toggle the anchor to the assistant's message to see the difference.

<ComponentPreview name="message-scroller-anchoring" class="rounded-[34px] sm:rounded-4xl">

<div></div>

</ComponentPreview>

### Group Chat

In a group chat, the turn boundary is more specific than "the user message". It is often
the message that asks the model to respond, or a marker like "Marcus joined the
chat". Typing indicators and history controls usually should not anchor.

Because anchoring is role-independent, you can anchor a marker just as easily as
a message.

```svelte showLineNumbers
<MessageScroller.Item messageId="marcus-joined" scrollAnchor>
  <Marker.Root variant="separator">
    <Marker.Content>Marcus joined the chat</Marker.Content>
  </Marker.Root>
</MessageScroller.Item>
```

<ComponentPreview name="message-scroller-group-chat" class="rounded-[34px] sm:rounded-4xl">

<div></div>

</ComponentPreview>

### Keeping Context Visible

When a new turn starts, it should still feel like part of the same continuous
thread. `scrollPreviousItemPeek` keeps a slice of the previous item visible
above the anchor, so the reader keeps their context instead of feeling like the
conversation restarted on a blank page.

```svelte showLineNumbers
<!-- Keep 64px of the previous turn visible above the newly anchored row. -->
<MessageScroller.Provider scrollPreviousItemPeek={64}>
  <MessageScroller.Root>
    <!-- anchored turns -->
  </MessageScroller.Root>
</MessageScroller.Provider>
```

Adjust the peek amount in the example below to see how it affects the conversation.

<ComponentPreview name="message-scroller-previous-context" class="rounded-[34px] sm:rounded-4xl">

<div></div>

</ComponentPreview>

### Following the Live Edge

When the reader is at the live edge, either because they stayed there or
returned there, `autoScroll` keeps streamed replies in view as they grow.
Scrolling away from the live edge releases the view, whether by wheel, touch,
keyboard scroll keys, or dragging the scrollbar. An explicit message jump
releases it too. New chunks can then arrive without moving the reader.

`autoScroll` composes with turn anchoring. When a new turn anchors near the
top, the view stays put while the reply streams into the room below it. Once
the reply fills the viewport, the reader is back at the live edge and
follow-output takes over from the anchor.

```svelte showLineNumbers
<MessageScroller.Provider autoScroll>
  <MessageScroller.Root>
    <!-- streamed turns -->
  </MessageScroller.Root>
</MessageScroller.Provider>
```

<ComponentPreview name="message-scroller-streaming" class="rounded-[34px] sm:rounded-4xl">

<div></div>

</ComponentPreview>

Calling `scrollToEnd`, or pressing `MessageScroller.Button`, re-engages
follow-output when `autoScroll` is enabled, so a reader who scrolled away can
return to the live edge and keep following. The root and viewport expose
`data-autoscrolling` while that programmatic scroll to the latest message runs,
so you can conditionally apply styles during the transition.

### Opening Saved Threads

It can seem reasonable to reopen a saved thread at the absolute end of the
transcript, but that often drops the reader into the conversation without enough
context. A better default is `"last-anchor"`: show the last meaningful turn,
like the user's latest message, with the reply below it.

That gives the reader an immediate place in the thread. They can see what they
asked, where the answer starts, and continue from there without reconstructing
the conversation from the bottom edge.

```svelte showLineNumbers
<MessageScroller.Provider defaultScrollPosition="last-anchor">
  <MessageScroller.Root>
    <!-- transcript -->
  </MessageScroller.Root>
</MessageScroller.Provider>
```

<ComponentPreview name="message-scroller-opening-position" class="rounded-[34px] sm:rounded-4xl" hideCode>

<div></div>

</ComponentPreview>

`"last-anchor"` is keyed on `scrollAnchor`, not message role. If no anchor
exists, or the last anchored turn already fits in the viewport, it falls back to
`"end"`.

Use `"start"` when you want to resume at the beginning of a conversation, or
`"end"` when the absolute latest message is the right place to land.

### Avoiding a Flash on Reload

A scroll container always opens at the top. HTML has no way to set `scrollTop`,
so a server-rendered transcript shows the oldest messages first. After
JavaScript runs, `defaultScrollPosition` moves the view, and you see a jump.

When `defaultScrollPosition` is `"end"` or `"last-anchor"`, the viewport has
`data-pending-scroll` until that position is applied. The styled viewport stays
hidden while the attribute is present, so you see the frame instead of the jump.
`"start"` does not need this.

If you want `"end"` visible on first paint, add an inline script right after the
viewport. Give the viewport an `id`, scroll it to the bottom, and remove
`data-pending-scroll`.

```svelte showLineNumbers
<script>
  const scrollToEndScript = `(function () {
    var viewport = document.getElementById("messages")
    if (!viewport) {
      return
    }
    viewport.scrollTop = viewport.scrollHeight
    viewport.removeAttribute("data-pending-scroll")
  })()`
</script>

<MessageScroller.Root>
  <MessageScroller.Viewport id="messages">
    <MessageScroller.Content>
      <!-- transcript -->
    </MessageScroller.Content>
  </MessageScroller.Viewport>
  {@html `<script>${scrollToEndScript}</script>`}
  <MessageScroller.Button />
</MessageScroller.Root>
```

Put the script in your page, not in the scroller. It only works for `"end"`, and
only when the messages are already in the HTML. If you use a Content Security Policy, pass a `nonce`.

Do not use this script with `"last-anchor"`. Skip it when messages load on the
client.

### Loading Earlier Messages

Loading earlier messages should not move the conversation the reader is already
looking at. When older rows are prepended above the current transcript,
`MessageScroller.Viewport` preserves the visible row so the reader stays in the
same place while history loads above them.

This is enabled by default through `preserveScrollOnPrepend`.

<ComponentPreview name="message-scroller-load-history" class="rounded-[34px] sm:rounded-4xl">

<div></div>

</ComponentPreview>

Use stable `messageId` values for message rows. That gives the scroller a
specific row to preserve instead of guessing from whichever pixel happens to sit
at the viewport edge.

### Animating New Messages

`MessageScroller.Item` can be animated directly. Keep `messageId` and `scrollAnchor`
on it, and use transform and opacity for the entrance.

A common chat pattern is to animate the user's message when it is sent, then let
the assistant reply stream into a regular row below it. Start the user row below
its final position so it feels like it rises from the live edge of the viewport.

```svelte showLineNumbers
<MessageScroller.Item
  class="animate-in fade-in slide-in-from-bottom-2 duration-300"
  messageId={message.id}
  scrollAnchor
/>
```

<ComponentPreview name="message-scroller-animation" class="rounded-[34px] sm:rounded-4xl">

<div></div>

</ComponentPreview>

Avoid animating height, margin, or padding for row entrances; those changes can
fight the scroller's positioning work. If the reader prefers reduced motion,
skip the entrance animation and keep the scroll behavior the same.

### Jumping to Messages

Search results, permalinks, outline items, and toolbar buttons often need to
drive the transcript from outside the message list. Use `useMessageScroller` for
those controls. Because the hooks read from `MessageScroller.Provider`, they work
in any component inside the provider, including controls rendered outside the
`MessageScroller.Root` frame.

```svelte showLineNumbers
<script lang="ts">
  import { useMessageScroller } from "$lib/components/ui/message-scroller/index.js";

  const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller();
</script>
```

<ComponentPreview name="message-scroller-commands" class="rounded-[34px] sm:rounded-4xl" hideCode>

<div></div>

</ComponentPreview>

`scrollToMessage` targets the `messageId` on `MessageScroller.Item`, so rows that
need to be addressable should have stable ids. `scrollToMessage` returns `false`
when the target is not mounted and cannot be queued.

`scrollToMessage` can queue a target before items exist, which covers
client-resolved permalinks while the transcript mounts. After rows have mounted,
a missing id returns `false` instead of starting a guessed retry loop. A `true`
result means the scroll ran or was queued, not that the row is already in view.

### Tracking the Reader's Position

Use `useMessageScrollerVisibility` to track the reader's position in the
conversation. A common example is a table-of-contents or a jump menu that
highlights the current anchored turn.

```svelte showLineNumbers
<script lang="ts">
  import { useMessageScrollerVisibility } from "$lib/components/ui/message-scroller/index.js";

  const visibility = useMessageScrollerVisibility();
</script>
```

<ComponentPreview name="message-scroller-visibility" class="rounded-[34px] sm:rounded-4xl" hideCode>

<div></div>

</ComponentPreview>

`currentAnchorId` answers "where am I" by reporting the current anchored turn,
and it stays set after that anchor scrolls above the viewport. `visibleMessageIds`
answers "what is on screen", in document order.

Visibility is pay-for-what-you-use. Tracking only runs while something
subscribes to `useMessageScrollerVisibility`, and rows need a `messageId` to
participate.

### Reading Scroll State

Use `useMessageScrollerScrollable` when you need scroll state in JavaScript, such
as a status indicator or a custom "jump to latest" control. It reports which
edges the viewport can still scroll toward; "at the start/end" is the negation
(`!start` / `!end`), and "scrollable at all" is `start || end`. For styling the
scroller itself, prefer the `data-scrollable` attribute.

```svelte showLineNumbers
<script lang="ts">
  import { useMessageScrollerScrollable } from "$lib/components/ui/message-scroller/index.js";

  const scrollable = useMessageScrollerScrollable();
</script>
```

<ComponentPreview name="message-scroller-scrollable" class="rounded-[34px] sm:rounded-4xl">

<div></div>

</ComponentPreview>

## Performance

`MessageScroller` is benchmarked against large transcripts with markdown and
composed message rows.

The scroll hot path stays outside of Svelte state: no transcript-row rerenders for
scroll, no forced layout on every scroll, and as little off-screen paint
work as the browser can avoid.

Scroll position, anchoring, and follow-output are tracked imperatively and mirrored onto the root and viewport through `data-*` attributes, so scrolling and streaming do not rerender transcript rows.

The styled `MessageScroller.Item` also ships with `content-visibility: auto` and
`contain-intrinsic-size`. Rows stay in the DOM for selection, copy,
find-in-page, SSR, and assistive tech, but the browser can skip rendering work
for rows far outside the viewport.

Visibility tracking is pay-for-what-you-use. A jump menu or active
turn indicator costs nothing until something subscribes to
`useMessageScrollerVisibility`.

This is comfortable for the expected range of a chat transcript: hundreds to low
thousands of turns, including messages with markdown and composed components.

## Virtualization

Virtualization is intentionally left outside the primitive. `MessageScroller`
renders real DOM rows and stays fast well into the thousands of turns (see
[Performance](#performance)), so most transcripts never need it.

When a transcript is large enough to need virtualization, use
`MessageScroller.Viewport` as the scroll element and let the virtualizer own the
rows.

```svelte showLineNumbers
<script lang="ts">
  import { useVirtualizer } from "@shadcn-svelte/primitives/svelte-virtual";
  import * as Message from "$lib/components/ui/message/index.js";
  import * as MessageScroller from "$lib/components/ui/message-scroller/index.js";

  let {
    messages,
  }: {
    messages: Array<{ id: string; content: import("svelte").Snippet }>;
  } = $props();

  let viewport = $state<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    get count() {
      return messages.length;
    },
    getScrollElement: () => viewport,
    estimateSize: () => 86,
    getItemKey: (index) => messages[index]?.id ?? index,
    overscan: 8,
  });
</script>

<MessageScroller.Provider>
  <MessageScroller.Root>
    <MessageScroller.Viewport bind:ref={viewport}>
      <MessageScroller.Content class="block min-h-full">
        <div class="relative w-full" style="height: {virtualizer.getTotalSize()}px">
          {#each virtualizer.getVirtualItems() as virtualItem (virtualItem.key)}
            {@const message = messages[virtualItem.index]}
            {#if message}
              <div
                data-index={virtualItem.index}
                class="absolute start-0 top-0 w-full"
                style="transform: translateY({virtualItem.start}px)"
                {@attach (node) => virtualizer.measureElement(node)}
              >
                <Message.Root>{@render message.content()}</Message.Root>
              </div>
            {/if}
          {/each}
        </div>
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
  </MessageScroller.Root>
</MessageScroller.Provider>
```

## Accessibility

`MessageScroller` keeps the scroll container keyboard reachable and the
transcript announceable without forcing a specific message UI.

`MessageScroller.Viewport` is a labelled, keyboard-focusable scroll region by
default. It uses `role="region"`, `aria-label="Messages"`, and `tabindex={0}`,
so keyboard users can focus the transcript and scroll it directly.

`MessageScroller.Content` marks the transcript as a live region with
`role="log"` and `aria-relevant="additions"`. New rows can be announced, but
streamed text mutations do not have to be announced token by token.

```svelte showLineNumbers
<MessageScroller.Content aria-busy={status === "streaming"}>
  <!-- messages -->
</MessageScroller.Content>
```

Pass `aria-busy` while a turn streams if announcements should wait for the
completed message row.

`MessageScroller.Button` renders a real button. When there is nothing to scroll
toward, it sets `inert`, uses `tabindex={-1}`, and exposes `data-active="false"`
so inactive scroll controls do not create extra focus stops.

## Unstyled

The behavior in `MessageScroller` comes from the `@shadcn-svelte/primitives` package. Import the
headless parts from `@shadcn-svelte/primitives/message-scroller` when you want your own markup
and styles.

## API Reference

The props, data attributes, and hooks for every part live on the unstyled
`MessageScroller` primitives in `@shadcn-svelte/primitives/message-scroller`. They are identical
for the styled component and the unstyled parts.
