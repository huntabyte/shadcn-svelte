---
title: Sonner
description: An opinionated toast component for Svelte.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/sonner
---

<script>
  import { ComponentPreview, ManualInstall, Steps, Step, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="sonner-demo">

<div />

</ComponentPreview>

## About

The Sonner component is provided by [svelte-sonner](https://svelte-sonner.vercel.app/), which is a Svelte port of [Sonner](https://sonner.emilkowal.ski/), originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

## Installation

<Steps>

<Step>
	Setup theme support
</Step>

By default, Sonner will use the user's system preferences to determine whether to show the light or dark theme. To get around this, you can either pass in a custom `theme` prop to the component, or simply use [mode-watcher](https://github.com/svecosystem/mode-watcher) which you can hardcode to `dark` or `light` mode should you wish.

You can learn more about setting up Dark Mode support [here](/docs/dark-mode).

If you wish to opt out of Dark Mode support, you can uninstall `mode-watcher` and remove the `theme` prop from the component after installing via CLI, or manually install the component and don't include `mode-watcher`

<Step>
	Run the following command:
</Step>

<PMAddComp name="sonner" />

<Step>
	Add the Toaster component
</Step>

Note: Make sure you are adding the import from the path `"$lib/components/ui/sonner"` not `"svelte-sonner"`.

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

<PMInstall command="svelte-sonner" />

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
