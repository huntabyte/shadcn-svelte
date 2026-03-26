---
title: Alert
description: Displays a callout for user attention.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/alert
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="alert-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="alert" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Alert from "$lib/components/ui/alert/index.js";
</script>
```

```svelte showLineNumbers
<Alert.Root>
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description>
    You can add components to your app using the cli.
  </Alert.Description>
</Alert.Root>
```

## Examples

### Basic

<ComponentPreview name="alert-basic">

<div></div>

</ComponentPreview>

### Destructive

Use `variant="destructive"` to create a destructive alert.

<ComponentPreview name="alert-destructive">

<div></div>

</ComponentPreview>

### Action

Use `Alert.Action` to add a button or other action element to the alert.

<ComponentPreview name="alert-action">

<div></div>

</ComponentPreview>

### Custom Colors

You can customize the alert colors by adding custom classes such as `bg-amber-50 dark:bg-amber-950` to the `Alert.Root` component.

<ComponentPreview name="alert-colors">

<div></div>

</ComponentPreview>
