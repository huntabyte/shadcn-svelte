---
title: Tool
description: Displays a tool call the agent makes, from input to output.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="tool-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `Trace` with a `Trace.Collapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

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
      <Trace.Line>
        <Trace.Icon>
          <TerminalIcon />
        </Trace.Icon>
        <Trace.Title>Ran git status --short</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>
      <CodeBlock.Root size="sm">
        <CodeBlock.Content wrap class="max-h-64" code={output} />
      </CodeBlock.Root>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

<ComponentPreview name="tool-states" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

| Tool part state                                           | `status`                             | Title                                                                |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `input-streaming`, `input-available`                      | `"running"` while the chat streams   | Running …                                                            |
| `input-streaming`, `input-available` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                      | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                      | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `output-available`                                        | none                                 | Ran …                                                                |
| `output-error`                                            | `"error"`                            | Failed to run …                                                      |
| `output-denied`                                           | none                                 | Denied …                                                             |

A tool is a plain `Trace.Line` while it runs, and a `Trace.Collapsible` once its output arrives.

```svelte showLineNumbers
{#snippet toolLine(part: ToolPart, streaming: boolean)}
  {@const command = part.input?.command}
  {#if part.state === "output-denied" || (part.state === "approval-responded" && !part.approval.approved)}
    <Trace.Line>
      <Trace.Icon>
        <TerminalIcon />
      </Trace.Icon>
      <Trace.Title>Denied {command}</Trace.Title>
    </Trace.Line>
  {:else if part.state === "output-available" || part.state === "output-error"}
    {@const failed = part.state === "output-error"}
    <Trace.Collapsible>
      <Trace.CollapsibleTrigger>
        <Trace.Line status={failed ? "error" : undefined}>
          <Trace.Icon>
            <TerminalIcon />
          </Trace.Icon>
          <Trace.Title>{failed ? "Failed to run" : "Ran"} {command}</Trace.Title>
        </Trace.Line>
      </Trace.CollapsibleTrigger>
      <Trace.CollapsibleContent>
        <CodeBlock.Root size="sm">
          <CodeBlock.Content
            wrap
            class="max-h-64"
            code={failed ? part.errorText : part.output.stdout}
          />
        </CodeBlock.Root>
      </Trace.CollapsibleContent>
    </Trace.Collapsible>
  {:else}
    <Trace.Line status={streaming ? "running" : "error"}>
      <Trace.Icon>
        <TerminalIcon />
      </Trace.Icon>
      <Trace.Title>{streaming ? "Running" : "Failed to run"} {command}</Trace.Title>
    </Trace.Line>
  {/if}
{/snippet}
```

```svelte showLineNumbers
<Trace.Root>
  {#each message.parts.filter((part) => part.type === "tool-runCommand") as part (part.toolCallId)}
    {@render toolLine(part, streaming)}
  {/each}
</Trace.Root>
```

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

## Output in a Sheet

For long output, wrap the `Trace.Line` in a `Sheet.Trigger` and show the output in the sheet.

<ComponentPreview name="tool-sheet" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

See [Trace](/docs/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. See [Confirmation](/docs/ai-elements/confirmation).

<ComponentPreview name="tool-approval" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
{#if part.state === "approval-requested"}
  <Item.Root variant="outline" size="sm">
    <Item.Media variant="icon">
      <TerminalIcon />
    </Item.Media>
    <Item.Content>
      <Item.Title>Run {part.input.command}?</Item.Title>
    </Item.Content>
    <Item.Actions>
      <Button
        size="sm"
        variant="outline"
        onclick={() =>
          chat.addToolApprovalResponse({
            id: part.approval.id,
            approved: false,
          })}
      >
        Deny
      </Button>
      <Button
        size="sm"
        onclick={() =>
          chat.addToolApprovalResponse({
            id: part.approval.id,
            approved: true,
          })}
      >
        Approve
      </Button>
    </Item.Actions>
  </Item.Root>
{/if}
```

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to `new Chat()` so the chat continues once every approval has an answer.

## API Reference

See [Trace](/docs/components/trace#api-reference).
