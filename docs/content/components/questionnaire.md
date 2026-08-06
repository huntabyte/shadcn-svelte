---
title: Questionnaire
description: A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/questionnaire
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="questionnaire-demo" class="**:[.preview]:min-h-[560px]">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

<PMAddComp name="questionnaire" />

{/snippet}

{#snippet manual()}

<Steps>

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

```svelte showLineNumbers
<script lang="ts">
  import * as Questionnaire from "$lib/components/ui/questionnaire/index.js";

  const items = [{ name: "direction", required: true }, { name: "signals" }];

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>
```

```svelte showLineNumbers
<Questionnaire.Root {items} onsubmit={handleSubmit}>
  <Questionnaire.Progress />
  <Questionnaire.Item name="direction" required>
    <Questionnaire.Title>What should we prototype next?</Questionnaire.Title>
    <Questionnaire.Description>
      Choose one direction or write another answer.
    </Questionnaire.Description>
    <Questionnaire.Choices>
      <Questionnaire.Choice value="delegation">
        Sub-agent delegation
      </Questionnaire.Choice>
      <Questionnaire.Choice value="questions">
        Question prompts
      </Questionnaire.Choice>
      <Questionnaire.Input aria-label="Another direction" />
    </Questionnaire.Choices>
    <Questionnaire.Error />
  </Questionnaire.Item>
  <Questionnaire.Actions>
    <Questionnaire.Previous />
    <Questionnaire.Skip />
    <Questionnaire.Next />
    <Questionnaire.Submit>Save answers</Questionnaire.Submit>
  </Questionnaire.Actions>
</Questionnaire.Root>
```

Questionnaire uses native radios, checkboxes, inputs, and form serialization. Set `multiple` on an item to allow more than one fixed choice, use `shortcuts="letters"` or `shortcuts="numbers"` for answer shortcuts, and keep conditional items out of `items` or mark them `disabled`.
