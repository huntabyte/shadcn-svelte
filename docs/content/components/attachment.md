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

<ComponentPreview name="attachment-demo" previewClassName="h-auto theme-blue bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

The `Attachment` component displays a file or image attachment, its media, name,
and metadata, with optional actions and upload state. Use it for files and
images in chat composers, message threads, and upload lists.

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
    <Attachment.Description>PDF · 2.4 MB</Attachment.Description>
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
Attachment.Root
├── Attachment.Media
├── Attachment.Content
│   ├── Attachment.Title
│   └── Attachment.Description
├── Attachment.Actions
│   └── Attachment.Action
└── Attachment.Trigger
```

Use `Attachment.Group` to lay out multiple attachments in a scrollable row.

## Features

- Icon and image media through `Attachment.Media`
- Upload states: `idle`, `uploading`, `processing`, `error`, and `done` with built-in styling and a shimmer while in progress
- Three sizes and horizontal or vertical orientation
- A full-card `Attachment.Trigger` that opens a link or dialog while the actions stay independently clickable
- Scrollable, snapping `Attachment.Group` with an edge fade
- Customizable styling through the `class` prop on every part

## Examples

### Image

Use `variant="image"` on `Attachment.Media` to render image previews.

<ComponentPreview name="attachment-image" previewClassName="h-auto theme-blue bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

### States

Set `state` to reflect the upload lifecycle. `uploading` and `processing` shimmer the title, and `error` switches to a destructive treatment.

<ComponentPreview name="attachment-states" previewClassName="h-auto theme-blue bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

### Sizes

Use `size` for dense lists or compact attachment rows.

<ComponentPreview name="attachment-sizes" previewClassName="h-auto theme-blue bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

### Group

Use `Attachment.Group` for horizontally scrollable, snapping attachment rows with an edge fade.

<ComponentPreview name="attachment-group" previewClassName="h-auto theme-blue bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

### Trigger

Use `Attachment.Trigger` when the whole card should open a link, dialog, or
preview while action buttons remain independently clickable.

<ComponentPreview name="attachment-trigger" previewClassName="h-auto theme-blue bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

```svelte
<Dialog.Root>
  <Attachment.Root>
    <Attachment.Media>
      <FileSearchIcon />
    </Attachment.Media>
    <Attachment.Content>
      <Attachment.Title>research-summary.pdf</Attachment.Title>
      <Attachment.Description>Open preview dialog</Attachment.Description>
    </Attachment.Content>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Attachment.Trigger
          {...props}
          aria-label="Preview research-summary.pdf"
        />
      {/snippet}
    </Dialog.Trigger>
  </Attachment.Root>
</Dialog.Root>
```

## Accessibility

`Attachment.Action` renders a `Button`, and `Attachment.Trigger` renders a real `<button>` or your element through a child snippet. Follow the guidance below so both are operable and announced.

`Attachment.Action` is usually icon-only, so give each action an `aria-label` describing the action and target.

### Label icon-only actions

```svelte
<Attachment.Action aria-label="Remove selected-file.pdf">
  <XIcon />
</Attachment.Action>
```

### Label the trigger

If `Attachment.Trigger` covers the card with no text of its own, give it an
`aria-label` for what activating it does.

```svelte
<Attachment.Trigger aria-label="Open workspace.png">
  {#snippet child({ props })}
    <a href={url} target="_blank" rel="noreferrer" {...props}></a>
  {/snippet}
</Attachment.Trigger>
```

The trigger sits behind the actions in the stacking order, so an `Attachment.Action` and the `Attachment.Trigger` never trap each other. Both remain separately focusable and clickable.

### Keyboard scrolling

An `Attachment.Group` scrolls horizontally. When its attachments are interactive, keyboard users reach off-screen items by tabbing to them. For a row of presentational attachments, make the group itself focusable and scrollable by adding `tabindex="0"`, `role="group"`, and an `aria-label`.

### Meaning beyond color

Do not rely on `state="error"` color alone. Include error text in
`Attachment.Description` or another visible label.

## API Reference

### Attachment.Root

| Prop          | Type                                                         | Default        | Description                                       |
| ------------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------- |
| `state`       | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"`       | The upload state. Drives styling and the shimmer. |
| `size`        | `"default" \| "sm" \| "xs"`                                  | `"default"`    | The attachment size.                              |
| `orientation` | `"horizontal" \| "vertical"`                                 | `"horizontal"` | Lay the media beside or above the content.        |
| `class`       | `string`                                                     |                | Additional classes for the root element.          |

### Attachment.Media

| Prop      | Type                | Default  | Description                                    |
| --------- | ------------------- | -------- | ---------------------------------------------- |
| `variant` | `"icon" \| "image"` | `"icon"` | Whether the media holds an icon or an `<img>`. |
| `class`   | `string`            |          | Additional classes for the media slot.         |

### Attachment.Content

| Prop    | Type     | Default | Description                              |
| ------- | -------- | ------- | ---------------------------------------- |
| `class` | `string` |         | Additional classes for the content slot. |

### Attachment.Title

| Prop    | Type     | Default | Description                       |
| ------- | -------- | ------- | --------------------------------- |
| `class` | `string` |         | Additional classes for the title. |

### Attachment.Description

| Prop    | Type     | Default | Description                             |
| ------- | -------- | ------- | --------------------------------------- |
| `class` | `string` |         | Additional classes for the description. |

### Attachment.Actions

| Prop    | Type     | Default | Description                         |
| ------- | -------- | ------- | ----------------------------------- |
| `class` | `string` |         | Additional classes for the actions. |

### Attachment.Action

Forwards props to the local `Button` component.

| Prop      | Type                     | Default     | Description              |
| --------- | ------------------------ | ----------- | ------------------------ |
| `variant` | `ButtonProps["variant"]` | `"ghost"`   | Button visual treatment. |
| `size`    | `ButtonProps["size"]`    | `"icon-xs"` | Button size.             |

### Attachment.Trigger

The full-card trigger layer.

| Prop    | Type      | Default    | Description                                   |
| ------- | --------- | ---------- | --------------------------------------------- |
| `type`  | `string`  | `"button"` | Native button type when rendered as a button. |
| `child` | `Snippet` |            | Render as a child element, such as an anchor. |
| `class` | `string`  |            | Additional classes for the trigger.           |

### Attachment.Group

The horizontal scroll container for multiple attachments.

| Prop    | Type     | Default | Description                       |
| ------- | -------- | ------- | --------------------------------- |
| `class` | `string` |         | Additional classes for the group. |
