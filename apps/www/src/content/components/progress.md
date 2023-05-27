---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/progress
radix: https://www.radix-svelte.com/docs/progress
---

<script>
  import { ProgressDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/progress/ProgressDemo.svelte">

<div slot="example" style="width: 60%;">
<ProgressDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add progress
```

<ManualInstall>

1. Install `radix-svelte`:

```bash
npm install radix-svelte
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Progress } from "$components/ui/progress";
</script>
```

```svelte
<Progress value={33}>
```
