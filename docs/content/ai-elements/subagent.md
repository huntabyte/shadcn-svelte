---
title: Subagent
description: Displays a subagent run, with its tool calls and result.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="subagent-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `Trace.Collapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<PMAddComp name="trace code-block badge" />

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
        <Trace.Title>Ran the research agent</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent class="flex flex-col gap-3">
      <Trace.Root>
        <Trace.Line>
          <Trace.Icon>
            <CircleCheckIcon />
          </Trace.Icon>
          <Trace.Title>Ran grep -rn cacheKey scripts</Trace.Title>
        </Trace.Line>
      </Trace.Root>
      <p>The cache is keyed on the commit SHA.</p>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

<ComponentPreview name="subagent-running" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `Trace.Description` after the title.

<ComponentPreview name="subagent-details" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## AI SDK

With the AI SDK, a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `Trace`. Map each nested tool part as in [Tool](/docs/ai-elements/tool#states).

Each yield is a preliminary output: the part is `output-available` with `preliminary: true`. The final output replaces it, so check `preliminary` before you show "Ran".

| Tool part state                                         | `Trace.Line` status                | Title           |
| ------------------------------------------------------- | ---------------------------------- | --------------- |
| `input-streaming`, `input-available`                    | `"running"` while the chat streams | Running …       |
| `output-available` with `preliminary: true`             | `"running"` while the chat streams | Running …       |
| `output-available`                                      | none                               | Ran …           |
| `output-error`, or a running state after the chat stops | `"error"`                          | Failed to run … |

## API Reference

See [Trace](/docs/components/trace#api-reference).
