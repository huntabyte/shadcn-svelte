---
title: Separator
description: Visually or semantically separates content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/separator
  doc: https://bits-ui.com/docs/components/separator
  api: https://bits-ui.com/docs/components/separator#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="separator-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="separator" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `bits-ui`:

</Step>

<PMInstall command="bits-ui -D" />

<Step>

Copy and paste the component source files linked at the top of this page into your project.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Separator } from "$lib/components/ui/separator/index.js";
</script>

<Separator />
```
