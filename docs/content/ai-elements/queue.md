---
title: Queue
description: Displays the agent's todo list, split into what is left and what is done.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="queue-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Queue is the agent's todo list. Todos sit in two sections, To do and Completed, and the icon on each todo shows its status. The agent updates the list as it works, so a todo moves from one section to the other when it is done.

Queue is built with `Trace` with a `Trace.Collapsible` for each section.

## Installation

Queue is built with the [Trace](/docs/components/trace) component.

<PMAddComp name="trace" />

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
          <ListTodoIcon />
        </Trace.Icon>
        <Trace.Title>2 to do</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>
      <Trace.Root>
        <Trace.Line>
          <Trace.Icon>
            <CircleIcon />
          </Trace.Icon>
          <Trace.Title>Update the registry snapshots</Trace.Title>
        </Trace.Line>
        <Trace.Line>
          <Trace.Icon>
            <CircleIcon />
          </Trace.Icon>
          <Trace.Title>Add tests for the combobox</Trace.Title>
        </Trace.Line>
      </Trace.Root>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
  <Trace.Collapsible>
    <Trace.CollapsibleTrigger>
      <Trace.Line>
        <Trace.Icon>
          <ListChecksIcon />
        </Trace.Icon>
        <Trace.Title>1 completed</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>
      <Trace.Root>
        <Trace.Line>
          <Trace.Icon>
            <CircleCheckIcon />
          </Trace.Icon>
          <Trace.Title>Add a changeset</Trace.Title>
        </Trace.Line>
      </Trace.Root>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## Descriptions

A todo with a description is a `Trace.Collapsible` that opens to show it. A todo without one stays a `Trace.Line`.

<ComponentPreview name="queue-descriptions" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<Trace.Collapsible>
  <Trace.CollapsibleTrigger>
    <Trace.Line>
      <Trace.Icon>
        <CircleIcon />
      </Trace.Icon>
      <Trace.Title>Fix the focus ring on the select trigger</Trace.Title>
    </Trace.Line>
  </Trace.CollapsibleTrigger>
  <Trace.CollapsibleContent>
    It is clipped by overflow-hidden on the field.
  </Trace.CollapsibleContent>
</Trace.Collapsible>
```

## AI SDK

The agent writes its todos with a tool, `writeTodos` in this example. Each call sends the whole list, so render the last call and skip one whose input is still streaming.

```svelte showLineNumbers
{@const todos = message.parts
  .filter((part) => part.type === "tool-writeTodos")
  .filter((part) => part.state !== "input-streaming")
  .at(-1)?.input?.todos}
```

Map each todo status to a section, an icon and a `Trace.Line` status. Set `"running"` on the todo in progress only while the chat streams, so its title stops shimmering when the agent stops.

| Todo status   | Section   | Icon              | `Trace.Line` status                |
| ------------- | --------- | ----------------- | ---------------------------------- |
| `pending`     | To do     | `CircleIcon`      | none                               |
| `in_progress` | To do     | `CircleDotIcon`   | `"running"` while the chat streams |
| `completed`   | Completed | `CircleCheckIcon` | none                               |

## API Reference

See [Trace](/docs/components/trace#api-reference).
