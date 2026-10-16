---
title: Chain of Thought
description: Displays a summary that expands into the steps an agent took.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="chain-of-thought-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Chain of Thought is a summary line that expands into the steps an agent took. The summary says what happened, like "Researched in 3 steps". The steps sit inside it, each one a line of its own.

Chain of Thought is built with `Trace` with a `Trace.Collapsible` for the summary.

## Installation

Chain of Thought is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<PMAddComp name="trace code-block badge" />

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Trace from "$lib/components/ui/trace/index.js";
</script>
```

```svelte showLineNumbers
<Trace.Root>
  <Trace.Collapsible open>
    <Trace.CollapsibleTrigger>
      <Trace.Line>
        <Trace.Icon>
          <CircleCheckIcon />
        </Trace.Icon>
        <Trace.Title>Researched in 3 steps</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>
      <Trace.Root>
        <Trace.Line>
          <Trace.Icon>
            <CircleCheckIcon />
          </Trace.Icon>
          <Trace.Title>Read the build log for dpl_8Kx2</Trace.Title>
        </Trace.Line>
        <Trace.Line>
          <Trace.Icon>
            <CircleCheckIcon />
          </Trace.Icon>
          <Trace.Title
            >Searched the web for next.js image cache key</Trace.Title
          >
        </Trace.Line>
        <Trace.Line>
          <Trace.Icon>
            <CircleCheckIcon />
          </Trace.Icon>
          <Trace.Title>Searched the code for cacheKey</Trace.Title>
        </Trace.Line>
      </Trace.Root>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## Steps

Each step is a `Trace.Line`. Set its `status` and write the title in the matching tense.

| Step              | `status`    | Title                         |
| ----------------- | ----------- | ----------------------------- |
| Running           | `"running"` | Searching for …               |
| Done, with detail | none        | Searched for …                |
| Done, links out   | none        | Read the Image component docs |
| Failed            | `"error"`   | Failed to search for …        |

## Search Results

When a step runs a web search, show the results as a `Badge` for each hostname in the step's content.

```svelte showLineNumbers
<Trace.CollapsibleContent class="flex flex-wrap gap-1.5">
  {#each results as result, index (index)}
    <Badge variant="secondary">
      {new URL(result.url).hostname}
    </Badge>
  {/each}
</Trace.CollapsibleContent>
```

## AI SDK

Render each tool part as a step. `running` is true while tool parts stream and before the reply starts. Set the summary's status and title from the steps. The summary opens while the steps run, as in [Trace](/docs/components/trace#open-state).

```svelte showLineNumbers
<script lang="ts">
  let open = $state<boolean>();
  const running = $derived(streaming && !answering);
  const failed = $derived(
    steps.filter((part) => part.state === "output-error").length
  );
</script>

<Trace.Collapsible
  open={open ?? running}
  onOpenChange={(value) => (open = value)}
>
  <Trace.CollapsibleTrigger>
    <Trace.Line
      status={running ? "running" : failed > 0 ? "error" : undefined}
    >
      <Trace.Title>
        {running ? "Researching" : `Researched in ${steps.length} steps`}
      </Trace.Title>
    </Trace.Line>
  </Trace.CollapsibleTrigger>
  <Trace.CollapsibleContent>
    <Trace.Root>
      {#each steps as part (part.toolCallId)}
        {@render stepLine(part, streaming)}
      {/each}
    </Trace.Root>
  </Trace.CollapsibleContent>
</Trace.Collapsible>
```

`stepLine` renders one tool part as a `Trace.Line`, as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
