---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/select
bits: https://www.bits-ui.com/docs/components/select
---

<script>
    import { ComponentPreview, ManualInstall } from '$lib/components/docs'
</script>

<ComponentPreview name="select-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add select
```

<ManualInstall>

1. Install `bits-ui`:

```bash
npm install bits-ui
```

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

When using the select component in a form, you'll want to use the `<Form.Select/>` component, which is a wrapper around your existing `<Select/>` component that makes it seamlessly integrate with forms.

<ComponentPreview name="select-form">

<div />

</ComponentPreview>
