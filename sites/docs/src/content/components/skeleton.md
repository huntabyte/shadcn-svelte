---
title: Skeleton
description: Use to show a placeholder while content is loading.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/skeleton
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="skeleton-demo">

<div />

</ComponentPreview>

## Installation

<PMAddComp name="skeleton" />

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
<Skeleton class="h-[20px] w-[100px] rounded-full" />
```
