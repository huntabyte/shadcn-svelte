---
title: Attachment
description: Displays a file or image attachment with media, metadata, upload state, and actions.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/attachment
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

The `Attachment` component displays a file or image attachment, its media, name, and metadata, with optional actions and upload state. Use it for files and images in chat composers, message threads, and upload lists.

<ComponentPreview name="attachment-demo" previewClass="style-rhea theme-blue bg-surface dark:bg-background">

<div></div>

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add attachment
```

## Usage

```svelte
<script lang="ts">
  import * as Attachment from "$lib/components/ui/attachment/index.js";
  import FileTextIcon from "@lucide/svelte/icons/file-text";
  import XIcon from "@lucide/svelte/icons/x";
</script>

<Attachment.Root>
  <Attachment.Media><FileTextIcon /></Attachment.Media>
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

Use `Attachment.Group` for a horizontally scrollable, snapping row of attachments.

## Images, sizes, and states

Set `variant="image"` on `Attachment.Media` when it contains an image. Set `orientation="vertical"` to place the media above the content.

`Attachment.Root` accepts:

- `state`: `idle`, `uploading`, `processing`, `error`, or `done`.
- `size`: `default`, `sm`, or `xs`.
- `orientation`: `horizontal` or `vertical`.

Uploading and processing titles use the `shimmer` utility. Error state uses destructive styling; keep the failure reason in `Attachment.Description` so color is not the only signal.

## Trigger

`Attachment.Trigger` covers the card behind its actions. It renders a button by default and supports the Svelte `child` snippet for links and other elements.

```svelte
<Attachment.Root>
  <!-- media, content, and actions -->
  <Attachment.Trigger aria-label="Preview research-summary.pdf" />
</Attachment.Root>
```

```svelte
<Attachment.Trigger>
  {#snippet child({ props })}
    <a
      {...props}
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Open workspace.png"
    ></a>
  {/snippet}
</Attachment.Trigger>
```

Label every icon-only `Attachment.Action` and every full-card trigger. If a presentational `Attachment.Group` has no interactive children, make the group itself keyboard-scrollable with `tabindex="0"`, `role="group"`, and an `aria-label`.
