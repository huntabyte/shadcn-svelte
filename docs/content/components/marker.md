---
title: Marker
description: Displays an inline status, system note, bordered row, or labeled separator in a conversation.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/marker
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

The `Marker` component displays inline conversation markers such as status updates, system notes, bordered rows, and labeled separators. Compose it with [`Message`](/docs/components/message) in a conversation thread.

<ComponentPreview name="marker-demo" previewClass="style-rhea theme-blue">

<div></div>

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add marker
```

## Usage

```svelte
<script lang="ts">
  import * as Marker from "$lib/components/ui/marker/index.js";
  import CheckIcon from "@lucide/svelte/icons/check";
</script>

<Marker.Root>
  <Marker.Icon><CheckIcon /></Marker.Icon>
  <Marker.Content>Explored 4 files</Marker.Content>
</Marker.Root>
```

## Variants

- `default`: an inline status, note, or action.
- `border`: the default row with a bottom border.
- `separator`: a centered label with decorative lines on each side.

## Status and shimmer

Use `role="status"` for streaming or in-progress updates. Add `shimmer` to the content for streaming text.

```svelte
<Marker.Root role="status">
  <Marker.Icon><Spinner /></Marker.Icon>
  <Marker.Content class="shimmer">Compacting conversation</Marker.Content>
</Marker.Root>
```

`Marker.Icon` is decorative and hidden from assistive technology. Keep the meaning in `Marker.Content`, or add an `aria-label` to an icon-only marker.

## Links and buttons

Use the `child` snippet to render a native link or button:

```svelte
<Marker.Root>
  {#snippet child({ props })}
    <a {...props} href="/files">
      <Marker.Icon><FileTextIcon /></Marker.Icon>
      <Marker.Content>Explored 4 files</Marker.Content>
    </a>
  {/snippet}
</Marker.Root>
```

A labeled separator needs no `role`. Do not add `role="separator"` to a divider with meaningful visible text, because separator descendants are treated as presentational.
