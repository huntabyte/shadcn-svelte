---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/textarea
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp } from '$lib/components/docs';
</script>

<ComponentPreview name="textarea-demo">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="textarea" />

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";
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
