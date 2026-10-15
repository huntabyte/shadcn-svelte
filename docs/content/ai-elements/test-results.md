---
title: Test Results
description: Displays a test run by the agent, with its suites and failures.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="test-results-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `Trace` with a `Trace.Collapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<PMAddComp name="trace code-block" />

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as CodeBlock from "$lib/components/ui/code-block/index.js";
  import * as Trace from "$lib/components/ui/trace/index.js";
</script>
```

```svelte showLineNumbers
<Trace.Root>
  <Trace.Collapsible>
    <Trace.CollapsibleTrigger>
      <Trace.Line status="error">
        <Trace.Icon>
          <FlaskConicalIcon />
        </Trace.Icon>
        <Trace.Title>Ran 2 tests, 1 failed</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>
      <Trace.Root>
        <Trace.Line>
          <Trace.Icon>
            <CheckIcon />
          </Trace.Icon>
          <Trace.Title>creates a user</Trace.Title>
        </Trace.Line>
        <Trace.Collapsible>
          <Trace.CollapsibleTrigger>
            <Trace.Line status="error">
              <Trace.Icon>
                <XIcon />
              </Trace.Icon>
              <Trace.Title>updates a user profile</Trace.Title>
            </Trace.Line>
          </Trace.CollapsibleTrigger>
          <Trace.CollapsibleContent>
            <CodeBlock.Root size="sm">
              <CodeBlock.Content
                wrap
                class="max-h-64"
                code="Expected status 200, received 500"
              />
            </CodeBlock.Root>
          </Trace.CollapsibleContent>
        </Trace.Collapsible>
      </Trace.Root>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## Suites

Group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.

<ComponentPreview name="test-results-suites" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<Trace.Collapsible open={failed > 0}>
  <Trace.CollapsibleTrigger>
    <Trace.Line status={failed > 0 ? "error" : undefined}>
      <Trace.Icon>
        <FileCodeIcon />
      </Trace.Icon>
      <Trace.Title>user-api.test.ts, 14 tests, 2 failed</Trace.Title>
    </Trace.Line>
  </Trace.CollapsibleTrigger>
  <Trace.CollapsibleContent>
    <Trace.Root>…</Trace.Root>
  </Trace.CollapsibleContent>
</Trace.Collapsible>
```

## AI SDK

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

```svelte showLineNumbers
{@const tests = part.output.suites.flatMap((suite) => suite.tests)}
{@const failed = tests.filter((test) => test.status === "failed").length}
<Trace.Collapsible open={untrack(() => failed > 0)}>
  <Trace.CollapsibleTrigger>
    <Trace.Line status={failed > 0 ? "error" : undefined}>
      <Trace.Icon>
        <FlaskConicalIcon />
      </Trace.Icon>
      <Trace.Title>
        Ran {tests.length} tests{failed > 0 ? `, ${failed} failed` : ""}
      </Trace.Title>
    </Trace.Line>
  </Trace.CollapsibleTrigger>
  <Trace.CollapsibleContent>…</Trace.CollapsibleContent>
</Trace.Collapsible>
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
