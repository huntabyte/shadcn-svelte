---
title: Label
description: Renders an accessible label associated with controls.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/label
bits: https://www.bits-ui.com/docs/components/label
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="label-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add label
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
  import { Label } from "$lib/components/ui/label";
</script>

<Label for="email">Your email address</Label>
```
