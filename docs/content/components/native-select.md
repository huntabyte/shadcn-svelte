---
title: Native Select
description: A styled native HTML select element with consistent design system integration.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/native-select
---

<script>
    import ComponentPreview from "$lib/components/component-preview.svelte";
    import PMAddComp from "$lib/components/pm-add-comp.svelte";
    import InstallTabs from "$lib/components/install-tabs.svelte";
    import Step from "$lib/components/step.svelte";
    import Steps from "$lib/components/steps.svelte";
</script>

<ComponentPreview name="native-select-demo" />

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="native-select" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the component source files linked at the top of this page into your project.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
</script>

<NativeSelect.Root>
  <NativeSelect.Option value="">Select a fruit</NativeSelect.Option>
  <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
  <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
  <NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
  <NativeSelect.Option value="grapes" disabled>Grapes</NativeSelect.Option>
  <NativeSelect.Option value="pineapple">Pineapple</NativeSelect.Option>
</NativeSelect.Root>
```

## Examples

### With Groups

Organize options using `NativeSelect.OptGroup` for better categorization.

<ComponentPreview name="native-select-groups" />

```svelte showLineNumbers
<NativeSelect.Root>
  <NativeSelect.Option value="">Select a food</NativeSelect.Option>
  <NativeSelect.OptGroup label="Fruits">
    <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
    <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
    <NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
  </NativeSelect.OptGroup>
  <NativeSelect.OptGroup label="Vegetables">
    <NativeSelect.Option value="carrot">Carrot</NativeSelect.Option>
    <NativeSelect.Option value="broccoli">Broccoli</NativeSelect.Option>
    <NativeSelect.Option value="spinach">Spinach</NativeSelect.Option>
  </NativeSelect.OptGroup>
</NativeSelect.Root>
```

### Disabled State

Disable individual options or the entire select component.

<ComponentPreview name="native-select-disabled" />

### Invalid State

Show validation errors with the `aria-invalid` attribute and error styling.

<ComponentPreview name="native-select-invalid" />

```svelte showLineNumbers
<NativeSelect.Root aria-invalid="true">
  <NativeSelect.Option value="">Select a country</NativeSelect.Option>
  <NativeSelect.Option value="us">United States</NativeSelect.Option>
  <NativeSelect.Option value="uk">United Kingdom</NativeSelect.Option>
  <NativeSelect.Option value="ca">Canada</NativeSelect.Option>
</NativeSelect.Root>
```

## Native Select vs Select

- Use `NativeSelect` when you need native browser behavior, better performance, or mobile-optimized dropdowns.
- Use `Select` when you need custom styling, animations, or complex interactions.

The `NativeSelect` component provides native HTML select functionality with consistent styling that matches your design system.

## Accessibility

- The component maintains all native HTML select accessibility features.
- Screen readers can navigate through options using arrow keys.
- The chevron icon is marked as `aria-hidden="true"` to avoid duplication.
- Use `aria-label` or `aria-labelledby` for additional context when needed.

```tsx showLineNumbers
<NativeSelect aria-label="Choose your preferred language">
  <NativeSelectOption value="en">English</NativeSelectOption>
  <NativeSelectOption value="es">Spanish</NativeSelectOption>
  <NativeSelectOption value="fr">French</NativeSelectOption>
</NativeSelect>
```

## API Reference

### NativeSelect.Root

The main select component that wraps the native HTML select element.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

All other props are passed through to the underlying `<select>` element.

```svelte
<NativeSelect.Root>
  <NativeSelect.Option value="option1">Option 1</NativeSelect.Option>
  <NativeSelect.Option value="option2">Option 2</NativeSelect.Option>
</NativeSelect.Root>
```

### NativeSelect.Option

Represents an individual option within the select.

| Prop       | Type      | Default |
| ---------- | --------- | ------- |
| `value`    | `string`  |         |
| `disabled` | `boolean` | `false` |
| `class`    | `string`  |         |

All other props are passed through to the underlying `<option>` element.

```svelte
<NativeSelect.Option value="apple">Apple</NativeSelect.Option>
<NativeSelect.Option value="banana" disabled>Banana</NativeSelect.Option>
```

### NativeSelect.OptGroup

Groups related options together for better organization.

| Prop       | Type      | Default |
| ---------- | --------- | ------- |
| `label`    | `string`  |         |
| `disabled` | `boolean` | `false` |
| `class`    | `string`  |         |

All other props are passed through to the underlying `<optgroup>` element.

```svelte
<NativeSelect.OptGroup label="Fruits">
  <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
  <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
</NativeSelect.OptGroup>
```
