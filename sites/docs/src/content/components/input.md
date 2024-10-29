---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/input
---

<script>
  import { ComponentPreview, PMAddComp, Step, Steps, InstallTabs } from '$lib/components/docs';

  export let form;
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
<Step>Copy and paste the component source files linked at the top of this page into your project.</Step>
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

### File

<ComponentPreview name="input-file">

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="form-demo" {form}>

<div></div>

</ComponentPreview>
