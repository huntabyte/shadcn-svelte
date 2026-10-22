---
title: Plan
description: Displays the steps the agent plans to take, and how far it has got.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="plan-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `Trace` with a `Trace.Collapsible` for the plan.

When the steps are not known up front, use [Task](/docs/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/docs/components/trace) component.

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
      <Trace.Line status="running">
        <Trace.Icon>
          <RouteIcon />
        </Trace.Icon>
        <Trace.Title>Plan: migrate to Base UI</Trace.Title>
        <Trace.Description>2 of 5 done</Trace.Description>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>
      <Trace.Root>
        <Trace.Line>
          <Trace.Icon>
            <CircleCheckIcon />
          </Trace.Icon>
          <Trace.Title>Replace the Radix imports</Trace.Title>
        </Trace.Line>
        <Trace.Line status="running">
          <Trace.Icon>
            <CircleDotIcon />
          </Trace.Icon>
          <Trace.Title>Rename asChild to render</Trace.Title>
        </Trace.Line>
        <Trace.Line status="pending">
          <Trace.Icon>
            <CircleIcon />
          </Trace.Icon>
          <Trace.Title>Run the type checker</Trace.Title>
        </Trace.Line>
      </Trace.Root>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## Details

Put a description above the steps, inside `Trace.CollapsibleContent`.

<ComponentPreview name="plan-description" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## AI SDK

Stream the plan as a data part with a fixed `id`. The AI SDK replaces a data part with the same `id`, so it updates in place.

```ts showLineNumbers title="src/routes/api/chat/+server.ts"
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: "data-plan", id: "plan", data: { title, steps } });
  },
});
```

```svelte showLineNumbers
{@const plan = message.parts.find((part) => part.type === "data-plan")}
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
