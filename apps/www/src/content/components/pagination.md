---
title: Pagination
description: Pagination with page navigation, next and previous links.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/pagination
bits: https://www.bits-ui.com/docs/components/pagination
---

<script>
    import { ComponentPreview, ManualInstall } from '$components/docs';
</script>

<ComponentPreview name="pagination-demo" class="[&_[data-melt-pagination]]:sm:max-w-[70%]">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add pagination
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
  import * as Pagination from "$lib/components/ui/pagination";
</script>

<Pagination.Root>

</Accordion.Root>
```
