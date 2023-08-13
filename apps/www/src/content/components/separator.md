---
title: Separator
description: Visually or semantically separates content.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/separator
radix: https://www.radix-svelte.com/docs/separator
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/separator
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="separator-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add separator
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
  import { Separator } from "$components/ui/separator";
</script>

<Separator />
```
