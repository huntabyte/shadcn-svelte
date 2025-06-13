---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/input
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

</script>

<ComponentPreview name="input-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="input" />
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
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<Input />
```

## Examples

### Default

<ComponentPreview name="input-demo">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="input-disabled">

<div></div>

</ComponentPreview>

### With Label

<ComponentPreview name="input-with-label">

<div></div>

</ComponentPreview>

### With Text

<ComponentPreview name="input-with-text">

<div></div>

</ComponentPreview>

### With Button

<ComponentPreview name="input-with-button">

<div></div>

</ComponentPreview>

### Invalid

<ComponentPreview name="input-invalid">

<div></div>

</ComponentPreview>

### File

<ComponentPreview name="input-file">

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="form-demo">

<div></div>

</ComponentPreview>
