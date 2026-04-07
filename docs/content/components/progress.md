---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/progress
  doc: https://bits-ui.com/docs/components/progress
  api: https://bits-ui.com/docs/components/progress#api-reference
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

<ComponentPreview name="progress-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="progress" />
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
  import { Progress } from "$lib/components/ui/progress/index.js";
</script>
```

```svelte showLineNumbers
<Progress value={33} />
```

## Examples

### Label

Use a `Field` component to add a label to the progress bar.

<ComponentPreview name="progress-label">

<div></div>

</ComponentPreview>

### Controlled

A progress bar that can be controlled by a slider.

<ComponentPreview name="progress-controlled">

<div></div>

</ComponentPreview>

## API Reference

### Progress.Root

The progress bar component.

| Prop       | Type             | Default | Description                                                                                     |
| ---------- | ---------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `max`      | `number`         | `100`   | The maximum value of the progress bar.                                                          |
| `min`      | `number`         | `0`     | The minimum value of the progress bar.                                                          |
| `value`    | `number \| null` | `0`     | The current value of the progress bar. If set to `null` the progress bar will be indeterminate. |
| `class`    | `string`         | —       | Additional CSS classes to apply to the element.                                                 |
| `children` | `Snippet`        | —       | The children content to render.                                                                 |
| `child`    | `Snippet`        | —       | Use render delegation to render your own element.                                               |
