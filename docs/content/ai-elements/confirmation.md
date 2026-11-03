---
title: Confirmation
description: Asks for approval before a tool runs.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="confirmation-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Confirmation asks the person for a yes or no before a tool runs. The question is an [Item](/docs/components/item) with Deny and Approve buttons. Once the person answers, the call becomes a [Tool](/docs/ai-elements/tool) line.

## Installation

Confirmation is built with the [Item](/docs/components/item) and [Button](/docs/components/button) components.

<PMAddComp name="item button" />

## Usage

```svelte showLineNumbers
<Item.Root variant="outline" size="sm">
  <Item.Media variant="icon">
    <TerminalIcon />
  </Item.Media>
  <Item.Content>
    <Item.Title>Run {part.input.command}?</Item.Title>
    <Item.Description>The command runs in this project.</Item.Description>
  </Item.Content>
  <Item.Actions>
    <Button size="sm" variant="outline" onclick={deny}>Deny</Button>
    <Button size="sm" onclick={approve}>Approve</Button>
  </Item.Actions>
</Item.Root>
```

## AI SDK

While the part is `approval-requested`, answer with the approval id. Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` so the chat continues once every approval has an answer.

```ts showLineNumbers
chat.addToolApprovalResponse({
  id: part.approval.id,
  approved: true,
});
```

```ts showLineNumbers
const chat = new Chat({
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
});
```

Approve streams the tool output. Deny streams `output-denied`. Either way, the part becomes a Tool line.

See [Tool](/docs/ai-elements/tool#approval).

## AI SDK Helper

To script an approval with [`createChat`](https://ui.shadcn.com/docs/helpers/ai-sdk), set `needsApproval` on the tool. The `output` streams after approval, and the next agent turn reads `toolCall.approved`.

```ts showLineNumbers
const chat = createChat()
  .user("Clean up the build folder.")
  .assistant(({ writer }) => {
    writer.tool("runCommand", {
      input: { command: "rm -rf dist" },
      needsApproval: true,
      output: { stdout: "" },
    });
  })
  .assistant(({ writer, toolCall }) => {
    writer.text(
      toolCall?.approved
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    );
  });
```
