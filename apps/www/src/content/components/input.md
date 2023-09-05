---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/input
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="input-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add input
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Input } from "$lib/components/ui/input";
</script>

<Input />
```

## Examples

### Default

<ComponentPreview name="input-demo">

<div />

</ComponentPreview>

### Disabled

<ComponentPreview name="input-disabled">

<div />

</ComponentPreview>

### With Label

<ComponentPreview name="input-with-label">

<div />

</ComponentPreview>

### With Text

<ComponentPreview name="input-with-text">

<div />

</ComponentPreview>

### With Button

<ComponentPreview name="input-with-button">

<div />

</ComponentPreview>

### File

<ComponentPreview name="input-file">

<div />

</ComponentPreview>

### Form

When using the input within a form, you'll want to use the `<Form.Input />` component instead. This is a wrapper around your existing `<Input />` component with some additional functionality for forms.

<ComponentPreview name="form-demo">

<div />

</ComponentPreview>
