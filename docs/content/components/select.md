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
<script lang="ts">
  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];
</script>

<Select.Root type="single" items={themes}>
  <Select.Trigger class="w-[180px]">
    <Select.Value placeholder="Select a theme" />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      {#each themes as theme (theme.value)}
        <Select.Item value={theme.value} label={theme.label}
          >{theme.label}</Select.Item
        >
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
```

## Composition

`Select.Value` renders the label of the selected item, falling back to `placeholder` when nothing is selected.

It reads the label from the matching `Select.Item`, which only exists in the DOM while the menu is open. Pass `items` to `Select.Root` so the label survives the menu closing:

```svelte showLineNumbers
<script lang="ts">
  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];
</script>

<Select.Root type="single" items={themes}>
  <Select.Trigger class="w-[180px]">
    <Select.Value placeholder="Select a theme" />
  </Select.Trigger>
  <Select.Content>
    {#each themes as theme (theme.value)}
      <Select.Item value={theme.value}>{theme.label}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
```

Without `items` the trigger falls back to the raw value, so you only need it when an item's label differs from its value.

Use the following composition to build a `Select`:

```text
Select.Root
├── Select.Trigger
└── Select.Content
    ├── Select.Group
    │   ├── Select.Label
    │   ├── Select.Item
    │   └── Select.Item
    ├── Select.Separator
    └── Select.Group
        ├── Select.Label
        ├── Select.Item
        └── Select.Item
```

## Align Item With Trigger

Use `Select.Item` contents that match the trigger width and alignment.

<ComponentPreview name="select-align-item">

<div></div>

</ComponentPreview>

## Groups

Use `Select.Group`, `Select.Label`, and `Select.Separator` to organize items.

<ComponentPreview name="select-groups">

<div></div>

</ComponentPreview>

## Scrollable

A select with many items that scrolls.

<ComponentPreview name="select-scrollable">

<div></div>

</ComponentPreview>

## Disabled

<ComponentPreview name="select-disabled">

<div></div>

</ComponentPreview>

## Invalid

Add the `data-invalid` attribute to the `Field.Field` component and the `aria-invalid` attribute to the `Select.Trigger` component to show an error state.

<ComponentPreview name="select-invalid">

<div></div>

</ComponentPreview>

## Form

<ComponentPreview name="select-form">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/select#api-reference) documentation for more information.
