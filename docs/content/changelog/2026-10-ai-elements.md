---
title: October 2026 - Trace, Code Block and AI Elements
description: Two new components for the steps an agent takes and the code it writes, and AI Elements, patterns for agentic interfaces built from shadcn-svelte components.
date: 2026-10-14
---

<script>
  import ComponentPreview from "$lib/components/component-preview.svelte";
  import Button from "$lib/registry/ui/button/button.svelte";
</script>

Today, we are releasing two new components, [**Trace**](/docs/components/trace) and [**Code Block**](/docs/components/code-block), and [**AI Elements**](/docs/ai-elements), a set of patterns for agentic interfaces built from shadcn-svelte components.

Trace and Code Block are available for Svelte across all eight styles.

## Trace

`Trace` is a list of lines for the steps an agent takes. Each line has an icon, a title, and an optional description and status. A line can expand to show more detail, link to a page, or open a dialog or sheet, so every step looks and behaves the same in your interface.

<ComponentPreview previewStyle="rhea" name="trace-demo" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Reasoning, tool calls, sources, plans and subagent runs all have the same shape: something the agent did, and what happened. Trace gives those steps a shared composition:

- `running`, `error` and `pending` states, with a shimmer while a step runs.
- Lines that expand, link out, or open a dialog, sheet, drawer or popover.
- Nested lines, so a summary expands into steps and a step into its output.
- Examples for reasoning, tool and source parts from the AI SDK using `@ai-sdk/svelte`.
- Keyboard and screen reader support from the link or trigger that wraps each line.

```bash
npx shadcn-svelte@latest add trace
```

## Code Block

`CodeBlock` displays code, terminal output, logs and diffs. It has a header with a title and actions, line numbers, wrapping, diff and highlighted lines, and a small size for tool output in a Trace.

<ComponentPreview previewStyle="rhea" name="code-block-demo" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```bash
npx shadcn-svelte@latest add code-block
```

Syntax highlighting uses the separate `useHighlightedCode` hook, which is installed with `code-block`. Blocks that only show plain output can render it without highlighting.

## Building agentic interfaces

Trace and Code Block join the [components for chat interfaces](/docs/changelog/2026-10-chat-components) announced earlier this month. Together, they cover the pieces of an agentic interface:

- [Message Scroller](/docs/components/message-scroller) holds the thread. It anchors each turn, follows the reply while it streams and loads history without jumping.
- [Message](/docs/components/message) is one turn, with an avatar, a header and a footer for actions.
- [Bubble](/docs/components/bubble) holds what the person sends.
- [Trace](/docs/components/trace) shows the steps the agent takes inside a turn.
- [Code Block](/docs/components/code-block) shows the code, commands and output those steps produce.
- [Marker](/docs/components/marker) adds notes and dividers between turns.
- [Attachment](/docs/components/attachment) shows the files that come with a message.
- [Questionnaire](/docs/components/questionnaire) asks the person to clarify before the agent continues.

## AI Elements

[AI Elements](/docs/ai-elements) are patterns for agentic interfaces built from these components. There is no package to install. Each pattern is a Svelte composition you copy into your project, and the code is yours.

<ComponentPreview previewStyle="rhea" name="chat-demo" class="rounded-[34px] sm:rounded-4xl" previewClassName="h-auto theme-blue p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:pt-16 sm:pb-8 min-h-0">

<div></div>

</ComponentPreview>

There are 21 patterns, from [Chat](/docs/ai-elements/chat) and [Prompt Input](/docs/ai-elements/prompt-input) to [Reasoning](/docs/ai-elements/reasoning), [Tool](/docs/ai-elements/tool), [Plan](/docs/ai-elements/plan) and [Subagent](/docs/ai-elements/subagent). The AI SDK examples use `@ai-sdk/svelte`. The patterns read message parts, so you can also use them with another source of messages.

Every page is also available as Markdown, so you can point your coding agent at it:

```txt title="Prompt" prompt
Add the Reasoning pattern from https://shadcn-svelte.com/docs/ai-elements/reasoning.md to my Svelte chat.
```

## Using existing AI Elements components

If you already use [Svelte AI Elements](https://svelte-ai-elements.vercel.app/), you can keep the components in your project and adopt these patterns one at a time.

Each pattern page lists the shadcn-svelte components it uses and includes Svelte code and AI SDK message-part examples. Copy the pattern you need, then adapt your existing wrappers and message handling to its composition.

<Button size="sm" href="/docs/ai-elements" class="mt-6 no-underline!">
  Read the Docs
</Button>
