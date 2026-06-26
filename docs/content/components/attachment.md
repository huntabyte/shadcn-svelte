---
title: Attachment
description: Displays a file or image attachment with media, metadata, upload state, and actions.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="attachment-demo">

<div></div>

</ComponentPreview>

The `Attachment` component displays a file or image attachment, its media, name, and metadata, with optional actions and upload state. Use it for files and images in chat composers, message threads, and upload lists.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="attachment" />
{/snippet}
{#snippet manual()}
<Steps>

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
  import * as Attachment from "$lib/components/ui/attachment/index.js";
  import FileTextIcon from "@lucide/svelte/icons/file-text";
  import XIcon from "@lucide/svelte/icons/x";
</script>
```

```svelte
<Attachment.Root>
  <Attachment.Media>
    <FileTextIcon />
  </Attachment.Media>
  <Attachment.Content>
    <Attachment.Title>sales-dashboard.pdf</Attachment.Title>
    <Attachment.Description>PDF - 2.4 MB</Attachment.Description>
  </Attachment.Content>
  <Attachment.Actions>
    <Attachment.Action aria-label="Remove sales-dashboard.pdf">
      <XIcon />
    </Attachment.Action>
  </Attachment.Actions>
</Attachment.Root>
```

## Composition

```text
Attachment
├── AttachmentMedia
├── AttachmentContent
│   ├── AttachmentTitle
│   └── AttachmentDescription
├── AttachmentActions
│   └── AttachmentAction
└── AttachmentTrigger
```

Use `Attachment.Group` to lay out multiple attachments in a scrollable row.

## Features

- Icon and image media through `Attachment.Media`
- Upload states for idle, uploading, processing, error, and done
- Horizontal and vertical orientation
- A full-card `Attachment.Trigger` for links or dialogs
- Scrollable `Attachment.Group` for multiple attachments

## Accessibility

`Attachment.Action` is usually icon-only, so give each action an `aria-label` describing the action and target. If `Attachment.Trigger` covers the card with no text of its own, give it an `aria-label` for what activating it does.

## API Reference

### Attachment.Root

| Prop          | Type                                                         | Default        | Description                                       |
| ------------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------- |
| `state`       | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"`       | The upload state. Drives styling and the shimmer. |
| `size`        | `"default" \| "sm" \| "xs"`                                  | `"default"`    | The attachment size.                              |
| `orientation` | `"horizontal" \| "vertical"`                                 | `"horizontal"` | Lay the media beside or above the content.        |

### Attachment.Media

| Prop      | Type                | Default  | Description                                    |
| --------- | ------------------- | -------- | ---------------------------------------------- |
| `variant` | `"icon" \| "image"` | `"icon"` | Whether the media holds an icon or an `<img>`. |
