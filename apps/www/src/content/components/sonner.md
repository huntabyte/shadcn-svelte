---
title: Sonner
description: An opinionated toast component for Svelte.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/sonner
---

<script>
  import { ComponentPreview, ManualInstall, Steps, Step } from '$lib/components/docs';
</script>

<ComponentPreview name="sonner-demo">

<div />

</ComponentPreview>

## About

The Sonner component is provided by [svelte-sonner](https://svelte-sonner.vercel.app/), which is a Svelte port of [Sonner](https://sonner.emilkowal.ski/), originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

## Installation

<Steps>

<Step>
	Run the following command:
</Step>

```bash
npx shadcn-svelte@latest add sonner
```

<Step>
	Add the Toaster component
</Step>

```svelte title="+layout.svelte" {2,5}
<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner";
</script>

<Toaster />

<slot />
```

</Steps>

<ManualInstall>

1. Install `svelte-sonner`:

```bash
npm install svelte-sonner
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button";
</script>

<Button on:click={() => toast("Hello world")}>Show toast</Button>
```
