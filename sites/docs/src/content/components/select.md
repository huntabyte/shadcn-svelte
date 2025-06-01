---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/select
bits: https://www.bits-ui.com/docs/components/select
---

<script>
    import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs'
</script>

<ComponentPreview name="select-demo">

<div />

</ComponentPreview>

## Installation

<PMAddComp name="select" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Select from "$lib/components/ui/select";
</script>

<Select.Root>
  <Select.Trigger class="w-[180px]">
    <Select.Value placeholder="Theme" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="light">Light</Select.Item>
    <Select.Item value="dark">Dark</Select.Item>
    <Select.Item value="system">System</Select.Item>
  </Select.Content>
</Select.Root>
```

## Examples

### Form

For more advanced usage and to learn how to implement `multiple` Select components in a form, check out the [Bits UI Select Recipe](https://formsnap.dev/docs/recipes/bits-ui-select) on Formsnap.

<ComponentPreview name="select-form">

<div />

</ComponentPreview>
