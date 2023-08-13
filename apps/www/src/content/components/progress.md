---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/progress
radix: https://www.radix-svelte.com/docs/progress
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/progress
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="progress-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add progress
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
  import { Progress } from "$components/ui/progress";
</script>

<Progress value={33} />
```
