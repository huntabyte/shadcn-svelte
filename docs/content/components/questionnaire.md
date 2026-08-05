---
title: Questionnaire
description: A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	let { viewerData } = $props();
</script>

<ComponentPreview name="questionnaire-demo" class="**:[.preview]:min-h-[560px]" />

## Installation

<PMAddComp name="questionnaire" />

## Usage

```svelte
<script lang="ts">
  import * as Questionnaire from "$lib/components/ui/questionnaire/index.js";

  const items = [
    { name: "direction", required: true },
    { name: "detail", required: false },
  ];
</script>

<Questionnaire.Root {items} onsubmit={handleSubmit}>
  <Questionnaire.Progress />
  <Questionnaire.Item name="direction" required>
    <Questionnaire.Title>What should we prototype next?</Questionnaire.Title>
    <Questionnaire.Choices>
      <Questionnaire.Choice value="delegation">Delegation</Questionnaire.Choice
      >
      <Questionnaire.Choice value="questions"
        >Question prompts</Questionnaire.Choice
      >
      <Questionnaire.Input aria-label="Another answer" />
    </Questionnaire.Choices>
    <Questionnaire.Error />
  </Questionnaire.Item>
  <Questionnaire.Actions>
    <Questionnaire.Button action="previous">Previous</Questionnaire.Button>
    <Questionnaire.Button action="skip">Skip</Questionnaire.Button>
    <Questionnaire.Button action="next">Next</Questionnaire.Button>
    <Questionnaire.Button action="submit">Submit</Questionnaire.Button>
  </Questionnaire.Actions>
</Questionnaire.Root>
```

Questionnaire uses native radios, checkboxes, inputs, and form serialization. Set `multiple` on an item to allow more than one fixed choice, use `shortcuts="letters"` or `shortcuts="numbers"` for answer shortcuts, and keep conditional items out of `items` or mark them `disabled`.

<ComponentSource item={viewerData} data-llm-ignore />
