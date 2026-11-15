---
title: Checkpoint
description: Marks a point in the conversation you can return to.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="checkpoint-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Checkpoint is a point in the conversation you can return to. It is a [Marker](/docs/components/marker) after a turn, with a Restore button. Restore keeps that turn and drops every message after it.

## Installation

Checkpoint is built with the [Marker](/docs/components/marker) and [Button](/docs/components/button) components.

<PMAddComp name="marker button" />

## Usage

Render a marker after the turn, with a button that restores it.

```svelte showLineNumbers
<Marker.Root variant="separator">
  <Marker.Content class="inline-flex items-center gap-2">
    {label}
    <Button size="xs" variant="outline" onclick={restore}>Restore</Button>
  </Marker.Content>
</Marker.Root>
```

See [Marker](/docs/components/marker#separator).

## AI SDK

Restore replaces the thread with the messages up to and including that turn. Every later turn is removed. Send a new message to continue from there.

```ts showLineNumbers
const index = chat.messages.findIndex((message) => message.id === messageId);
chat.messages = chat.messages.slice(0, index + 1);
```

## AI SDK Helper

To script a checkpoint with [`createChat`](https://ui.shadcn.com/docs/helpers/ai-sdk), write it as a data part on the agent's turn. Send the same `id` again only when you mean to update that checkpoint.

```ts showLineNumbers
const chat = createChat()
  .user("Rename the button component to action.")
  .assistant(({ writer }) => {
    writer.text("Renamed Button to Action in components/ui/button.tsx.");
    writer.data({
      type: "data-checkpoint",
      id: "rename",
      data: { label: "Button renamed" },
    });
  })
  .user("Update the docs to match.")
  .assistant(({ writer }) => {
    writer.text("Updated the Button page to say Action.");
  });
```
