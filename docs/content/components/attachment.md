---
title: Attachment
description: Displays a file or image attachment with media, metadata, upload state, and actions.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/attachment
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Step from "$lib/components/step.svelte";
	import Steps from "$lib/components/steps.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="attachment-demo" />

The `Attachment` component displays a file or image attachment, its media, name, metadata, optional actions, and upload state. Use it in chat composers, message threads, and upload lists.

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
	<ComponentSource item={viewerData} data-llm-ignore />
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import FileTextIcon from "@lucide/svelte/icons/file-text";
  import * as Attachment from "$lib/components/ui/attachment/index.js";
</script>

<Attachment.Root>
  <Attachment.Media><FileTextIcon /></Attachment.Media>
  <Attachment.Content>
    <Attachment.Title>sales-dashboard.pdf</Attachment.Title>
    <Attachment.Description>PDF · 2.4 MB</Attachment.Description>
  </Attachment.Content>
</Attachment.Root>
```

## Composition

```text
Attachment.Root
├── Attachment.Media
├── Attachment.Content
│   ├── Attachment.Title
│   └── Attachment.Description
├── Attachment.Actions
│   └── Attachment.Action
└── Attachment.Trigger
```

Use `Attachment.Group` to lay out multiple attachments in a horizontally scrollable row.

## Features

- Icon and image media
- `idle`, `uploading`, `processing`, `error`, and `done` states
- Three sizes and horizontal or vertical orientation
- A full-card trigger that leaves actions independently clickable
- A scrollable, snapping group with an edge fade
- Class overrides on every part

## Image

Set `variant="image"` on `Attachment.Media`. Use `orientation="vertical"` to stack the media above the content.

<ComponentPreview name="attachment-image" />

## States

Set `state` to match the upload lifecycle. Uploading and processing titles shimmer, while errors use the destructive treatment.

<ComponentPreview name="attachment-states" />

## Sizes

Use `size` to switch between `default`, `sm`, and `xs`.

<ComponentPreview name="attachment-sizes" />

## Group

Wrap attachments in `Attachment.Group` for a horizontally scrollable, snapping row.

<ComponentPreview name="attachment-group" />

## Trigger

Add `Attachment.Trigger` to make the whole card open a link or dialog. The trigger fills the card behind the actions, so both remain independently interactive.

<ComponentPreview name="attachment-trigger" />

```svelte
<Dialog.Root>
  <Attachment.Root>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Attachment.Trigger
          {...props}
          aria-label="Preview research-summary.pdf"
        />
      {/snippet}
    </Dialog.Trigger>
  </Attachment.Root>
  <Dialog.Content>...</Dialog.Content>
</Dialog.Root>
```

## Accessibility

### Label icon-only actions

Give each icon-only `Attachment.Action` an `aria-label` that describes the action and target.

```svelte
<Attachment.Action aria-label="Remove sales-dashboard.pdf">
  <XIcon />
</Attachment.Action>
```

### Label the trigger

`Attachment.Trigger` has no text of its own, so give it an accessible name.

```svelte
<Attachment.Trigger>
  {#snippet child({ props })}
    <a {...props} href={url} aria-label="Open workspace.png"></a>
  {/snippet}
</Attachment.Trigger>
```

### Keyboard scrolling

Interactive attachments remain reachable by tabbing through a group. For a presentational group, add `tabindex="0"`, `role="group"`, and an `aria-label` so keyboard users can scroll it.

### Meaning beyond color

Keep the failure reason in `Attachment.Description` so the error state is not conveyed by color alone.

## API Reference

### Attachment.Root

| Prop          | Type                                                         | Default        |
| ------------- | ------------------------------------------------------------ | -------------- |
| `state`       | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"`       |
| `size`        | `"default" \| "sm" \| "xs"`                                  | `"default"`    |
| `orientation` | `"horizontal" \| "vertical"`                                 | `"horizontal"` |
| `class`       | `string`                                                     |                |

### Attachment.Media

| Prop      | Type                | Default  |
| --------- | ------------------- | -------- |
| `variant` | `"icon" \| "image"` | `"icon"` |
| `class`   | `string`            |          |

### Attachment.Content

Wraps `Attachment.Title` and `Attachment.Description`. It accepts standard `<div>` attributes.

### Attachment.Title

Displays the file name. It accepts standard `<span>` attributes.

### Attachment.Description

Displays metadata or status details. It accepts standard `<span>` attributes.

### Attachment.Actions

Groups attachment controls. It accepts standard `<div>` attributes.

### Attachment.Action

Accepts all [`Button`](/docs/components/button) props. Defaults to `variant="ghost"` and `size="icon-xs"`.

### Attachment.Trigger

| Prop    | Type                           | Default    |
| ------- | ------------------------------ | ---------- |
| `child` | `Snippet`                      |            |
| `type`  | `HTMLButtonAttributes["type"]` | `"button"` |
| `class` | `string`                       |            |

### Attachment.Group

Lays out attachments in a horizontally scrollable row and accepts standard `<div>` attributes.
