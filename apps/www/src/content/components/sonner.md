---
title: Sonner
description: An opinionated toast component for Svelte.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/sonner
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="sonner-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add sonner
```

<ManualInstall>

1. Install `sonner-svelte`:

```bash
npm install sonner-svelte
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

Add the `Sonner` component to your layout file.

```svelte title="+layout.svelte"
<script lang="ts">
  import { Sonner } from "$lib/components/ui/sonner";
</script>

<Sonner />

<slot />
```

Call the `toast` function from anywhere in your app.

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<Button on:click={() => toast("Hello world")}>Show toast</Button>
```
