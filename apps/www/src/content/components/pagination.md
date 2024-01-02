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

<ComponentPreview name="pagination-demo" >

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

<Pagination.Root count={100} perPage={10} let:pages let:currentPage>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.PrevButton />
    </Pagination.Item>
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
      {:else}
        <Pagination.Item>
          <Pagination.Link {page} isActive={currentPage == page.value}>
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton />
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
```
