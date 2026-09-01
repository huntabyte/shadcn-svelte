---
title: Bubble
description: Compose chat bubbles, grouped replies, and message reactions.
component: true
---

## Installation

```bash
npx shadcn-svelte@latest add bubble
```

## Usage

```svelte
<script lang="ts">
  import * as Bubble from "$lib/components/ui/bubble";
</script>

<Bubble.Group>
  <Bubble.Root variant="default" align="end">
    <Bubble.Content>Hello there.</Bubble.Content>
    <Bubble.Reactions>👍 2</Bubble.Reactions>
  </Bubble.Root>
</Bubble.Group>
```

`Bubble.Root` supports `default`, `secondary`, `muted`, `tinted`, `outline`, `ghost`, and `destructive` variants.
