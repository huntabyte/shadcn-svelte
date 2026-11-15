---
title: AI Elements
description: Patterns for agentic interfaces, built from shadcn-svelte components.
---

<script>
	import LinkedCard from "$lib/components/linked-card.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

AI Elements are patterns for building agentic interfaces. Each one is a composition of shadcn-svelte components that you copy into your project. There is no package to install. The code is yours.

A [Chat](/docs/ai-elements/chat) is a list of [Message](/docs/ai-elements/message) turns inside a [Message Scroller](/docs/components/message-scroller). The steps an agent takes inside a turn, like [Reasoning](/docs/ai-elements/reasoning), [Tool](/docs/ai-elements/tool) and [Plan](/docs/ai-elements/plan), are built on [Trace](/docs/components/trace), so every step has the same shape.

The examples use [`@ai-sdk/svelte`](https://ai-sdk.dev/docs/getting-started/svelte). The patterns only read message parts, so they work with any source of messages.

## Patterns

<div class="mt-6 grid gap-4 sm:grid-cols-2">
  <LinkedCard href="/docs/ai-elements/chain-of-thought" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Chain of Thought</div>
    <div class="leading-relaxed text-muted-foreground">A summary that expands into the steps an agent took.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/chat" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Chat</div>
    <div class="leading-relaxed text-muted-foreground">The thread. Message Scroller keeps your place while the reply streams.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/checkpoint" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Checkpoint</div>
    <div class="leading-relaxed text-muted-foreground">A point in the conversation you can return to.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/confirmation" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Confirmation</div>
    <div class="leading-relaxed text-muted-foreground">A prompt to approve or deny a tool before it runs.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/context" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Context</div>
    <div class="leading-relaxed text-muted-foreground">How much of the context window the conversation has used.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/file-tree" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">File Tree</div>
    <div class="leading-relaxed text-muted-foreground">The files the agent changed, as a folder tree.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/inline-citation" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Inline Citation</div>
    <div class="leading-relaxed text-muted-foreground">A source in the sentence that opens on hover.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/message" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Message</div>
    <div class="leading-relaxed text-muted-foreground">One turn. The person's message, and the agent's reply with its actions.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/model-selector" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Model Selector</div>
    <div class="leading-relaxed text-muted-foreground">Two menus. One picks the model the agent runs, the other picks how hard it thinks.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/plan" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Plan</div>
    <div class="leading-relaxed text-muted-foreground">The steps the agent plans to take, and how far it has got.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/prompt-input" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Prompt Input</div>
    <div class="leading-relaxed text-muted-foreground">A message field with attachments and a send button.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/queue" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Queue</div>
    <div class="leading-relaxed text-muted-foreground">The agent's todo list, split into what is left and what is done.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/reasoning" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Reasoning</div>
    <div class="leading-relaxed text-muted-foreground">The agent's thinking as it streams.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/sources" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Sources</div>
    <div class="leading-relaxed text-muted-foreground">The links the agent used for a reply.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/stack-trace" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Stack Trace</div>
    <div class="leading-relaxed text-muted-foreground">A failed tool call and its stack frames.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/subagent" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Subagent</div>
    <div class="leading-relaxed text-muted-foreground">A subagent run, with its tool calls and result.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/suggestion" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Suggestion</div>
    <div class="leading-relaxed text-muted-foreground">A short prompt you can send to the agent in one click.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/task" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Task</div>
    <div class="leading-relaxed text-muted-foreground">The steps the agent takes, as it takes them.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/terminal" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Terminal</div>
    <div class="leading-relaxed text-muted-foreground">A command the agent runs, with its output as it streams.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/test-results" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Test Results</div>
    <div class="leading-relaxed text-muted-foreground">A test run by the agent, with its suites and failures.</div>
  </LinkedCard>
  <LinkedCard href="/docs/ai-elements/tool" class="items-start gap-1 p-6 text-sm sm:p-6">
    <div class="font-medium">Tool</div>
    <div class="leading-relaxed text-muted-foreground">A tool call the agent makes, from input to output.</div>
  </LinkedCard>
</div>

## Getting Started

Add the components most patterns are built on:

<PMAddComp name="trace code-block" />

Then open a pattern above and copy its code into your project. Each page lists any other components it needs.
