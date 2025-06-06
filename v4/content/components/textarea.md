---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/textarea
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
</script>

<ComponentPreview name="textarea-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="textarea" />
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
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>
```

```svelte
<Textarea />
```

## Examples

### Default

<ComponentPreview name="textarea-demo">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="textarea-disabled">

<div></div>

</ComponentPreview>

### With Label

<ComponentPreview name="textarea-with-label">

<div></div>

</ComponentPreview>

### With Text

<ComponentPreview name="textarea-with-text">

<div></div>

</ComponentPreview>

### With Button

<ComponentPreview name="textarea-with-button">

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="textarea-form">

<div></div>

</ComponentPreview>
