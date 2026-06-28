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
	import Step from "$lib/components/step.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="message-demo" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

The `Message` component lays out a single message in a conversation. It handles
the avatar, alignment, header, and footer around the message surface.

For AI apps, render reasoning steps, tool calls, assistant messages, and user
messages by composing `Message` with [`Bubble`](/docs/components/bubble),
[`Marker`](/docs/components/marker), and your application state from
`@ai-sdk/svelte`.

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

```svelte
<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as Bubble from "$lib/components/ui/bubble/index.js";
  import * as Message from "$lib/components/ui/message/index.js";
</script>
```

```svelte
<Message.Root>
  <Message.Avatar>
    <Avatar.Root>
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

## Composition

```text
Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    └── MessageFooter
```

Use `Message.Group` to stack consecutive messages from the same sender.

## Features

- Start and end alignment for inbound and outbound rows
- Avatar, content, header, and footer slots
- Footer-aware avatar positioning
- Works with `Bubble`, `Attachment`, and `Marker`
- Customizable styling through the `class` prop on every part

## Examples

### Avatar

Use `Message.Avatar` to render an avatar next to the message. Set `align="end"`
on the message to align the avatar to the end.

<ComponentPreview name="message-avatar" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Group

Use `Message.Group` to stack consecutive messages from the same sender.

<ComponentPreview name="message-group" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Header and Footer

Use `Message.Header` for a sender name and `Message.Footer` for metadata such
as a delivery or read status.

<ComponentPreview name="message-header-footer" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Actions

Place message-level actions in `Message.Footer`, such as copy, retry, or
feedback buttons.

<ComponentPreview name="message-actions" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

### Attachment

Attachments can be placed before or after the bubble in `Message.Content`.

<ComponentPreview name="message-attachment" previewClassName="h-auto theme-blue">

<div></div>

</ComponentPreview>

## Accessibility

`Message` is a presentational layout wrapper. Accessibility comes from the
content you place inside it.

### Label icon-only actions

Action buttons in `Message.Footer` are usually icon-only, so give each one an
`aria-label`.

```svelte
<Message.Footer>
  <Button aria-label="Copy" size="icon" variant="ghost">
    <CopyIcon />
  </Button>
</Message.Footer>
```

### Status updates

For live state such as typing or tool progress, compose `Message` with
[`Marker`](/docs/components/marker) and set the appropriate role on the marker.

```svelte
<Marker.Root role="status">
  <Marker.Content class="shimmer">Oliver is typing...</Marker.Content>
</Marker.Root>
```

## API Reference

### Message.Root

| Prop    | Type               | Default   | Description                                       |
| ------- | ------------------ | --------- | ------------------------------------------------- |
| `align` | `"start" \| "end"` | `"start"` | The alignment of the message in the conversation. |
| `class` | `string`           |           | Additional classes for the row.                   |

### Message.Group

Groups consecutive messages from the same sender.

| Prop    | Type     | Default | Description                            |
| ------- | -------- | ------- | -------------------------------------- |
| `class` | `string` |         | Additional classes for the group root. |

### Message.Avatar

The avatar slot, aligned to the bottom of the message.

| Prop    | Type     | Default | Description                             |
| ------- | -------- | ------- | --------------------------------------- |
| `class` | `string` |         | Additional classes for the avatar slot. |

### Message.Content

Wraps the header, message surface, and footer.

| Prop    | Type     | Default | Description                              |
| ------- | -------- | ------- | ---------------------------------------- |
| `class` | `string` |         | Additional classes for the content slot. |

### Message.Header

Displays content above the message, such as a sender name.

| Prop    | Type     | Default | Description                        |
| ------- | -------- | ------- | ---------------------------------- |
| `class` | `string` |         | Additional classes for the header. |

### Message.Footer

Displays content below the message, such as status or actions.

| Prop    | Type     | Default | Description                        |
| ------- | -------- | ------- | ---------------------------------- |
| `class` | `string` |         | Additional classes for the footer. |
