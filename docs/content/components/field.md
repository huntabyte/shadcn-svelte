---
title: Field
description: Combine labels, controls, and help text to compose accessible form fields and grouped inputs.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/field
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

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
</script>
```

```svelte showLineNumbers
<Field.Set>
  <Field.Legend>Profile</Field.Legend>
  <Field.Description>This appears on invoices and emails.</Field.Description>
  <Field.Group>
    <Field.Field>
      <Field.Label for="name">Full name</Field.Label>
      <Input id="name" autocomplete="off" placeholder="Evil Rabbit" />
      <Field.Description
        >This appears on invoices and emails.</Field.Description
      >
    </Field.Field>
    <Field.Field>
      <Field.Label for="username">Username</Field.Label>
      <Input id="username" autocomplete="off" aria-invalid />
      <Field.Error>Choose another username.</Field.Error>
    </Field.Field>
    <Field.Field orientation="horizontal">
      <Switch id="newsletter" />
      <Field.Label for="newsletter">Subscribe to the newsletter</Field.Label>
    </Field.Field>
  </Field.Group>
</Field.Set>
```

## Composition

Use the following composition to build a `Field`:

```text
Field.Set
├── Field.Legend
└── Field.Group
    ├── Field.Separator
    └── Field.Field
        ├── Field.Label
        ├── Field.Content
        │   ├── Field.Title
        │   └── Field.Description
        ├── Field.Description
        └── Field.Error
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

<ComponentPreview name="field-switch-demo">

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

## Form

<ComponentPreview name="checkbox-form-multiple">

<div></div>

</ComponentPreview>

## Validation and Errors

- Add `data-invalid` to `Field` to switch the entire block into an error state.
- Add `aria-invalid` on the input itself for assistive technologies.
- Render `FieldError` immediately after the control or inside `FieldContent` to keep error messages aligned with the field.

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

## API Reference

### Field.Set

Container that renders a semantic `fieldset` with spacing presets.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Field.Set>
  <Field.Legend>Delivery</Field.Legend>
  <Field.Group>{/* Fields */}</Field.Group>
</Field.Set>
```

### Field.Legend

Legend element for a `Field.Set`. Switch to the `label` variant to align with label sizing.

| Prop      | Type                  | Default    |
| --------- | --------------------- | ---------- |
| `variant` | `"legend" \| "label"` | `"legend"` |
| `class`   | `string`              |            |

```svelte
<Field.Legend variant="label">Notification Preferences</Field.Legend>
```

The `Field.Legend` has two variants: `legend` and `label`. The `label` variant applies label sizing and alignment. Handy if you have nested `Field.Set`.

### Field.Group

Layout wrapper that stacks `Field.Field` components and enables container queries for responsive orientations.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Field.Group class="@container/field-group flex flex-col gap-6">
  <Field.Field>{/* ... */}</Field.Field>
  <Field.Field>{/* ... */}</Field.Field>
</Field.Group>
```

### Field.Field

The core wrapper for a single field. Provides orientation control, invalid state styling, and spacing.

| Prop          | Type                                         | Default      |
| ------------- | -------------------------------------------- | ------------ |
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` |
| `class`       | `string`                                     |              |

Use the `data-invalid` attribute to switch the entire block into an error state.

```svelte
<Field.Field orientation="horizontal">
  <Field.Label for="remember">Remember me</Field.Label>
  <Switch id="remember" />
</Field.Field>
```

### Field.Content

Flex column that groups control and descriptions when the label sits beside the control. Not required if you have no description.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Field.Field>
  <Checkbox id="notifications" />
  <Field.Content>
    <Field.Label for="notifications">Notifications</Field.Label>
    <Field.Description>Email, SMS, and push options.</Field.Description>
  </Field.Content>
</Field.Field>
```

### Field.Label

Label styled for both direct inputs and nested `Field.Field` children.

| Prop      | Type      | Default |
| --------- | --------- | ------- |
| `class`   | `string`  |         |
| `asChild` | `boolean` | `false` |

```svelte
<Field.Label for="email">Email</Field.Label>
```

### Field.Title

Renders a title with label styling inside `Field.Content`.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Field.Content>
  <Field.Title>Enable Touch ID</Field.Title>
  <Field.Description>Unlock your device faster.</Field.Description>
</Field.Content>
```

### Field.Description

Helper text slot that automatically balances long lines in horizontal layouts.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Field.Description>We never share your email with anyone.</Field.Description>
```

### Field.Separator

Visual divider to separate sections inside a `Field.Group`. Accepts optional inline content.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Field.Separator>Or continue with</Field.Separator>
```

### Field.Error

Accessible error container that accepts children or an `errors` array.

| Prop     | Type                                       | Default |
| -------- | ------------------------------------------ | ------- |
| `errors` | `Array<{ message?: string } \| undefined>` |         |
| `class`  | `string`                                   |         |

```svelte
<Field.Error errors={errors.username} />
```

When the `errors` array contains multiple messages, the component renders a list automatically.

`Field.Error` also accepts issues produced by any validator that implements [Standard Schema](https://standardschema.dev/), including Zod, Valibot, and ArkType. Pass the `issues` array from the schema result directly to render a unified error list across libraries.
