---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/toggle-group
  doc: https://bits-ui.com/docs/components/toggle-group
  api: https://bits-ui.com/docs/components/toggle-group#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="toggle-group-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="toggle-group" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `bits-ui`:

</Step>

<PMInstall command="bits-ui -D" />

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

```svelte
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>
```

```svelte
<ToggleGroup.Root type="single">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
```

## Examples

### Outline

Use `variant="outline"` for an outline style.

<ComponentPreview name="toggle-group-outline">

<div></div>

</ComponentPreview>

### Large

Use the `size` prop to change the size of the toggle group.

<ComponentPreview name="toggle-group-lg">

<div></div>

</ComponentPreview>

### Spacing

Use `spacing={2}` to add spacing between toggle group items.

<ComponentPreview name="toggle-group-spacing">

<div></div>

</ComponentPreview>

### Vertical

Use `orientation="vertical"` for vertical toggle groups.

<ComponentPreview name="toggle-group-vertical">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="toggle-group-disabled">

<div></div>

</ComponentPreview>

### Single

<ComponentPreview name="toggle-group-single">

<div></div>

</ComponentPreview>

## API Reference

### ToggleGroup.Root

The root component which contains the toggle group items.

| Prop              | Type                                                   | Default        | Description                                                                                                                                |
| ----------------- | ------------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `type` (required) | `'single' \| 'multiple'`                               | —              | The type of the component, used to determine the type of the value. When `'multiple'`, the value will be an array.                         |
| `value`           | `string \| string[]`                                   | —              | The value of the toggle group. If the `type` is `'multiple'`, this will be an array of strings, otherwise it will be a string.             |
| `onValueChange`   | `(value: string) => void \| (value: string[]) => void` | —              | A callback function called when the value of the toggle group changes. The type of the value is dependent on the type of the toggle group. |
| `disabled`        | `boolean`                                              | `false`        | Whether or not the toggle group is disabled.                                                                                               |
| `loop`            | `boolean`                                              | `true`         | Whether or not the toggle group should loop when navigating.                                                                               |
| `orientation`     | `'horizontal' \| 'vertical'`                           | `'horizontal'` | The orientation of the toggle group.                                                                                                       |
| `rovingFocus`     | `boolean`                                              | `true`         | Whether or not the toggle group should use roving focus when navigating.                                                                   |
| `children`        | `Snippet`                                              | —              | The children content to render.                                                                                                            |
| `child`           | `Snippet`                                              | —              | Use render delegation to render your own element.                                                                                          |

Use the `data-orientation` attribute to style the toggle group based on its orientation. Use the `data-toggle-group-root` attribute to target the root element.

### ToggleGroup.Item

An individual toggle item within the group.

| Prop               | Type      | Default | Description                                       |
| ------------------ | --------- | ------- | ------------------------------------------------- |
| `value` (required) | `string`  | —       | The value of the item.                            |
| `disabled`         | `boolean` | `false` | Whether or not the item is disabled.              |
| `children`         | `Snippet` | —       | The children content to render.                   |
| `child`            | `Snippet` | —       | Use render delegation to render your own element. |

Use the `data-state` attribute (`'on' \| 'off'`) to style the item based on its active state. Use the `data-disabled` attribute to style disabled items. Use the `data-orientation` attribute to style based on the group's orientation.
