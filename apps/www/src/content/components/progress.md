---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/progress
bits: https://www.bits-ui.com/docs/components/progress
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="progress-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add progress
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
  import { Progress } from "$lib/components/ui/progress";
</script>

<Progress value={33} />
```
