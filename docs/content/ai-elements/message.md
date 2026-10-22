---
title: Message
description: One turn. The person's message, and the agent's reply with its actions.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="message-pattern" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Use Message for one turn in a thread. The person's text is a [Bubble](/docs/components/bubble) on a [Message](/docs/components/message) with `align="end"`. The agent's reply is markdown on a Message, with actions under it. A thread of these turns is [Chat](/docs/ai-elements/chat).

## Installation

Message is built with the [Message](/docs/components/message), [Bubble](/docs/components/bubble), and [Tooltip](/docs/components/tooltip) components.

<PMAddComp name="message bubble tooltip" />

## Usage

```svelte showLineNumbers
<script lang="ts">
  import CopyIcon from "@lucide/svelte/icons/copy";
  import * as Bubble from "$lib/components/ui/bubble/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Message from "$lib/components/ui/message/index.js";
</script>
```

```svelte showLineNumbers
<Message.Root align="end">
  <Message.Content>
    <Bubble.Root align="end" variant="muted">
      <Bubble.Content>How do I add a settings dialog?</Bubble.Content>
    </Bubble.Root>
  </Message.Content>
</Message.Root>
<Message.Root>
  <Message.Content class="gap-2">
    <p>Install Dialog, then open it from the gear button.</p>
    <Message.Footer>
      <Button variant="ghost" size="icon-sm" aria-label="Copy">
        <CopyIcon />
      </Button>
    </Message.Footer>
  </Message.Content>
</Message.Root>
```

See [Message](/docs/components/message).

## Actions

Put actions in `Message.Footer`. It follows the message alignment, so on the person's turn the actions sit on the right. Use ghost icon buttons with a tooltip for each.

- **Copy** writes the reply to the clipboard and swaps to a check for two seconds.
- **Good response** and **Bad response** are toggles. Set `aria-pressed` so screen readers announce the state.
- **Retry** runs the turn again.
- **Edit** on the person's turn puts the text back in the field.

## Markdown

The reply streams as markdown. Render it with [svelte-streamdown](https://github.com/beynar/svelte-streamdown) and route fenced code to a [Code Block](/docs/components/code-block#markdown), so code in the reply gets line numbers and a copy button.

## AI SDK

Branch on the message role. The person's turn is the bubble. The agent's turn is the reply, and `chat.regenerate` with the message id runs it again.

```svelte showLineNumbers
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";

  const chat = new Chat({});
</script>

{#each chat.messages as message (message.id)}
  {#if message.role === "user"}
    <Message.Root align="end">
      <Message.Content>
        <Bubble.Root align="end" variant="muted">
          <Bubble.Content>{getMessageText(message)}</Bubble.Content>
        </Bubble.Root>
      </Message.Content>
    </Message.Root>
  {:else}
    <Message.Root>
      <Message.Content class="gap-2">
        <Streamdown content={getMessageText(message)} />
        <Message.Footer>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Retry"
            onclick={() => chat.regenerate({ messageId: message.id })}
          >
            <RefreshCcwIcon />
          </Button>
        </Message.Footer>
      </Message.Content>
    </Message.Root>
  {/if}
{/each}
```
