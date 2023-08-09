---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/switch
radix: https://www.radix-svelte.com/docs/switch
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/switch
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="switch-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add switch
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
  import { Switch } from "$components/ui/switch";
</script>

<Switch />
```
