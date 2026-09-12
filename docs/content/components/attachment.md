---
title: Attachment
description: Displays a file or image attachment with media, metadata, upload state, and actions.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/attachment
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="attachment-demo" class="bg-surface dark:bg-background">

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

Install the required shadcn-svelte dependencies:

</Step>

<PMAddComp name="button" />

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

Use the following composition to build an attachment:

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

Use `Attachment.Group` to lay out multiple attachments in a scrollable row:

```text
Attachment.Group
├── Attachment.Root
└── Attachment.Root
```

## Features

- Icon and image media through `Attachment.Media`
- Upload states: `idle`, `uploading`, `processing`, `error`, and `done` with built-in styling and a shimmer while in progress
- Three sizes and horizontal or vertical orientation
- A full-card `Attachment.Trigger` that opens a link or dialog while the actions stay independently clickable
- Scrollable, snapping `Attachment.Group` with an edge fade
- Customizable styling through the `class` prop on every part

## Image

Set `variant="image"` on `Attachment.Media` and render an `<img>` inside it. Use `orientation="vertical"` to stack the media above the content.

<ComponentPreview name="attachment-image" class="bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

## States

Set `state` to reflect the upload lifecycle. `uploading` and `processing` shimmer the title, and `error` switches to a destructive treatment.

<ComponentPreview name="attachment-states" class="bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

## Sizes

Use `size` to switch between `default`, `sm`, and `xs`.

<ComponentPreview name="attachment-sizes" class="bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

## Group

Wrap attachments in `Attachment.Group` to lay them out in a horizontally scrollable, snapping row with an edge fade.

<ComponentPreview name="attachment-group" class="bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

## Trigger

Add an `Attachment.Trigger` to make the whole card open a link or dialog. It fills the card behind the actions, so the actions stay clickable.

<ComponentPreview name="attachment-trigger" class="bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<Dialog.Root>
  <Attachment.Root>
    <!-- media, content, actions -->
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Attachment.Trigger
          aria-label="Preview research-summary.pdf"
          {...props}
        />
      {/snippet}
    </Dialog.Trigger>
  </Attachment.Root>
  <Dialog.Content><!-- ... --></Dialog.Content>
</Dialog.Root>
```

## Accessibility

`Attachment.Action` renders a `Button`, and `Attachment.Trigger` renders a real `<button>` (or your element via the `child` snippet). Follow the guidance below so both are operable and announced.

### Label icon-only actions

`Attachment.Action` is usually icon-only, so give each one an `aria-label` describing the action and its target.

```svelte showLineNumbers
<Attachment.Action aria-label="Remove sales-dashboard.pdf">
  <XIcon />
</Attachment.Action>
```

### Label the trigger

`Attachment.Trigger` covers the card with no text of its own, so give it an `aria-label` for what activating it does.

```svelte showLineNumbers
<Attachment.Trigger>
  {#snippet child({ props })}
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Open workspace.png"
      {...props}
    ></a>
  {/snippet}
</Attachment.Trigger>
```

The trigger sits behind the actions in the stacking order, so an `Attachment.Action` and the `Attachment.Trigger` never trap each other. Both remain separately focusable and clickable.

### Keyboard scrolling

An `Attachment.Group` scrolls horizontally. When its attachments are interactive (a trigger or actions), keyboard users reach off-screen items by tabbing to them. For a row of presentational attachments, make the group itself focusable and scrollable by adding `tabindex={0}`, `role="group"`, and an `aria-label`.

### Meaning beyond color

The `error` state uses a destructive color. Keep the failure reason in `Attachment.Description` so the state is not conveyed by color alone.

## API Reference

### Attachment

The root attachment container.

| Prop          | Type                                                         | Default        | Description                                       |
| ------------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------- |
| `state`       | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"`       | The upload state. Drives styling and the shimmer. |
| `size`        | `"default" \| "sm" \| "xs"`                                  | `"default"`    | The attachment size.                              |
| `orientation` | `"horizontal" \| "vertical"`                                 | `"horizontal"` | Lay the media beside or above the content.        |
| `class`       | `string`                                                     | -              | Additional classes to apply to the root element.  |

### Attachment.Media

The media slot for an icon or image preview.

| Prop      | Type                | Default  | Description                                    |
| --------- | ------------------- | -------- | ---------------------------------------------- |
| `variant` | `"icon" \| "image"` | `"icon"` | Whether the media holds an icon or an `<img>`. |
| `class`   | `string`            | -        | Additional classes to apply to the media slot. |

### Attachment.Content

Wraps the title and description.

| Prop    | Type     | Default | Description                                      |
| ------- | -------- | ------- | ------------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the content slot. |

### Attachment.Title

The attachment name. Shimmers while the attachment is `uploading` or `processing`.

| Prop    | Type     | Default | Description                               |
| ------- | -------- | ------- | ----------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the title. |

### Attachment.Description

Secondary metadata such as the file type, size, or upload status.

| Prop    | Type     | Default | Description                                     |
| ------- | -------- | ------- | ----------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the description. |

### Attachment.Actions

A container for one or more actions, aligned to the end of the attachment.

| Prop    | Type     | Default | Description                                 |
| ------- | -------- | ------- | ------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the actions. |

### Attachment.Action

An action button. Renders a [`Button`](/docs/components/button) and accepts all of its props.

| Prop       | Type           | Default     | Description                              |
| ---------- | -------------- | ----------- | ---------------------------------------- |
| `size`     | `Button` size  | `"icon-xs"` | The button size.                         |
| `...props` | `Button` props | -           | Props spread to the underlying `Button`. |

### Attachment.Trigger

A full-card overlay that activates the attachment. Renders a `<button>` by default.

| Prop    | Type      | Default | Description                                  |
| ------- | --------- | ------- | -------------------------------------------- |
| `child` | `snippet` | -       | Render as the child element, such as a link. |
| `class` | `string`  | -       | Additional classes to apply to the trigger.  |

### Attachment.Group

Lays out attachments in a horizontally scrollable, snapping row.

| Prop    | Type     | Default | Description                               |
| ------- | -------- | ------- | ----------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the group. |
