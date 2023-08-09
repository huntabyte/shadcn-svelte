---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/select
radix: https://www.radix-svelte.com/docs/radiogroup
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/radiogroup
---

<script>
    import { ComponentPreview, ManualInstall } from '$lib/components/docs'
</script>

<ComponentPreview name="select-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add select
```

<ManualInstall>

1. Install `@huntabyte/primitives`:

```bash
npm install @huntabyte/primitives
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Select from "$components/ui/select";
</script>

<Select.Root>
  <Select.Trigger className="w-[180px]">
    <Select.Value placeholder="Theme" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="light">Light</Select.Item>
    <Select.Item value="dark">Dark</Select.Item>
    <Select.Item value="system">System</Select.Item>
  </Select.Content>
</Select.Root>
```
