---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/select
  doc: https://bits-ui.com/docs/components/select
  api: https://bits-ui.com/docs/components/select#api-reference
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

<ComponentPreview name="select-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="select" />
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

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";
</script>
```

```svelte showLineNumbers
<Select.Root type="single">
  <Select.Trigger class="w-[180px]"></Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Item value="light">Light</Select.Item>
      <Select.Item value="dark">Dark</Select.Item>
      <Select.Item value="system">System</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>
```

## Examples

### Align Item

<ComponentPreview name="select-align-item">

<div></div>

</ComponentPreview>

### Groups

<ComponentPreview name="select-groups">

<div></div>

</ComponentPreview>

### Scrollable

<ComponentPreview name="select-scrollable">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="select-disabled">

<div></div>

</ComponentPreview>

### Invalid

<ComponentPreview name="select-invalid">

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="select-form">

<div></div>

</ComponentPreview>

## API Reference

See the [Select API Reference](https://bits-ui.com/docs/components/select#api-reference) for a full list of props.
