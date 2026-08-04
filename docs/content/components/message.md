---
title: Message
description: Displays a message in a conversation, with optional avatar, header, footer, and alignment.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/message
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

The `Message` component lays out a single message in a conversation. It handles the avatar, alignment, header, and footer around the message surface.

For AI apps, render reasoning steps, tool calls, and assistant messages inside the `Message` component. Render the visible surface with [`Bubble`](/docs/components/bubble), and use [`Message Scroller`](/docs/components/message-scroller) around the transcript.

<ComponentPreview name="message-demo" previewClass="style-rhea theme-blue">

<div></div>

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add message
```

## Usage

```svelte
<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as Bubble from "$lib/components/ui/bubble/index.js";
  import * as Message from "$lib/components/ui/message/index.js";
</script>

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

## Composition

```text
Message.Root
├── Message.Avatar
└── Message.Content
    ├── Message.Header
    ├── Bubble.Root
    └── Message.Footer
```

Set `align="start"` or `align="end"` on `Message.Root`. End-aligned rows reverse the avatar and content and align footer actions to the message side.

Use `Message.Group` to stack consecutive messages from one sender. Render an empty `Message.Avatar` on earlier rows when you want them aligned with the avatar on the final row.

## Accessibility

`Message` is a presentational layout wrapper. Give icon-only actions in `Message.Footer` an `aria-label`. For an in-progress row, use [`Marker`](/docs/components/marker) with `role="status"` so assistive technology announces the update.
