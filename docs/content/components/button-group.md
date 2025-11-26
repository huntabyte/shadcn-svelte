---
title: Button Group
description: A container that groups related buttons together with consistent styling.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/button-group
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

<ComponentPreview name="button-group-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="button-group" />
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

```svelte
<script lang="ts">
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>
```

```svelte
<ButtonGroup.Root>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup.Root>
```

## Accessibility

- The `ButtonGroup` component has the `role` attribute set to `group`.
- Use `tabindex` to navigate between the buttons in the group.
- Use `aria-label` or `aria-labelledby` to label the button group.

```svelte
<ButtonGroup aria-label="Button group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

## ButtonGroup vs ToggleGroup

- Use the `ButtonGroup` component when you want to group buttons that perform an action.
- Use the `ToggleGroup` component when you want to group buttons that toggle a state.

## Examples

### Orientation

Set the `orientation` prop to change the button group layout.

<ComponentPreview name="button-group-orientation-demo">

<div></div>

</ComponentPreview>

### Size

Control the size of buttons using the `size` prop on individual buttons.

<ComponentPreview name="button-group-size-demo">

<div></div>

</ComponentPreview>

### Nested

Nest `ButtonGroup` components to create button groups with spacing.

<ComponentPreview name="button-group-nested-demo">

<div></div>

</ComponentPreview>

### Separator

The `ButtonGroupSeparator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

<ComponentPreview name="button-group-separator-demo">

<div></div>

</ComponentPreview>

### Split

Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.

<ComponentPreview name="button-group-split-demo">

<div></div>

</ComponentPreview>

### Input

Wrap an `Input` component with buttons.

<ComponentPreview name="button-group-input-demo">

<div></div>

</ComponentPreview>

### Input Group

Wrap an `InputGroup` component to create complex input layouts.

<ComponentPreview name="button-group-input-group-demo">

<div></div>

</ComponentPreview>

### Dropdown Menu

Create a split button group with a `DropdownMenu` component.

<ComponentPreview name="button-group-dropdown-menu-demo">

<div></div>

</ComponentPreview>

### Select

Pair with a `Select` component.

<ComponentPreview name="button-group-select-demo">

<div></div>

</ComponentPreview>

### Popover

Use with a `Popover` component.

<ComponentPreview name="button-group-popover-demo">

<div></div>

</ComponentPreview>
