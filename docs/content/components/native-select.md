---
title: Native Select
description: A styled native HTML select element with consistent design system integration.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/native-select
---

<script>
    import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
    import PMAddComp from "$lib/components/pm-add-comp.svelte";
    import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
    import Step from "$lib/components/step.svelte";
    import Steps from "$lib/components/steps.svelte";
    import Callout from "$lib/components/callout.svelte";
    import InfoIcon from "@lucide/svelte/icons/info";
</script>

<Callout variant="info" icon={InfoIcon} class="!translate-y-[3px]" >

For a styled select component, see the [Select](/docs/components/select) component.

</Callout>

<ComponentPreview name="native-select-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="native-select" />
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
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>
```

```svelte showLineNumbers
<NativeSelect.Root>
  <NativeSelect.Option value="">Select a fruit</NativeSelect.Option>
  <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
  <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
  <NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
  <NativeSelect.Option value="grapes" disabled>Grapes</NativeSelect.Option>
  <NativeSelect.Option value="pineapple">Pineapple</NativeSelect.Option>
</NativeSelect.Root>
```

## Composition

### Simple

Options placed directly under `NativeSelect` (no `NativeSelect.OptGroup`).

```text
NativeSelect.Root
├── NativeSelect.Option
├── NativeSelect.Option
├── NativeSelect.Option
└── NativeSelect.Option
```

### With groups

Use `NativeSelect.OptGroup` to organize options into categories.

```text
NativeSelect.Root
├── NativeSelect.OptGroup
│   ├── NativeSelect.Option
│   └── NativeSelect.Option
└── NativeSelect.OptGroup
    ├── NativeSelect.Option
    └── NativeSelect.Option
```

## Examples

### Groups

Use `NativeSelect.OptGroup` to organize options into categories.

<ComponentPreview name="native-select-groups" >

<div></div>

</ComponentPreview>

### Disabled

Add the `disabled` prop to the `NativeSelect` component to disable the select.

<ComponentPreview name="native-select-disabled" >

<div></div>

</ComponentPreview>

### Invalid State

Use `aria-invalid` to show validation errors and the `data-invalid` attribute to the `Field` component for styling.

<ComponentPreview name="native-select-invalid" >

<div></div>

</ComponentPreview>

## Native Select vs Select

- Use `NativeSelect` when you need native browser behavior, better performance, or mobile-optimized dropdowns.
- Use `Select` when you need custom styling, animations, or complex interactions.

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
