---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/dialog
  doc: https://bits-ui.com/docs/components/dialog
  api: https://bits-ui.com/docs/components/dialog#api-reference
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

<ComponentPreview name="dialog-demo" description="A dialog for editing profile details.">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="dialog" />
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
  import * as Dialog from "$lib/components/ui/dialog/index.js";
</script>
```

```svelte showLineNumbers
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
```

## Composition

Use the following composition to build a `Dialog`:

```text
Dialog.Root
├── Dialog.Trigger
└── Dialog.Content
    ├── Dialog.Header
    │   ├── Dialog.Title
    │   └── Dialog.Description
    └── Dialog.Footer
```

## Examples

### Custom close button

Replace the default close control with your own button.

<ComponentPreview name="dialog-close-button" >

<div></div>

</ComponentPreview>

### No Close Button

Use `showCloseButton={false}` to hide the close button.

<ComponentPreview name="dialog-no-close-button">

<div></div>

</ComponentPreview>

### Sticky Footer

Keep actions visible while the content scrolls.

<ComponentPreview name="dialog-sticky-footer">

<div></div>

</ComponentPreview>

### Scrollable Content

Long content can scroll while the header stays in view.

<ComponentPreview name="dialog-scrollable">

<div></div>

</ComponentPreview>

## Notes

To use the `Dialog` component from within a `Context Menu` or `Dropdown Menu`, you must encase the `Context Menu` or
`Dropdown Menu` component in the `Dialog` component.

```svelte showLineNumbers title="components/example-dialog-context-menu.svelte" {1, 26}
<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Dialog.Root>
  <ContextMenu.Root>
    <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
    <ContextMenu.Content>
      <ContextMenu.Item>Open</ContextMenu.Item>
      <ContextMenu.Item>Download</ContextMenu.Item>
      <Dialog.Trigger>
        {#snippet child({ props })}
          <ContextMenu.Item {...props}>
            <span>Delete</span>
          </ContextMenu.Item>
        {/snippet}
      </Dialog.Trigger>
    </ContextMenu.Content>
  </ContextMenu.Root>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Button type="submit">Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/dialog#api-reference) documentation for more information.
