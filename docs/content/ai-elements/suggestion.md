---
title: Suggestion
description: A short prompt you can send to the agent in one click.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="suggestion-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Suggestion is a prompt you send without typing. Each one is a [Button](/docs/components/button) with the prompt as its label. Put a row of them above the [Prompt Input](/docs/ai-elements/prompt-input).

## Installation

Suggestion is built with the [Button](/docs/components/button) component.

<PMAddComp name="button" />

## Usage

```svelte showLineNumbers
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>
```

```svelte showLineNumbers
<div
  class="scrollbar-none flex scroll-fade-x gap-2 overflow-x-auto overscroll-x-contain"
>
  {#each suggestions as suggestion, index (index)}
    <Button
      variant="outline"
      size="sm"
      class="shrink-0"
      onclick={() => send(suggestion)}
    >
      {suggestion}
    </Button>
  {/each}
</div>
```

## Scrolling

The row scrolls sideways when the suggestions do not fit. [`scroll-fade-x`](/docs/utils/scroll-fade) fades the edge that has more to show, and `shrink-0` keeps each label on one line.

## AI SDK

The label is the message. Send it as is.

```ts showLineNumbers
chat.sendMessage({ text: suggestion });
```
