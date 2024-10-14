---
title: Toggle
description: A two-state button that can be either on or off.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/toggle
  doc: https://next.bits-ui.com/docs/components/toggle
  api: https://next.bits-ui.com/docs/components/toggle#api-reference
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="toggle-demo">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="toggle" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui -D" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Toggle } from "$lib/components/ui/toggle";
</script>

<Toggle>Toggle</Toggle>
```

## Examples

### Default

<ComponentPreview name="toggle-demo">

<div></div>

</ComponentPreview>

### Outline

<ComponentPreview name="toggle-outline">

<div></div>

</ComponentPreview>

### With Text

<ComponentPreview name="toggle-with-text">

<div></div>

</ComponentPreview>

### Small

<ComponentPreview name="toggle-sm">

<div></div>

</ComponentPreview>

### Large

<ComponentPreview name="toggle-lg">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="toggle-disabled">

<div></div>

</ComponentPreview>
