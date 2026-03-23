---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/accordion
  doc: https://bits-ui.com/docs/components/accordion
  api: https://bits-ui.com/docs/components/accordion#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData } = $props();

</script>

<ComponentPreview name="accordion-demo" class="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="An accordion with three items" align="start">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

<PMAddComp name="accordion" />

{/snippet}

{#snippet manual()}

<Steps>

<Step>

Install `bits-ui`

</Step>

<PMInstall command="bits-ui" />

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
  import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>
```

```svelte showLineNumbers
<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

## Examples

### Basic

<ComponentPreview name="accordion-basic">

<div></div>

</ComponentPreview>

### Multiple

<ComponentPreview name="accordion-multiple">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="accordion-disabled">

<div></div>

</ComponentPreview>

### Borders

<ComponentPreview name="accordion-borders">

<div></div>

</ComponentPreview>

### Card

<ComponentPreview name="accordion-card">

<div></div>

</ComponentPreview>

## API Reference

See the [Accordion API Reference](https://bits-ui.com/docs/components/accordion#api-reference) for a full list of props.
