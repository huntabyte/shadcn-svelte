---
title: Message Scroller
description: A chat scroll container that anchors turns, opens saved transcripts, follows streamed responses, loads history without jumping, and jumps to any message.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="message-scroller-demo" class="rounded-[34px] sm:rounded-4xl" previewClassName="h-auto theme-blue bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16">

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

1. **Move only when the reader asked to move.** If someone is reading, don't pull them somewhere else. Auto-scroll should never be the default.
2. **Follow only while they're following.** If they're at the live edge, keep the stream in view. If they scroll away, leave them there.
3. **Every interaction is a signal.** Scrolling is not the only one. Selecting text, using the keyboard, opening a link, or searching should all stop the interface from moving.
4. **Start a new turn near the top of the viewport.** This gives the new turn somewhere it can be read from the beginning.
5. **Then stream in the answer.** The answer should grow into the screen, not immediately push everything away.
6. **Keep part of the previous conversation in context.** The prompt and reply should stay visually connected, and enough of the previous turn should remain visible so the reader knows where they are.
7. **Let new content arrive offscreen.** The conversation can keep streaming without changing what the reader is looking at.
8. **Show what's happening out of view.** Make it clear when a response is still streaming or when new messages have arrived.
9. **Make it easy to return to the latest reply.** A "Jump to latest" action should bring the reader back and resume following.
10. **Let people jump anywhere in the conversation.** Long threads need message links, search, unread markers, and direct navigation.
11. **Reopen where the reader left off.** A saved conversation should open at the last meaningful turn. Often this is the last user message. Not the absolute bottom.
12. **Keep the reader's place when layout changes.** Images load. Markdown expands. Code blocks render. Older messages appear above. None of that should make the reader lose their place.
13. **Handle interruptions without stealing position.** Stopping, retrying, regenerating, branching, or errors should not unexpectedly move the conversation.
14. **Stay responsive in long threads.** Streaming text, markdown, code, images, and long history should still feel responsive.
15. **Be accessible without the noise.** Keep the transcript navigable, preserve keyboard focus, and announce important events at a comfortable pace.

**Never move the reader against their intent.**

## MessageScroller

`MessageScroller` is a chat transcript scroller built for these behaviors. The
components give you the styled frame, scrollable viewport, transcript content,
row boundaries, and scroll control that chat interfaces need.

`MessageScroller` is scoped to the scroll viewport. It does not own messages, AI
state, transport, persistence, branching, or model state. Your product code
stays focused on composing messages, markers, tools, attachments, prompt
inputs, and `@ai-sdk/svelte` state.

It gives you the scroll structure that chat needs without taking over the rest
of the chat UI. The Svelte port keeps the higher-level anchoring decisions in
your product code: mark meaningful turns with `scrollAnchor`, use stable
`messageId` values for rows you need to address, and drive any programmatic
scroll positioning from your own state.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="message-scroller" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install the AI SDK package if your chat UI is powered by AI SDK state.

</Step>

<PMInstall command="@ai-sdk/svelte ai" />

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
  import { Chat } from "@ai-sdk/svelte";
  import * as Message from "$lib/components/ui/message/index.js";
  import * as MessageScroller from "$lib/components/ui/message-scroller/index.js";

  const chat = new Chat({});
</script>
```

```svelte
<MessageScroller.Provider>
  <MessageScroller.Root>
    <MessageScroller.Viewport>
      <MessageScroller.Content aria-busy={chat.status === "streaming"}>
        {#each chat.messages as message (message.id)}
          <MessageScroller.Item
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message.Root align={message.role === "user" ? "end" : "start"} />
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

```svelte
<div class="flex h-screen flex-col">
  <MessageScroller.Provider>
    <MessageScroller.Root class="flex-1">
      <!-- transcript -->
    </MessageScroller.Root>
  </MessageScroller.Provider>
</div>
```

## Composition

```svelte
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

- **`MessageScroller.Provider`** — the structural root. It wraps the scroller parts so composed controls can share the same subtree.
- **`MessageScroller.Root`** — the styled frame. Lays out the viewport, content, and controls.
- **`MessageScroller.Viewport`** — the scrollable element. Receives native scroll events and owns the scrolling surface.
- **`MessageScroller.Content`** — the transcript container. Holds the rows and can receive live-region attributes such as `aria-busy`.
- **`MessageScroller.Item`** — the transcript row boundary. Wrap every direct child of the content so the scroller can identify rows. An item can be a message, marker, typing indicator, separator, join/leave event, or "load earlier" row.
- **`MessageScroller.Button`** — the scroll control. Scrolls to the start or end of the transcript and is inactive until there is content in its direction.

## Core Concepts

### Anchoring Turns

A turn is the part of the conversation that starts a new exchange. In a simple
AI chat, that is usually the user's message and the assistant reply that
follows.

An anchor is the row the viewport should treat as the start of that turn. Mark
that row with `scrollAnchor`. In the Svelte component, `scrollAnchor` is exposed
as `data-scroll-anchor="true"` so your app can measure or scroll to meaningful
turns consistently.

```svelte
<MessageScroller.Item
  messageId={message.id}
  scrollAnchor={message.role === "user"}
>
  <!-- message -->
</MessageScroller.Item>
```

Scroll anchors are not tied to message role. You can turn any row into an
anchor: a user message, a system marker, a handoff event, or anything else that
starts a meaningful turn.

### Group Chat

In a group chat, the turn boundary is more specific than "the user message". It
is often the message that asks the model to respond, or a marker like "Marcus
joined the chat". Typing indicators and history controls usually should not
anchor.

Because anchoring is role-independent, you can anchor a marker just as easily as
a message.

```svelte
<MessageScroller.Item messageId="marcus-joined" scrollAnchor>
  <Marker.Root variant="separator">
    <Marker.Content>Marcus joined the chat</Marker.Content>
  </Marker.Root>
</MessageScroller.Item>
```

### Keeping Context Visible

When a new turn starts, it should still feel like part of the same continuous
thread. Keep a slice of the previous item visible above the anchor so the reader
keeps their context instead of feeling like the conversation restarted on a
blank page.

In the demo, that behavior is implemented in the example state layer by
scrolling the new user message into position and leaving a small peek of the
previous turn above it.

### Following the Live Edge

When the reader is at the live edge, either because they stayed there or
returned there, streamed replies should stay in view as they grow. Scrolling
away from the live edge releases the view. New chunks can then arrive without
moving the reader.

`MessageScroller.Button` lets the reader return to the latest message. Pressing
the button scrolls the nearest `MessageScroller.Viewport` to the requested edge.
The viewport exposes `data-autoscrolling` while that programmatic scroll is
running, so you can conditionally apply styles during the transition.

```svelte
<MessageScroller.Button />
```

Use `direction="start"` when you need a control that jumps toward the beginning
of the transcript.

```svelte
<MessageScroller.Button direction="start" />
```

### Opening Saved Threads

It can seem reasonable to reopen a saved thread at the absolute end of the
transcript, but that often drops the reader into the conversation without enough
context. A better default is to show the last meaningful turn, like the user's
latest message, with the reply below it.

That gives the reader an immediate place in the thread. They can see what they
asked, where the answer starts, and continue from there without reconstructing
the conversation from the bottom edge.

In Svelte, wire this from your own transcript state: choose the row you want to
open at, bind the viewport, and scroll that row into view after the messages
mount. Use `messageId` and `scrollAnchor` to make the target stable.

### Loading Earlier Messages

Loading earlier messages should not move the conversation the reader is already
looking at. When older rows are prepended above the current transcript, preserve
the visible row so the reader stays in the same place while history loads above
them.

Use stable `messageId` values for message rows. That gives your scroll logic a
specific row to preserve instead of guessing from whichever pixel happens to sit
at the viewport edge.

### Animating New Messages

`MessageScroller.Item` can be animated directly. Keep `messageId` and
`scrollAnchor` on it, and use transform and opacity for the entrance.

A common chat pattern is to animate the user's message when it is sent, then let
the assistant reply stream into a regular row below it. Start the user row below
its final position so it feels like it rises from the live edge of the viewport.

Avoid animating height, margin, or padding for row entrances; those changes can
fight the scroller's positioning work. If the reader prefers reduced motion,
skip the entrance animation and keep the scroll behavior the same.

### Jumping to Messages

Search results, permalinks, outline items, and toolbar buttons often need to
drive the transcript from outside the message list. Use the `messageId` on
`MessageScroller.Item` as the stable target for those controls.

```svelte
<MessageScroller.Item messageId={message.id}>
  <!-- message -->
</MessageScroller.Item>
```

Then scroll the matching row inside the viewport from your own command handler.

```ts
const target = viewport.querySelector(
  `[data-slot="message-scroller-item"][data-message-id="${CSS.escape(id)}"]`
);

target?.scrollIntoView({ block: "start", behavior: "smooth" });
```

### Tracking the Reader's Position

Use the row attributes to track where the reader is in the conversation. A
common example is a table-of-contents or a jump menu that highlights the current
anchored turn.

`data-scroll-anchor="true"` answers which rows are meaningful turn starts, and
`data-message-id` gives each visible row an addressable id.

### Reading Scroll State

Use the viewport's native scroll state when you need JavaScript state for a
custom "jump to latest" control. `MessageScroller.Button` does this internally:
it compares `scrollTop`, `scrollHeight`, and `clientHeight` and exposes
`data-active` based on whether there is content to scroll toward.

For styling the scroller itself, prefer the data attributes on the viewport and
button:

```svelte
<MessageScroller.Viewport class="data-autoscrolling:scrollbar-none">
  <!-- content -->
</MessageScroller.Viewport>
```

## Performance

`MessageScroller` is designed for large transcripts with markdown and composed
message rows.

The styled `MessageScroller.Item` ships with `content-visibility: auto` and
`contain-intrinsic-size`. Rows stay in the DOM for selection, copy,
find-in-page, SSR, and assistive tech, but the browser can skip rendering work
for rows far outside the viewport.

This is comfortable for the expected range of a chat transcript: hundreds to low
thousands of turns, including messages with markdown and composed components.

## Virtualization

Virtualization is intentionally left outside the primitive. `MessageScroller`
renders real DOM rows and stays fast well into the thousands of turns, so most
transcripts never need it.

When a transcript is large enough to need virtualization, use
`MessageScroller.Viewport` as the scroll element and let the virtualizer own the
rows.

```svelte
<MessageScroller.Provider>
  <MessageScroller.Root>
    <MessageScroller.Viewport bind:ref={viewportRef}>
      <MessageScroller.Content class="block min-h-full">
        <!-- virtualized rows -->
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
  </MessageScroller.Root>
</MessageScroller.Provider>
```

## Accessibility

`MessageScroller` keeps the scroll container keyboard reachable and the
transcript announceable without forcing a specific message UI.

`MessageScroller.Viewport` is the scroll region. Add an accessible label and
keyboard focus when the transcript needs to be directly reachable.

```svelte
<MessageScroller.Viewport role="region" aria-label="Messages" tabindex="0">
  <!-- content -->
</MessageScroller.Viewport>
```

`MessageScroller.Content` can mark the transcript as a live region with
`role="log"` and `aria-relevant="additions"`. New rows can be announced, but
streamed text mutations do not have to be announced token by token.

```svelte
<MessageScroller.Content
  role="log"
  aria-relevant="additions"
  aria-busy={status === "streaming"}
>
  <!-- messages -->
</MessageScroller.Content>
```

Pass `aria-busy` while a turn streams if announcements should wait for the
completed message row.

`MessageScroller.Button` renders a real button. When there is nothing to scroll
toward, it sets `data-active="false"` and uses pointer-event and opacity styles
so inactive scroll controls do not create extra interaction noise.

## Unstyled

The Svelte port ships as composable source components. To use the behavior with
your own markup and styles, copy the component into your project and adjust the
classes on the exported parts.

## API Reference

### MessageScroller.Provider

The structural root for the scroller subtree.

### MessageScroller.Root

The styled frame for the viewport, content, and controls.

| Prop    | Type                      | Default |
| ------- | ------------------------- | ------- |
| `ref`   | `HTMLDivElement`          | -       |
| `class` | `HTMLAttributes["class"]` | -       |

### MessageScroller.Viewport

The scrollable element.

| Prop    | Type                      | Default |
| ------- | ------------------------- | ------- |
| `ref`   | `HTMLDivElement`          | -       |
| `class` | `HTMLAttributes["class"]` | -       |

### MessageScroller.Content

The transcript container.

| Prop    | Type                      | Default |
| ------- | ------------------------- | ------- |
| `ref`   | `HTMLDivElement`          | -       |
| `class` | `HTMLAttributes["class"]` | -       |

### MessageScroller.Item

Wraps each direct child of the transcript.

| Prop           | Type                      | Default |
| -------------- | ------------------------- | ------- |
| `ref`          | `HTMLDivElement`          | -       |
| `messageId`    | `string`                  | -       |
| `scrollAnchor` | `boolean`                 | `false` |
| `class`        | `HTMLAttributes["class"]` | -       |

### MessageScroller.Button

The scroll control for returning to the latest message or jumping to the start.

| Prop        | Type                     | Default       |
| ----------- | ------------------------ | ------------- |
| `direction` | `"start" \| "end"`       | `"end"`       |
| `active`    | `boolean`                | derived       |
| `behavior`  | `ScrollBehavior`         | `"smooth"`    |
| `variant`   | `ButtonProps["variant"]` | `"secondary"` |
| `size`      | `ButtonProps["size"]`    | `"icon-sm"`   |
