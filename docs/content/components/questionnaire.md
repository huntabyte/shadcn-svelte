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

Questionnaire presents one question at a time and collects structured answers with native form controls. It supports fixed choices, freeform input, multiple selection, explicit skipping, validation, controlled navigation, shortcuts, and resumable defaults.

<ComponentPreview name="questionnaire-demo" class="**:[.preview]:min-h-[560px]">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="questionnaire" />

The styled registry component uses the unstyled headless primitive from `@shadcn-svelte/primitives/questionnaire`. The CLI installs this dependency automatically.

To use the headless primitive directly:

```bash
pnpm add @shadcn-svelte/primitives
```

```ts
import * as Questionnaire from "@shadcn-svelte/primitives/questionnaire";
```

## Import

```svelte
<script lang="ts">
  import * as Questionnaire from "$lib/components/ui/questionnaire/index.js";
</script>
```

## Anatomy

```svelte
<Questionnaire.Root>
  <Questionnaire.Progress />
  <Questionnaire.Item name="question">
    <Questionnaire.Title />
    <Questionnaire.Description />
    <Questionnaire.Choices>
      <Questionnaire.Choice value="answer" />
      <Questionnaire.Input />
    </Questionnaire.Choices>
    <Questionnaire.Error />
  </Questionnaire.Item>
  <Questionnaire.Actions>
    <Questionnaire.Previous />
    <Questionnaire.Skip />
    <Questionnaire.Next />
    <Questionnaire.Submit />
  </Questionnaire.Actions>
</Questionnaire.Root>
```

## Basic usage

Declare the collection on `Root` when you need stable ordering, conditional items, or shortcuts. The rendered `Item` components provide the interactive content.

```svelte
<script lang="ts">
  const items = [
    {
      name: "direction",
      required: true,
      choices: [{ value: "tool-calls" }, { value: "approvals" }],
    },
    { name: "timing" },
  ];
</script>

<Questionnaire.Root {items} shortcuts="letters" onsubmit={handleSubmit}>
  <Questionnaire.Progress />
  <Questionnaire.Item name="direction" required>
    <Questionnaire.Title>What should the agent build?</Questionnaire.Title>
    <Questionnaire.Choices>
      <Questionnaire.Choice value="tool-calls"
        >Tool call timeline</Questionnaire.Choice
      >
      <Questionnaire.Choice value="approvals"
        >Approval checkpoints</Questionnaire.Choice
      >
      <Questionnaire.Input aria-label="Another feature" />
    </Questionnaire.Choices>
    <Questionnaire.Error />
  </Questionnaire.Item>
  <Questionnaire.Actions>
    <Questionnaire.Previous />
    <Questionnaire.Skip />
    <Questionnaire.Next />
    <Questionnaire.Submit />
  </Questionnaire.Actions>
</Questionnaire.Root>
```

## Multiple selection

Set `multiple` on an item to render its choices as checkboxes. The submitted `FormData` contains every selected value.

<ComponentPreview name="questionnaire-multiple" class="**:[.preview]:min-h-[420px]">

<div></div>

</ComponentPreview>

## Freeform answers

Place `Questionnaire.Input` beside fixed choices. In a single-choice item, entering freeform text clears the fixed selection and serializes under the same item name.

<ComponentPreview name="questionnaire-freeform" class="**:[.preview]:min-h-[420px]">

<div></div>

</ComponentPreview>

## Explicit skip

Optional questions must be answered or explicitly skipped. `onStatusChange` reports `"unanswered"`, `"answered"`, or `"skipped"`.

<ComponentPreview name="questionnaire-skip" class="**:[.preview]:min-h-[500px]">

<div></div>

</ComponentPreview>

```svelte
<Questionnaire.Item
  name="constraints"
  onStatusChange={(status) => (constraintStatus = status)}
>
  <!-- ... -->
</Questionnaire.Item>
<Questionnaire.Skip />
```

## Answer shortcuts

Set `shortcuts="letters"` or `shortcuts="numbers"`. Shortcuts are assigned in enabled-choice order and shown by each styled choice.

<ComponentPreview name="questionnaire-shortcuts" class="**:[.preview]:min-h-[420px]">

<div></div>

</ComponentPreview>

## Validation

Questionnaire validates the active item before moving forward and validates every enabled item on submit. `required` handles the built-in answered-or-skipped rules. Pass `invalid` and render a custom `Error` for application validation.

<ComponentPreview name="questionnaire-validation" class="**:[.preview]:min-h-[520px]">

<div></div>

</ComponentPreview>

```svelte
<Questionnaire.Item name="detail" required invalid={Boolean(errors.detail)}>
  <!-- ... -->
  <Questionnaire.Error>{errors.detail}</Questionnaire.Error>
</Questionnaire.Item>
```

## Controlled navigation

Bind `item` when the active checkpoint belongs to application state. `onItemChange` is also available for callback-style control.

<ComponentPreview name="questionnaire-controlled" class="**:[.preview]:min-h-[500px]">

<div></div>

</ComponentPreview>

```svelte
<Questionnaire.Root bind:item {items} onsubmit={handleSubmit}>
  <!-- ... -->
</Questionnaire.Root>
```

## Resume with defaults

Use `defaultItem`, `defaultChecked`, and `defaultValue` to resume saved work. A native form reset restores those defaults and returns to `defaultItem`.

<ComponentPreview name="questionnaire-resume" class="**:[.preview]:min-h-[520px]">

<div></div>

</ComponentPreview>

## Conditional items

Mark the same item disabled in the collection and on `Questionnaire.Item`. Disabled items are removed from progress and navigation.

<ComponentPreview name="questionnaire-conditional" class="**:[.preview]:min-h-[500px]">

<div></div>

</ComponentPreview>

## Navigation state

Navigation controls expose `data-status`, `data-visible`, `data-hidden`, and `data-shortcut`, and accept the usual button props. This allows controls to reflect or enforce the active item state.

<ComponentPreview name="questionnaire-navigation-state" class="**:[.preview]:min-h-[460px]">

<div></div>

</ComponentPreview>

## Custom progress

The `Progress` snippet receives `{ current, first, last, total }` so text, bars, steps, or other progress treatments can use the same state.

<ComponentPreview name="questionnaire-progress" class="**:[.preview]:min-h-[500px]">

<div></div>

</ComponentPreview>

## Animated items

Active items expose `data-active`, making enter animations possible without changing the navigation model.

<ComponentPreview name="questionnaire-animated" class="**:[.preview]:min-h-[500px]">

<div></div>

</ComponentPreview>

## Card composition

Questionnaire parts can be composed inside Card while preserving the component's spacing and navigation styles.

<ComponentPreview name="questionnaire-card" class="**:[.preview]:min-h-[520px]">

<div></div>

</ComponentPreview>

## Dialog composition

Questionnaire also composes inside Dialog. Keep the questionnaire as the form and close the dialog after a successful submit.

<ComponentPreview name="questionnaire-dialog" class="**:[.preview]:min-h-[420px]">

<div></div>

</ComponentPreview>

## Native forms

`Root` renders a `<form>`, choices render native radio or checkbox inputs, and freeform answers render native inputs. Read answers from `new FormData(event.currentTarget)`. Do not nest Questionnaire inside another form.

`Root` sets `novalidate` by default so errors use `Questionnaire.Error`. Set `novalidate={false}` when native constraint validation is desired.

## Keyboard navigation

- <kbd>Arrow Left</kbd> moves to the previous item when focus is not in a text input or radio group.
- <kbd>Arrow Right</kbd> moves forward after the active item has an answer.
- <kbd>Arrow Up</kbd> and <kbd>Arrow Down</kbd> move through answer controls.
- <kbd>Enter</kbd> confirms a filled answer. <kbd>⌘ Enter</kbd> or <kbd>Ctrl Enter</kbd> confirms from anywhere in the active item.
- Letter or number keys activate choices when shortcuts are enabled.

## Accessibility

Questionnaire uses a focusable `fieldset` for each item, a `legend` title, native answer controls, progressbar semantics, live progress text, `aria-invalid`, linked descriptions and errors, and `aria-keyshortcuts`. Inactive items and navigation controls are hidden and inert, and failed validation focuses the first invalid control.

<ComponentSource item={viewerData} data-llm-ignore />
