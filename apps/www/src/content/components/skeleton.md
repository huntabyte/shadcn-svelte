---
title: Skeleton
description: Use to show a placeholder while content is loading.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/skeleton
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="skeleton-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add skeleton
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton";
</script>
```

```svelte
<Skeleton class="w-[100px] h-[20px] rounded-full" />
```
