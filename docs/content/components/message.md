---
title: Message
description: Composes avatars, content, metadata, and bubbles into a chat message.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/message
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

<ComponentPreview name="message-demo" />

`Message` owns message-level layout. Compose one or more [`Bubble`](/docs/components/bubble) components inside `Message.Content`.

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
	<ComponentSource item={viewerData} data-llm-ignore />
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Bubble from "$lib/components/ui/bubble/index.js";
  import * as Message from "$lib/components/ui/message/index.js";
</script>

<Message.Root align="end">
  <Message.Content>
    <Bubble.Root>
      <Bubble.Content>Ready for review.</Bubble.Content>
    </Bubble.Root>
    <Message.Footer>Delivered</Message.Footer>
  </Message.Content>
</Message.Root>
```

## Composition

```text
Message.Group
└── Message.Root
    ├── Message.Avatar
    └── Message.Content
        ├── Message.Header
        ├── Bubble.Root
        └── Message.Footer
```

## Features

- Start and end alignment for incoming and outgoing messages
- Avatar, header, content, and footer slots
- Grouping for consecutive messages
- Composition with bubbles, attachments, actions, and status metadata
- Class overrides on every part

## Avatar

Place [`Avatar`](/docs/components/avatar) inside `Message.Avatar`. The avatar follows message alignment.

<ComponentPreview name="message-avatar" />

## Group

Use `Message.Group` for related or consecutive messages.

<ComponentPreview name="message-group" />

## Header and Footer

Use `Message.Header` for names or metadata above content and `Message.Footer` for timestamps, status, or actions below it.

<ComponentPreview name="message-header-footer" />

## Actions

Place message-level controls in `Message.Footer`.

<ComponentPreview name="message-actions" />

## Attachment

Compose [`Attachment`](/docs/components/attachment) alongside bubbles inside `Message.Content`.

<ComponentPreview name="message-attachment" />

## Accessibility

### Label icon-only actions

Give icon-only controls an `aria-label` that describes their action.

### Status updates

Use visible text for delivery and failure states. Add `role="status"` or an `aria-live` region when a status changes asynchronously.

## API Reference

### Message.Root

| Prop    | Type               | Default   |
| ------- | ------------------ | --------- |
| `align` | `"start" \| "end"` | `"start"` |
| `class` | `string`           |           |

### Message.Group

Groups related messages and accepts standard `<div>` attributes.

### Message.Avatar

Positions avatar content and accepts standard `<div>` attributes.

### Message.Content

Wraps bubbles, attachments, headers, and footers. It accepts standard `<div>` attributes.

### Message.Header

Displays sender information or metadata above content and accepts standard `<div>` attributes.

### Message.Footer

Displays status, timestamps, or actions below content and accepts standard `<div>` attributes.
