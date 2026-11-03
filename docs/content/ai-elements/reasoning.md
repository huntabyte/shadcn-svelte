---
title: Reasoning
description: Displays the agent's thinking as it streams.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="reasoning-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `Trace` with a `Trace.Collapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/docs/components/trace) component.

<PMAddComp name="trace" />

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Trace from "$lib/components/ui/trace/index.js";
</script>
```

```svelte showLineNumbers
<Trace.Root>
  <Trace.Collapsible>
    <Trace.CollapsibleTrigger>
      <Trace.Line>
        <Trace.Icon>
          <CircleCheckIcon />
        </Trace.Icon>
        <Trace.Title>Thought</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent class="whitespace-pre-wrap">
      {text}
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## Duration

The AI SDK does not time reasoning. Measure it on the server, send it as message metadata, and show it in a `Trace.Description` after the title.

<ComponentPreview name="reasoning-duration" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<Trace.Line>
  <Trace.Icon>
    <CircleCheckIcon />
  </Trace.Icon>
  <Trace.Title>Thought</Trace.Title>
  <Trace.Description>{seconds}s</Trace.Description>
</Trace.Line>
```

## AI SDK

Render each `reasoning` part as a line. It starts as a plain `Trace.Line` and becomes a `Trace.Collapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

```svelte showLineNumbers
<script lang="ts">
  // The person's choice for each line. Until they click, it follows `running`.
  let reasoningOpen = $state<Record<string, boolean>>({});
</script>

{#snippet reasoningLine(id: string, text: string, running: boolean)}
  {#snippet line()}
    <Trace.Line status={running ? "running" : undefined}>
      <Trace.Icon>
        {#if running}
          <LoaderCircleIcon class="animate-spin" />
        {:else}
          <CircleCheckIcon />
        {/if}
      </Trace.Icon>
      <Trace.Title>{running ? "Thinking" : "Thought"}</Trace.Title>
    </Trace.Line>
  {/snippet}
  {#if text.length === 0}
    {@render line()}
  {:else}
    <Trace.Collapsible
      open={reasoningOpen[id] ?? running}
      onOpenChange={(open) => (reasoningOpen[id] = open)}
    >
      <Trace.CollapsibleTrigger>{@render line()}</Trace.CollapsibleTrigger>
      <Trace.CollapsibleContent class="whitespace-pre-wrap">
        {text}
      </Trace.CollapsibleContent>
    </Trace.Collapsible>
  {/if}
{/snippet}
```

```svelte showLineNumbers
<Trace.Root>
  {#each message.parts.filter((part) => part.type === "reasoning") as part, index (index)}
    {@render reasoningLine(
      `${message.id}-${index}`,
      part.text,
      streaming && part.state === "streaming"
    )}
  {/each}
</Trace.Root>
```

Some models send several reasoning parts in one message. Each one is a line in the same `Trace`.

## API Reference

See [Trace](/docs/components/trace#api-reference).
