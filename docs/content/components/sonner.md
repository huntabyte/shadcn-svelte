---
title: Sonner
description: An opinionated toast component for Svelte.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/sonner
  doc: https://svelte-sonner.vercel.app/
  api: https://github.com/wobsoriano/svelte-sonner
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="sonner-demo">

<div></div>

</ComponentPreview>

## About

The Sonner component is provided by [svelte-sonner](https://svelte-sonner.vercel.app/), which is a Svelte port of [Sonner](https://sonner.emilkowal.ski/), originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

## Installation

<Step>Setup theme support</Step>

By default, Sonner will use the user's system preferences to determine whether to show the light or dark theme. To get around this, you can either pass in a custom `theme` prop to the component, or simply use [mode-watcher](https://github.com/svecosystem/mode-watcher) which you can hardcode to `dark` or `light` mode should you wish.

You can learn more about setting up Dark Mode support [here](/docs/dark-mode).

If you wish to opt out of Dark Mode support, you can uninstall `mode-watcher` and remove the `theme` prop from the component after installing via CLI, or manually install the component and don't include `mode-watcher`

<InstallTabs>
{#snippet cli()}
<Steps>

<Step>Run the following command:</Step>
<PMAddComp name="sonner" />

<Step>Add the Toaster component</Step>

```svelte showLineNumbers title="+layout.svelte" {2,6}
<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  let { children } = $props();
</script>

<Toaster />

{@render children?.()}
```

</Steps>
{/snippet}
{#snippet manual()}

<Steps>
<Step>

Install `svelte-sonner`:

</Step>

<PMInstall command="svelte-sonner -D" />

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

<Step>Add the Toaster component</Step>

```svelte showLineNumbers title="+layout.svelte" {2,6}
<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  let { children } = $props();
</script>

<Toaster />

{@render children?.()}
```

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
</script>
```

```svelte
<Button onclick={() => toast("Hello world")}>Show toast</Button>
```
