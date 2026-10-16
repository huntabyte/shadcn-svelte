---
title: Prompt Input
description: A message field with attachments and a send button.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="prompt-input-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Prompt Input is the field the person types into to message the agent. It is an [Input Group](/docs/components/input-group) with a textarea, an attach button, the [Model Selector](/docs/ai-elements/model-selector) menus and a send button. Attached files show as [Attachment](/docs/components/attachment) chips above the text.

## Installation

Prompt Input is built with the [Input Group](/docs/components/input-group), [Attachment](/docs/components/attachment) and [Dropdown Menu](/docs/components/dropdown-menu) components.

<PMAddComp name="input-group attachment dropdown-menu" />

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
</script>
```

```svelte showLineNumbers
<form bind:this={form} onsubmit={onSubmit}>
  <InputGroup.Root>
    <InputGroup.Textarea
      bind:value={text}
      placeholder="Ask the agent to change your code..."
      class="p-3"
    />
    <InputGroup.Addon align="block-end">
      <InputGroup.Button
        size="icon-sm"
        variant="outline"
        class="rounded-full"
        aria-label="Attach files"
        onclick={() => input?.click()}
      >
        <PlusIcon />
      </InputGroup.Button>
      <InputGroup.Button
        type="submit"
        size="icon-sm"
        variant="default"
        class="ml-auto rounded-full"
        disabled={!canSend}
        aria-label="Send"
      >
        <ArrowUpIcon />
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>
</form>
```

## Attachments

The attach button opens a hidden file input. Show each file as an [Attachment](/docs/components/attachment) in an addon with `align="block-start"`, with a button to remove it.

## Model and Effort

Put the two [Model Selector](/docs/ai-elements/model-selector) menus in the `block-end` addon, between the attach and send buttons. Move `ml-auto` from the send button to the first menu trigger, so both menus sit next to the send button.

## Keyboard

Enter sends the message. Shift+Enter adds a new line.

```svelte showLineNumbers
onkeydown={(event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form?.requestSubmit();
  }
}}
```

## AI SDK

Send the text and the `FileList` from the file input.

```ts showLineNumbers
chat.sendMessage({ text, files });
```

The route streams the reply with `result.toUIMessageStreamResponse()`.
