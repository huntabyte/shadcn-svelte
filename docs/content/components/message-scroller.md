---
title: Message Scroller
description: A chat scroll container that anchors turns, follows streamed responses, loads history without jumping, and jumps to any message.
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

<ComponentPreview name="message-scroller-demo">

<div></div>

</ComponentPreview>

`MessageScroller` is a chat transcript scroller built for streaming chat behavior: opening position, streamed output, new-turn anchoring, prepended history, visibility, and scroll controls.

It is scoped to the scroll viewport. It does not own messages, AI state, transport, persistence, branching, or model state. Your product code can stay focused on composing messages, markers, tools, attachments, prompt inputs, and `@ai-sdk/svelte` state.

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
          <MessageScroller.Item scrollAnchor={message.role === "user"}>
            <Message.Root align={message.role === "user" ? "end" : "start"} />
          </MessageScroller.Item>
        {/each}
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
  </MessageScroller.Root>
</MessageScroller.Provider>
```

`MessageScroller` fills its parent, so place it inside a height-constrained container.

## Core Concepts

### Anchoring Turns

A turn is the part of the conversation that starts a new exchange. In a simple AI chat, that is usually the user's message and the assistant reply that follows.

Mark that row with `scrollAnchor` so the row is identified as the start of a meaningful turn.

### Following the Live Edge

Use `MessageScroller.Button` to let the reader return to the latest message. The local Svelte component scrolls the nearest `MessageScroller.Viewport` to the requested edge and exposes state through data attributes for styling.

### Loading Earlier Messages

Loading earlier messages should not move the conversation the reader is already looking at. Keep each row keyed with a stable message id in your `{#each}` block.

### Accessibility

The transcript should be keyboard reachable and announce new rows without announcing every streamed token. Set `aria-busy` while a turn streams if announcements should wait for the completed message row.

## API Reference

### MessageScroller.Provider

The headless root for scroll state and transcript-row behavior.

### MessageScroller.Root

The styled frame for the viewport, content, and controls.

### MessageScroller.Viewport

The scrollable element.

### MessageScroller.Content

The transcript container.

### MessageScroller.Item

Wraps each direct child of the transcript. Set `scrollAnchor` on rows that start a meaningful turn.

### MessageScroller.Button

The scroll control for returning to the latest message.
