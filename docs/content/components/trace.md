---
title: Trace
description: The building block for reasoning, tool calls, sources and more.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/trace
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="trace-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

`Trace` is a list of lines. Each line has an icon, a title, and an optional description and status. A line can expand to show more detail, link to a page, or open a dialog or sheet.

Every line has the same shape, so reasoning, tool calls, sources and plans built from `Trace` look and behave the same.

Use `Trace` for the steps an agent takes, like calling a tool, running a subagent or editing a file. Use [Message](/docs/components/message) for its reply, and [Marker](/docs/components/marker) for notes and dividers between turns.

## Built with Trace

Every pattern below is a composition of `Trace` parts. See [AI Elements](/docs/ai-elements) for examples and code.

| Pattern                                                | Shows                                                            |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| [Chain of Thought](/docs/ai-elements/chain-of-thought) | A summary that expands into the steps behind it.                 |
| [Plan](/docs/ai-elements/plan)                         | The steps the agent plans to take, and how far it has got.       |
| [Queue](/docs/ai-elements/queue)                       | The agent's todo list, split into what is left and what is done. |
| [Reasoning](/docs/ai-elements/reasoning)               | The agent's thinking as it streams.                              |
| [Sources](/docs/ai-elements/sources)                   | The links the agent used for a reply.                            |
| [Stack Trace](/docs/ai-elements/stack-trace)           | A failed tool call and its stack frames.                         |
| [Subagent](/docs/ai-elements/subagent)                 | A subagent run, with its tool calls and result.                  |
| [Task](/docs/ai-elements/task)                         | The steps the agent takes, as it takes them.                     |
| [Terminal](/docs/ai-elements/terminal)                 | A command the agent runs, with its output as it streams.         |
| [Test Results](/docs/ai-elements/test-results)         | A test run by the agent, with its suites and failures.           |
| [Tool](/docs/ai-elements/tool)                         | A tool call the agent makes, from input to output.               |

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="trace" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install the required shadcn-svelte dependencies:

</Step>

<PMAddComp name="collapsible" />

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

Use a `Trace.Line` for a single step:

```svelte showLineNumbers
<script lang="ts">
  import * as Trace from "$lib/components/ui/trace/index.js";
</script>
```

```svelte showLineNumbers
<Trace.Root>
  <Trace.Line>
    <Trace.Icon>
      <SearchIcon />
    </Trace.Icon>
    <Trace.Title>Searched for minimumReleaseAge</Trace.Title>
  </Trace.Line>
</Trace.Root>
```

Wrap the line in a `Trace.Collapsible` to show more detail when it expands:

```svelte showLineNumbers
<Trace.Root>
  <Trace.Collapsible>
    <Trace.CollapsibleTrigger>
      <Trace.Line>
        <Trace.Icon>
          <TerminalIcon />
        </Trace.Icon>
        <Trace.Title>Ran node --version</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>v24.18.0</Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## Composition

Use the following composition to build a trace line:

```text
Trace.Root
└── Trace.Line
    ├── Trace.Icon
    ├── Trace.Title
    ├── Trace.Description
    └── Trace.Icon
```

Wrap the line in a `Trace.Collapsible` to show more detail when it expands:

```text
Trace.Root
└── Trace.Collapsible
    ├── Trace.CollapsibleTrigger
    │   └── Trace.Line
    └── Trace.CollapsibleContent
```

`Trace.Line` is always the line. To make a line do something, wrap it in that thing's trigger.

## Features

- One row for reasoning, tool calls, sources, plans and tasks
- Rows that expand, link out, or open a dialog, sheet, drawer or popover
- `running`, `error` and `pending` states, with a shimmer while running
- Nested rows, so a summary expands into steps and a step into its output
- Keyboard and screen reader support from the trigger that wraps each row
- Customizable styling through the `class` prop on every part

## Trace Line

Use a `Trace.Line` on its own for a step with no detail to show. It reads as plain text.

<ComponentPreview name="trace-static" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Status

Set `status` on `Trace.Line` when a step is running, has failed or hasn't started yet.

<ComponentPreview name="trace-status" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

| Status      | Use for                                                                       |
| ----------- | ----------------------------------------------------------------------------- |
| none        | Work that is done: "Ran pnpm install".                                        |
| `"error"`   | Work that failed. Say so in the title: "Failed to run pnpm lint".             |
| `"running"` | Work in progress. Write the title in the present tense: "Running pnpm build". |
| `"pending"` | Work that has not started, such as a plan step: "Run pnpm test".              |

## Description

Put secondary text such as a diff stat, a duration or a count in a `Trace.Description` after the `Trace.Title`. It does not truncate.

<ComponentPreview name="trace-description" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Collapsible

Wrap the line in a `Trace.Collapsible` to show more detail when it expands. Put the `Trace.Line` inside `Trace.CollapsibleTrigger` and the detail in `Trace.CollapsibleContent`.

<ComponentPreview name="trace-collapsible" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Open State

Rows start closed. Bind `open` on `Trace.Collapsible` to start open or to control a row.

<ComponentPreview name="trace-open" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

To open a row while it streams and let the reader's click win, pass `open ?? running`.

```svelte showLineNumbers
<script lang="ts">
  let open = $state<boolean>();
</script>

<Trace.Collapsible
  open={open ?? running}
  onOpenChange={(value) => (open = value)}
>
  <Trace.CollapsibleTrigger>
    <Trace.Line status={running ? "running" : undefined}>…</Trace.Line>
  </Trace.CollapsibleTrigger>
  <Trace.CollapsibleContent>{text}</Trace.CollapsibleContent>
</Trace.Collapsible>
```

## Link

Wrap the `Trace.Line` in an anchor. For a new tab, use an arrow-up-right icon and sr-only "(opens in a new tab)".

<ComponentPreview name="trace-link" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<a href="https://docs.astro.build" target="_blank" rel="noreferrer">
  <Trace.Line>
    <Trace.Title>
      Install Astro
      <span class="sr-only"> (opens in a new tab)</span>
    </Trace.Title>
    <Trace.Icon>
      <ArrowUpRightIcon />
    </Trace.Icon>
  </Trace.Line>
</a>
```

## Dialog

Wrap the `Trace.Line` in the dialog's trigger. The dialog owns its open state, Escape and focus return.

<ComponentPreview name="trace-dialog" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<Dialog.Root>
  <Dialog.Trigger>
    <Trace.Line>
      <Trace.Title>Searched the web for cache keys</Trace.Title>
      <Trace.Icon>
        <ChevronRightIcon />
      </Trace.Icon>
    </Trace.Line>
  </Dialog.Trigger>
  <Dialog.Content>…</Dialog.Content>
</Dialog.Root>
```

## Sheet

The same shape as the dialog. Drawer and Popover work the same way.

<ComponentPreview name="trace-sheet" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Group

Put rows that sit next to each other in a `Trace.Root`. It also styles any trigger or link that wraps a `Trace.Line`.

<ComponentPreview name="trace-group" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Sources

A collapsible row whose detail is a `Trace.Root` of link rows.

<ComponentPreview name="trace-sources" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

See [Sources](/docs/ai-elements/sources) for more examples.

## Chain of Thought

A chain of thought is a collapsible row with step rows inside. Set the parent's status and title from its children.

<ComponentPreview name="trace-steps" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

See [Chain of Thought](/docs/ai-elements/chain-of-thought) and [Task](/docs/ai-elements/task) for more examples.

## Commit

A commit is a collapsible row with a line for each changed file. Say what changed in the title, Added, Edited or Deleted, and put the line counts in the description. Each file opens its diff in a [Sheet](#sheet).

<ComponentPreview name="trace-commit" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Whole Turn

Three levels: the turn, a summary, and the rows. Text between steps sits between two `Trace.Root` lists.

<ComponentPreview name="trace-turn" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Reasoning

Render a `reasoning` part from the AI SDK. The row is a `Trace.Line` until the first text arrives. See [Open State](#open-state).

<ComponentPreview name="trace-thinking" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

See [Reasoning](/docs/ai-elements/reasoning) for more examples.

## Tool

Render tool parts from the AI SDK. Map the tool part as in [Tool](/docs/ai-elements/tool#states).

<ComponentPreview name="trace-tool-calls" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

See [Tool](/docs/ai-elements/tool) for more examples.

## Accessibility

`Trace` adds no roles of its own. Each line gets its semantics from the element that wraps it.

- A `Trace.Line` on its own is a `span`. It is read as text and is not a tab stop.
- Wrap it in a `Trace.CollapsibleTrigger` and it becomes a button with `aria-expanded`. Wrap it in a link, or in the trigger for a dialog or sheet, and it takes the keyboard and focus behavior of that element.
- `Trace.Icon` is hidden from assistive tech, so `Trace.Title` is the accessible name. Write it as a sentence that says what happened, like "Edited trace.svelte", not just "trace.svelte".
- When a link opens a new tab, add "(opens in a new tab)" to the title with `sr-only`.
- Status is shown with color and motion, so put it in the title too. Write "Running pnpm build" while it runs and "Failed to run pnpm build" when it errors.
- The shimmer on a running title stops when the reader prefers reduced motion. The title still says what is happening.
- Inside a [Message Scroller](/docs/components/message-scroller), each line is announced once when it is added.
- `Trace.CollapsibleContent` mutes its text. If you put a block with a muted background inside it, give the block `text-foreground` so it keeps its contrast. [Code Block](/docs/components/code-block) sets its own text color.

## API Reference

### Trace.Root

A list of rows. It also styles any trigger or link that wraps a `Trace.Line`.

| Prop    | Type     | Default | Description                              |
| ------- | -------- | ------- | ---------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the list. |

### Trace.Line

One line: an icon and a title. It is a span, so it is not a button or a tab stop. Wrap it in a trigger or a link to make it do something.

| Prop     | Type                                | Default | Description                              |
| -------- | ----------------------------------- | ------- | ---------------------------------------- |
| `status` | `"running" \| "error" \| "pending"` | -       | The state of the work the line reports.  |
| `class`  | `string`                            | -       | Additional classes to apply to the line. |

### Trace.Icon

A decorative icon slot, hidden from assistive tech. Before the title it names the action; after it, it is the indicator.

| Prop    | Type     | Default | Description                                   |
| ------- | -------- | ------- | --------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the icon slot. |

### Trace.Title

One sentence on one line. It truncates and shimmers while the line is running.

| Prop    | Type     | Default | Description                               |
| ------- | -------- | ------- | ----------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the title. |

### Trace.Description

Secondary text after the title, such as a count or a duration. It does not truncate.

| Prop    | Type     | Default | Description                                     |
| ------- | -------- | ------- | ----------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the description. |

### Trace.Collapsible

A row that expands. It accepts the props of [`Collapsible`](/docs/components/collapsible).

| Prop           | Type                      | Default | Description                             |
| -------------- | ------------------------- | ------- | --------------------------------------- |
| `open`         | `boolean`                 | `false` | The open state. Bindable.               |
| `onOpenChange` | `(open: boolean) => void` | -       | Called when the open state changes.     |
| `class`        | `string`                  | -       | Additional classes to apply to the row. |

### Trace.CollapsibleTrigger

The button that opens and closes the row. Put a `Trace.Line` inside it. It adds a chevron after the line.

| Prop    | Type     | Default | Description                                 |
| ------- | -------- | ------- | ------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the trigger. |

### Trace.CollapsibleContent

The detail of a row that expands.

| Prop    | Type     | Default | Description                                 |
| ------- | -------- | ------- | ------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the content. |
