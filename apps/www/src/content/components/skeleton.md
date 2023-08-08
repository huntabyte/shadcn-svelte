---
title: Skeleton
description: Use to show a placeholder while content is loading.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/skeleton
---

<script>
  import { ComponentExample, ManualInstall } from '$lib/components/docs';
  import { SkeletonDemo } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/skeleton/skeleton-demo.svelte">

<div slot="example">
<SkeletonDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add skeleton
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Skeleton } from "$components/ui/skeleton";
</script>
```

```svelte
<Skeleton class="w-[100px] h-[20px] rounded-full" />
```
