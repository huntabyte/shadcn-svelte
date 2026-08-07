---
title: Questionnaire
description: A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Step from "$lib/components/step.svelte";
	import Steps from "$lib/components/steps.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="questionnaire-demo" align="end" class="[&_.preview>.preview]:min-h-[560px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

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

Install the following dependency:

</Step>

<PMInstall command="@shadcn-svelte/primitives" />

<Step>

Copy and paste the following code into your project.

</Step>

{#if viewerData}
<ComponentSource item={viewerData} data-llm-ignore />
{/if}

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>

{/snippet}

</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Questionnaire from "$lib/components/ui/questionnaire/index.js";
</script>
```

```svelte
<script lang="ts">
  const items = [
    {
      name: "direction",
      required: true,
      prompt: "What should we prototype next?",
      description: "Choose a direction or write your own.",
      choices: [
        {
          value: "delegation",
          label: "Delegation",
          description: "Show how work moves to a specialist.",
        },
        {
          value: "questions",
          label: "Question prompts",
          description: "Show choices while the interface waits.",
        },
        { value: "both", label: "Both together" },
      ],
      input: { label: "Another answer", placeholder: "Type another answer…" },
    },
    {
      name: "detail",
      required: false,
      prompt: "How much detail should it include?",
      description: "Skip this if you are not sure yet.",
      choices: [
        { value: "focused", label: "Focused" },
        { value: "complete", label: "Complete flow" },
      ],
    },
  ] as const;
</script>
```

Define the collection once: pass it to `Questionnaire.Root` for server-rendered
progress, actions, and shortcuts, then map it into the parts.

```svelte
<Questionnaire.Root {items} onsubmit={handleSubmit}>
  <Questionnaire.Progress />
  {#each items as question (question.name)}
    <Questionnaire.Item name={question.name} required={question.required}>
      <Questionnaire.Title>{question.prompt}</Questionnaire.Title>
      <Questionnaire.Description>
        {question.description}
      </Questionnaire.Description>
      <Questionnaire.Choices>
        {#each question.choices as choice (choice.value)}
          <Questionnaire.Choice value={choice.value}>
            <span class="font-medium">{choice.label}</span>
            {#if "description" in choice}
              <span class="text-muted-foreground">
                {choice.description}
              </span>
            {/if}
          </Questionnaire.Choice>
        {/each}
        {#if "input" in question}
          <Questionnaire.Input
            aria-label={question.input.label}
            placeholder={question.input.placeholder}
          />
        {/if}
      </Questionnaire.Choices>
      <Questionnaire.Error />
    </Questionnaire.Item>
  {/each}
  <Questionnaire.Actions>
    <Questionnaire.Previous />
    <Questionnaire.Skip />
    <Questionnaire.Next />
    <Questionnaire.Submit />
  </Questionnaire.Actions>
</Questionnaire.Root>
```

```ts
function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  const answers = new FormData(event.currentTarget as HTMLFormElement);
  // answers.get("direction"), answers.getAll(...) for multiple items.
}
```

## Composition

```text
Questionnaire.Root
├── Questionnaire.Progress
├── Questionnaire.Item
│   ├── Questionnaire.Title
│   ├── Questionnaire.Description
│   ├── Questionnaire.Choices
│   │   ├── Questionnaire.Choice
│   │   └── Questionnaire.Input
│   └── Questionnaire.Error
└── Questionnaire.Actions
    ├── Questionnaire.Previous
    ├── Questionnaire.Skip
    ├── Questionnaire.Next
    └── Questionnaire.Submit
```

Questionnaire owns the ordered items, active item, answer state, validation,
progress, and navigation. The containing page, card, dialog, or drawer owns
close and cancellation behavior, persistence, transport, and branching.

## Server Rendering

Pass `items` to server-render the active item, progress, actions, and answer
shortcuts. See the [headless Questionnaire](#unstyled) for the complete behavior.

## Multiple Selection

Use `multiple` for an item that accepts more than one fixed answer.

<ComponentPreview name="questionnaire-multiple" align="end" class="[&_.preview>.preview]:min-h-[420px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Freeform Answer

Compose `Questionnaire.Input` with fixed choices when the user can provide another answer.

<ComponentPreview name="questionnaire-freeform" align="end" class="[&_.preview>.preview]:min-h-[420px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Explicit Skip

Add `Questionnaire.Skip` when an optional item may be intentionally left unanswered.

<ComponentPreview name="questionnaire-skip" align="end" class="[&_.preview>.preview]:min-h-[520px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Shortcuts

Assign a letter or number key to each answer with `shortcuts`.

<ComponentPreview name="questionnaire-shortcuts" align="end" class="[&_.preview>.preview]:min-h-[480px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Custom Validation

Combine controlled navigation with an external schema such as Zod to return to an invalid item and present its error.

<ComponentPreview name="questionnaire-validation" align="end" class="[&_.preview>.preview]:min-h-[520px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Controlled

Control the active item from host state, such as returning to an invalid step.

<ComponentPreview name="questionnaire-controlled" align="end" class="[&_.preview>.preview]:min-h-[520px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Resume

Restore a saved active item and default answers, then reset changes back to that saved state.

<ComponentPreview name="questionnaire-resume" align="end" class="[&_.preview>.preview]:min-h-[520px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Conditional Items

Disable items that do not apply to the user's earlier answers.

<ComponentPreview name="questionnaire-conditional" align="end" class="[&_.preview>.preview]:min-h-[520px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Navigation State

Read item status to opt into disabled navigation and custom action styling.

<ComponentPreview name="questionnaire-navigation-state" align="end" class="[&_.preview>.preview]:min-h-[480px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Custom Progress

Use the Progress snippet state to build a custom progress indicator.

<ComponentPreview name="questionnaire-progress" align="end" class="[&_.preview>.preview]:min-h-[520px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Animated Items

Animate the active item while keeping progress and navigation stationary.

<ComponentPreview name="questionnaire-animated" align="end" class="[&_.preview>.preview]:min-h-[520px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Card

Compose Questionnaire with Card slots while keeping the question title and description semantic.

<ComponentPreview name="questionnaire-card" align="end" class="[&_.preview>.preview]:min-h-[560px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Dialog

Compose Questionnaire inside a Dialog while keeping cancellation and dismissal host-owned.

<ComponentPreview name="questionnaire-dialog" align="end" class="[&_.preview>.preview]:min-h-[320px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Accessibility

`Questionnaire.Item` renders a `fieldset`, and `Questionnaire.Title` renders its
`legend`. Descriptions and active errors are associated with the current item,
and invalid items and answer controls expose `aria-invalid`.

Fixed choices preserve native radio and checkbox behavior. Progress is exposed
as a named progressbar, navigation uses real buttons, and inactive items and
actions are hidden and inert. Successful navigation focuses the newly active
item; failed validation focuses an available answer control.

Always give `Questionnaire.Input` an accessible name with a visible label,
`aria-label`, or `aria-labelledby`. A placeholder is not a label. See the
[headless Questionnaire](#unstyled) for labeling custom compositions and the
complete keyboard behavior.

## Unstyled

The behavior in `Questionnaire.Root` comes from the `@shadcn-svelte/primitives`
package. To use it directly with your own markup and styles, import
`@shadcn-svelte/primitives/questionnaire`.

## API Reference

The props, data attributes, and snippet states for every part are exported by
`@shadcn-svelte/primitives/questionnaire`. The styled components inherit the
corresponding unstyled props. Navigation components also accept Button `size`
and `variant` props, and `Questionnaire.Actions` is a styled-only layout helper.
