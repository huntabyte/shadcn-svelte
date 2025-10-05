---
title: Input Group
description: Display additional information or actions to an input or textarea.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/input-group
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="input-group-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="input-group" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `@lucide/svelte`:

</Step>

<PMInstall command="@lucide/svelte -D" />

<Step>

Copy and paste the component source files linked at the top of this page into your project.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
</script>

<InputGroup.Root>
  <InputGroup.Input placeholder="Search..." />
  <InputGroup.Addon>
    <SearchIcon />
  </InputGroup.Addon>
  <InputGroup.Addon align="inline-end">
    <InputGroup.Button>Search</InputGroup.Button>
  </InputGroup.Addon>
</InputGroup.Root>
```

## Examples

### Icon

<ComponentPreview name="input-group-icon-demo">

<div></div>

</ComponentPreview>

### Text

Display additional text information alongside inputs.

<ComponentPreview name="input-group-text-demo">

<div></div>

</ComponentPreview>

### Button

Add buttons to perform actions within the input group.

<ComponentPreview name="input-group-button-demo">

<div></div>

</ComponentPreview>

### Tooltip

Add tooltips to provide additional context or help.

<ComponentPreview name="input-group-tooltip-demo">

<div></div>

</ComponentPreview>

### Textarea

Input groups also work with textarea components. Use `block-start` or `block-end` for alignment.

<ComponentPreview name="input-group-textarea-demo">

<div></div>

</ComponentPreview>

### Spinner

Show loading indicators while processing input.

<ComponentPreview name="input-group-spinner-demo">

<div></div>

</ComponentPreview>

### Label

Add labels within input groups to improve accessibility.

<ComponentPreview name="input-group-label-demo">

<div></div>

</ComponentPreview>

### Dropdown

Pair input groups with dropdown menus for complex interactions.

<ComponentPreview name="input-group-dropdown-demo">

<div></div>

</ComponentPreview>

### Button Group

Wrap input groups with button groups to create prefixes and suffixes.

<ComponentPreview name="input-group-button-group-demo">

<div></div>

</ComponentPreview>

### Custom Input

Add the `data-slot="input-group-control"` attribute to your custom input for automatic behavior and focus state handling.

No style is applied to the custom input. Apply your own styles using the `class` prop.

<ComponentPreview name="input-group-custom-input-demo">

<div></div>

</ComponentPreview>
