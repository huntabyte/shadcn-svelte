---
title: Message
description: Displays a message in a conversation, with optional avatar, header, footer, and alignment.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/message
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

<ComponentPreview name="message-demo">

<div></div>

</ComponentPreview>

The `Message` component lays out a single message in a conversation. It handles the avatar, alignment, header, and footer around the message surface.

For AI apps, you can render reasoning steps, tool calls and assistant messages using the `Message` component.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="message" />
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
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as Bubble from "$lib/components/ui/bubble/index.js";
  import * as Message from "$lib/components/ui/message/index.js";
</script>
```

```svelte showLineNumbers
<Message.Root>
  <Message.Avatar>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
  </Message.Avatar>
  <Message.Content>
    <Bubble.Root>
      <Bubble.Content>How can I help you today?</Bubble.Content>
    </Bubble.Root>
  </Message.Content>
</Message.Root>
```

**Note:** `Message` owns the row layout—avatar, alignment, header, and footer.
Render the visible message surface inside it with
[`Bubble`](/docs/components/bubble).

## Composition

Use the following composition to build a message:

```text
Message.Root
├── Message.Avatar
└── Message.Content
    ├── Message.Header
    ├── Bubble.Root
    └── Message.Footer
```

Use `Message.Group` to stack consecutive messages from the same sender:

```text
Message.Group
├── Message.Root
└── Message.Root
```

## Features

- Start and end alignment for sender and receiver rows via the `align` prop
- Avatar slot that anchors to the bottom of the message and stays clear of the footer
- Header and footer slots for sender names, status, and message actions
- Footer follows the message side; actions stay aligned on `align="end"` rows
- Group wrapper for stacking consecutive messages from the same sender
- Customizable styling through the `class` prop on every part

## Avatar

Use `Message.Avatar` to render an avatar next to the message. Set `align="end"` on the message to align the avatar to the end of the message.

<ComponentPreview name="message-avatar">

<div></div>

</ComponentPreview>

| align   | Description                                         |
| ------- | --------------------------------------------------- |
| `start` | Align the message to the start of the conversation. |
| `end`   | Align the message to the end of the conversation.   |

## Group

Use `Message.Group` to stack consecutive messages from the same sender. Render an empty `Message.Avatar` on the earlier messages to keep them aligned with the avatar on the last one.

<ComponentPreview name="message-group">

<div></div>

</ComponentPreview>

## Header and Footer

Use `Message.Header` for a sender name and `Message.Footer` for metadata such as a delivery or read status.

<ComponentPreview name="message-header-footer">

<div></div>

</ComponentPreview>

## Actions

Place message-level actions in `Message.Footer`, such as copy, retry, or feedback buttons.

<ComponentPreview name="message-actions">

<div></div>

</ComponentPreview>

## Attachment

<ComponentPreview name="message-attachment">

<div></div>

</ComponentPreview>

## Accessibility

`Message` is a presentational layout wrapper. Accessibility comes from the content you place inside it.

### Label icon-only actions

Action buttons in `Message.Footer` are usually icon-only, so give each one an `aria-label`.

```svelte showLineNumbers
<Message.Footer>
  <Button variant="ghost" size="icon" aria-label="Copy">
    <CopyIcon />
  </Button>
</Message.Footer>
```

### Status updates

For in-progress messages, use a [`Marker`](/docs/components/marker) with `role="status"` so assistive tech announces the update as it appears.

```svelte showLineNumbers
<Message.Root>
  <Marker.Root role="status">
    <Marker.Icon>
      <Spinner />
    </Marker.Icon>
    <Marker.Content>Checking the logs...</Marker.Content>
  </Marker.Root>
</Message.Root>
```

## API Reference

### Message

The message row wrapper.

| Prop    | Type               | Default   | Description                                       |
| ------- | ------------------ | --------- | ------------------------------------------------- |
| `align` | `"start" \| "end"` | `"start"` | The alignment of the message in the conversation. |
| `class` | `string`           | -         | Additional classes to apply to the row.           |

### Message.Group

Groups consecutive messages from the same sender.

| Prop    | Type     | Default | Description                                    |
| ------- | -------- | ------- | ---------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the group root. |

### Message.Avatar

The avatar slot, aligned to the bottom of the message. When the message has a `Message.Footer`, the avatar shifts up to stay aligned with the message surface instead of the footer.

| Prop    | Type     | Default | Description                                     |
| ------- | -------- | ------- | ----------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the avatar slot. |

### Message.Content

Wraps the header, message surface, and footer.

| Prop    | Type     | Default | Description                                      |
| ------- | -------- | ------- | ------------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the content slot. |

### Message.Header

Displays content above the message, such as a sender name. Stays aligned to the start regardless of `align`.

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the header. |

### Message.Footer

Displays content below the message, such as status or actions. Aligns to the message side.

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the footer. |
