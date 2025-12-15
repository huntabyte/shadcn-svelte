---
title: Field
description: Combine labels, controls, and help text to compose accessible form fields and grouped inputs.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/field
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="field-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="field" />
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
  import * as Field from "$lib/components/ui/field/index.js";
</script>
```

```svelte showLineNumbers
<Field.Set>
  <Field.Legend>Profile</Field.Legend>
  <Field.Description>This appears on invoices and emails.</Field.Description>
  <Field.Group>
    <Field.Field>
      <Field.Label for="name">Full name</Field.Label>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <Field.Description
        >This appears on invoices and emails.</Field.Description
      >
    </Field.Field>
    <Field.Field>
      <Field.Label for="username">Username</Field.Label>
      <Input id="username" autoComplete="off" aria-invalid />
      <Field.Error>Choose another username.</Field.Error>
    </Field.Field>
    <Field.Field orientation="horizontal">
      <Switch id="newsletter" />
      <Field.Label for="newsletter">Subscribe to the newsletter</Field.Label>
    </Field.Field>
  </Field.Group>
</Field.Set>
```

## Anatomy

The `Field` family is designed for composing accessible forms. A typical field is structured as follows:

```svelte
<Field.Field>
  <Field.Label for="input-id">Label</Field.Label>
  <!-- Input, Select, Switch, etc. -->
  <Field.Description>Optional helper text.</Field.Description>
  <Field.Error>Validation message.</Field.Error>
</Field.Field>
```

- `Field.Field` is the core wrapper for a single field.
- `Field.Content` is a flex column that groups label and description. Not required if you have no description.
- Wrap related fields with `Field.Group`, and use `Field.Set` with `Field.Legend` for semantic grouping.

## Examples

### Input

<ComponentPreview name="field-input">

<div></div>

</ComponentPreview>

### Textarea

<ComponentPreview name="field-textarea">

<div></div>

</ComponentPreview>

### Select

<ComponentPreview name="field-select">

<div></div>

</ComponentPreview>

### Slider

<ComponentPreview name="field-slider">

<div></div>

</ComponentPreview>

### Fieldset

<ComponentPreview name="field-field-set-demo">

<div></div>

</ComponentPreview>

### Checkbox

<ComponentPreview name="field-checkbox">

<div></div>

</ComponentPreview>

### Radio

<ComponentPreview name="field-radio">

<div></div>

</ComponentPreview>

### Switch

<ComponentPreview name="field-switch">

<div></div>

</ComponentPreview>

### Choice Card

Wrap `Field` components inside `FieldLabel` to create selectable field groups. This works with `RadioItem`, `Checkbox` and `Switch` components.

<ComponentPreview name="field-choice-card">

<div></div>

</ComponentPreview>

### Field Group

Stack `Field` components with `Field.Group`. Add `Field.Separator` to divide them.

<ComponentPreview name="field-field-group-demo">

<div></div>

</ComponentPreview>

### Responsive Layout

- **Vertical fields:** Default orientation stacks label, control, and helper text—ideal for mobile-first layouts.
- **Horizontal fields:** Set `orientation="horizontal"` on `Field` to align the label and control side-by-side. Pair with `Field.Content` to keep descriptions aligned.
- **Responsive fields:** Set `orientation="responsive"` for automatic column layouts inside container-aware parents. Apply `@container/field-group` classes on `Field.Group` to switch orientations at specific breakpoints.

<ComponentPreview name="field-responsive-layout-demo">

<div></div>

</ComponentPreview>

## Validation and Errors

- Add `data-invalid` to `Field` to switch the entire block into an error state.
- Add `aria-invalid` on the input itself for assistive technologies.
- Render `FieldError` immediately after the control or inside `FieldContent` to keep error messages aligned with the field.
  Copy

```svelte
<Field.Field data-invalid>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" type="email" aria-invalid />
  <Field.Error>Enter a valid email address.</Field.Error>
</Field.Field>
```

## Accessibility

- `Field.Set` and `Field.Legend` keep related controls grouped for keyboard and assistive tech users.
- `Field` outputs `role="group"` so nested controls inherit labeling from `Field.Label` and `Field.Legend` when combined.
- Apply `Field.Separator` sparingly to ensure screen readers encounter clear section boundaries.
