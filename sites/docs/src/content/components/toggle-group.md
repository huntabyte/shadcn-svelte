---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/toggle-group
bits: https://www.bits-ui.com/docs/components/toggle-group
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="toggle-group-demo">

<div />

</ComponentPreview>

## Installation

<PMAddComp name="toggle-group" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group";
</script>

<ToggleGroup.Root type="single">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
```

## Examples

### Default

<ComponentPreview name="toggle-group-demo">

<div />

</ComponentPreview>

### Outline

<ComponentPreview name="toggle-group-outline">

<div />

</ComponentPreview>

### Single

<ComponentPreview name="toggle-group-single">

<div />

</ComponentPreview>

### Small

<ComponentPreview name="toggle-group-sm">

<div />

</ComponentPreview>

### Large

<ComponentPreview name="toggle-group-lg">

<div />

</ComponentPreview>

### Disabled

<ComponentPreview name="toggle-group-disabled">

<div />

</ComponentPreview>
