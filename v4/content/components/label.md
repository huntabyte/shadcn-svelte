---
title: Label
description: Renders an accessible label associated with controls.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/label
  doc: https://bits-ui.com/docs/components/label
  api: https://bits-ui.com/docs/components/label#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
</script>

<ComponentPreview name="label-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="label" />
{/snippet}
{#snippet manual()}
<Steps>

### Install `bits-ui`:

<PMInstall command="bits-ui -D" />

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Label for="email">Your email address</Label>
```
