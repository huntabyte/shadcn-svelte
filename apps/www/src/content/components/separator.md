---
title: Separator
description: Visually or semantically separates content.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/separator
bits: https://www.bits-ui.com/docs/components/separator
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="separator-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add separator
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
  import { Separator } from "$lib/components/ui/separator";
</script>

<Separator />
```
