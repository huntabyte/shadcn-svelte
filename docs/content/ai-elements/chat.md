---
title: Chat
description: The thread. Message Scroller keeps your place while the reply streams.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="chat-demo" class="rounded-[34px] sm:rounded-4xl" previewStyle="rhea" previewClassName="h-auto theme-blue p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:pt-16 sm:pb-8 min-h-0">

<div></div>

</ComponentPreview>

Chat is the thread of a conversation with the agent. Each turn is a [Message](/docs/ai-elements/message) inside [Message Scroller](/docs/components/message-scroller). The person's message is the scroll anchor, so a new question settles near the top and the reply streams in under it. The field is a [Prompt Input](/docs/ai-elements/prompt-input).

## Installation

Chat is built with the [Message Scroller](/docs/components/message-scroller), [Message](/docs/components/message), [Bubble](/docs/components/bubble), and [Input Group](/docs/components/input-group) components.

<PMAddComp name="message-scroller message bubble input-group" />

## Usage

```svelte showLineNumbers
<MessageScroller.Provider autoScroll>
  <MessageScroller.Root>
    <MessageScroller.Viewport>
      <MessageScroller.Content>
        <MessageScroller.Item messageId={id} scrollAnchor>
          <Message.Root align="end">
            <Message.Content>
              <Bubble.Root align="end" variant="muted">
                <Bubble.Content>{text}</Bubble.Content>
              </Bubble.Root>
            </Message.Content>
          </Message.Root>
        </MessageScroller.Item>
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
  </MessageScroller.Root>
</MessageScroller.Provider>
```

`scrollAnchor` goes on the person's turn. `autoScroll` follows the reply while the person stays at the live edge.

See [Message Scroller](/docs/components/message-scroller).

## AI SDK Helper

To build without a model, script the conversation with `createChat` from `@shadcn/helpers/ai-sdk`. Each agent turn streams reasoning, a tool call and a reply. `script.next()` fills the field with the next scripted message, and a string `fallback` replies once the script runs out.

```ts showLineNumbers
const script = createChat()
  .user("Add a dark mode toggle to the settings page.")
  .assistant(({ writer }) => {
    writer.reasoning("I need to know how themes are set up first.");
    writer
      .tool("runCommand", { input: { command: "rg -l ThemeProvider app" } })
      .output({ stdout: "app/layout.tsx" });
    writer.text("next-themes is already set up, so I added a ModeToggle.");
  });

const transport = script.transport({
  fallback:
    "This demo only knows the scripted turns. Press reset to start over.",
});

const chat = new Chat({ transport });
const nextMessage = $derived(script.next(chat.messages));
```
