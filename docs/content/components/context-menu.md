---
title: Context Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by right click.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/context-menu
  doc: https://bits-ui.com/docs/components/context-menu
  api: https://bits-ui.com/docs/components/context-menu#api-reference
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

<ComponentPreview name="context-menu-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="context-menu" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `bits-ui`:

</Step>

<PMInstall command="bits-ui -D" />

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
</script>
```

```svelte
<ContextMenu.Root>
  <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Profile</ContextMenu.Item>
    <ContextMenu.Item>Billing</ContextMenu.Item>
    <ContextMenu.Item>Team</ContextMenu.Item>
    <ContextMenu.Item>Subscription</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
```
