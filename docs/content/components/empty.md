---
title: Empty
description: Use the Empty component to display a empty state.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/empty
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="empty-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="empty" />
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

### Outline

Use the `border` utility class to create a outline empty state.

<ComponentPreview name="empty-outline-demo">

<div></div>

</ComponentPreview>

### Background

Use the `bg-*` and `bg-gradient-*` utilities to add a background to the empty state.

<ComponentPreview name="empty-background-demo">

<div></div>

</ComponentPreview>

### Avatar

Use the `EmptyMedia` component to display an avatar in the empty state.

<ComponentPreview name="empty-avatar-demo">

<div></div>

</ComponentPreview>

### Avatar Group

Use the `EmptyMedia` component to display an avatar group in the empty state.

<ComponentPreview name="empty-avatar-group-demo">

<div></div>

</ComponentPreview>

### InputGroup

You can add an `InputGroup` component to the `EmptyContent` component.

<ComponentPreview name="empty-input-group-demo">

<div></div>

</ComponentPreview>
