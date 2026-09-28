---
title: Input Group
description: Add addons, buttons, and helper content to inputs.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/input-group
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
	import Callout from "$lib/components/callout.svelte";
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
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
</script>
```

```svelte showLineNumbers
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

### Align

Use the `align` prop on `InputGroup.Addon` to position the addon relative to the input.

<Callout>

For proper focus management, `InputGroup.Addon` should always be placed after `InputGroup.Input` or `InputGroup.Textarea` in the DOM. Use the `align` prop to visually position the addon.

</Callout>

#### inline-start

Use `align="inline-start"` to position the addon at the start of the input. This is the default.

<ComponentPreview name="input-group-inline-start">

<div></div>

</ComponentPreview>

#### inline-end

Use `align="inline-end"` to position the addon at the end of the input.

<ComponentPreview name="input-group-inline-end">

<div></div>

</ComponentPreview>

#### block-start

Use `align="block-start"` to position the addon above the input.

<ComponentPreview name="input-group-block-start">

<div></div>

</ComponentPreview>

#### block-end

Use `align="block-end"` to position the addon below the input.

<ComponentPreview name="input-group-block-end">

<div></div>

</ComponentPreview>

### Icon

<ComponentPreview name="input-group-icon-demo">

<div></div>

</ComponentPreview>

### Text

<ComponentPreview name="input-group-text-demo">

<div></div>

</ComponentPreview>

### Button

<ComponentPreview name="input-group-button-demo">

<div></div>

</ComponentPreview>

### Kbd

<ComponentPreview name="input-group-kbd">

<div></div>

</ComponentPreview>

### Dropdown

<ComponentPreview name="input-group-dropdown-demo">

<div></div>

</ComponentPreview>

### Spinner

<ComponentPreview name="input-group-spinner-demo">

<div></div>

</ComponentPreview>

### Textarea

<ComponentPreview name="input-group-textarea-demo">

<div></div>

</ComponentPreview>

### Custom Input

Add the `data-slot="input-group-control"` attribute to your custom input for automatic focus state handling.

Here's an example of a custom auto-resizing textarea.

<ComponentPreview name="input-group-custom-input-demo">

<div></div>

</ComponentPreview>
