---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/alert-dialog
  doc: https://bits-ui.com/docs/components/alert-dialog
  api: https://bits-ui.com/docs/components/alert-dialog#api-reference
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

<ComponentPreview name="alert-dialog-demo" previewClassName="h-56">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="alert-dialog" />
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
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
</script>
```

```svelte showLineNumbers
<AlertDialog.Root>
  <AlertDialog.Trigger>Open</AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
```

## Composition

Use the following composition to build an `AlertDialog`:

```text
AlertDialog.Root
├── AlertDialog.Trigger
└── AlertDialog.Content
    ├── AlertDialog.Header
    │   ├── AlertDialog.Media
    │   ├── AlertDialog.Title
    │   └── AlertDialog.Description
    └── AlertDialog.Footer
        ├── AlertDialog.Cancel
        └── AlertDialog.Action
```

## Examples

### Basic

A basic alert dialog with a title, description, and cancel and continue buttons.

<ComponentPreview name="alert-dialog-basic" previewClassName="h-56">

<div></div>

</ComponentPreview>

### Small

Use the `size="sm"` prop to make the alert dialog smaller.

<ComponentPreview name="alert-dialog-small" previewClassName="h-56">

<div></div>

</ComponentPreview>

### Media

Use the `AlertDialog.Media` component to add a media element such as an icon or image to the alert dialog.

<ComponentPreview name="alert-dialog-media" previewClassName="h-56">

<div></div>

</ComponentPreview>

### Small with Media

Use the `size="sm"` prop to make the alert dialog smaller and the `AlertDialog.Media` component to add a media element such as an icon or image to the alert dialog.

<ComponentPreview name="alert-dialog-small-media" previewClassName="h-56">

<div></div>

</ComponentPreview>

### Destructive

Use the `AlertDialog.Action` component to add a destructive action button to the alert dialog.

<ComponentPreview name="alert-dialog-destructive" previewClassName="h-56">

<div></div>

</ComponentPreview>

## API Reference

Use the `size` prop on the `AlertDialog.Content` component to control the size of the alert dialog. It accepts the following values:

| Prop   | Type                | Default     |
| ------ | ------------------- | ----------- |
| `size` | `"default" \| "sm"` | `"default"` |

For more information about the other components and their props, see the [Bits UI documentation](https://bits-ui.com/docs/components/alert-dialog#api-reference).
