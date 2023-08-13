---
title: Label
description: Renders an accessible label associated with controls.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/label
radix: https://www.radix-svelte.com/docs/label
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/label
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="label-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte add label
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
  import { Label } from "$components/ui/label";
</script>

<Label for="email">Your email address</Label>
```
