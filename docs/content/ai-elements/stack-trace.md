---
title: Stack Trace
description: Displays a failed tool call and its stack frames.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="stack-trace-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Stack Trace is a line for a tool call that failed. The error is the title, like "Failed: TypeError". Open it for the stack frames, which can link to the file and line.

Stack Trace is built with `Trace` with a `Trace.Collapsible` for the frames.

## Installation

Stack Trace is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<PMAddComp name="trace code-block" />

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Trace from "$lib/components/ui/trace/index.js";

  const [error, ...frames] = stack.split("\n").map((line) => line.trim());
</script>
```

```svelte showLineNumbers
<Trace.Root>
  <Trace.Collapsible>
    <Trace.CollapsibleTrigger>
      <Trace.Line status="error">
        <Trace.Icon>
          <CircleXIcon />
        </Trace.Icon>
        <Trace.Title>Failed: {error}</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>
      <div
        class="flex flex-col gap-2 rounded-md bg-muted p-3 font-mono text-xs"
      >
        <p class="text-destructive">{error}</p>
        <ol>
          {#each frames as frame, index (index)}
            <li
              class={frame.includes("node_modules")
                ? undefined
                : "text-foreground"}
            >
              {frame}
            </li>
          {/each}
        </ol>
      </div>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

The title truncates, so repeat the full error at the top of the content. Frames from `node_modules` stay muted, so your own frames stand out.

## Frame Links

Turn your own frames into links that open the file at the line. Fold the framework frames into a collapsible line of their own, so the frames you can fix come first.

<ComponentPreview name="stack-trace-frames" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## AI SDK

When a tool throws, its part is `output-error`. By default `errorText` is only the error message, with no frames. Return `error.stack` from `onError` in `toUIMessageStreamResponse` to send them.

```ts showLineNumbers title="src/routes/api/chat/+server.ts"
return result.toUIMessageStreamResponse({
  onError: (error) =>
    error instanceof Error ? (error.stack ?? error.message) : String(error),
});
```

A stack shows file paths from your server, so only send it in development.

```svelte showLineNumbers
{#if part.state === "output-error"}
  {@const [error, ...frames] = part.errorText
    .split("\n")
    .map((line) => line.trim())}
  <Trace.Collapsible>…</Trace.Collapsible>
{/if}
```

Map the other tool states as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
