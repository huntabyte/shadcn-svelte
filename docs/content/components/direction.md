---
title: Direction
description: Provide left-to-right or right-to-left text direction to descendant components.
component: true
---

## Installation

```bash
npx shadcn-svelte@latest add direction
```

## Usage

```svelte
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction";
</script>

<DirectionProvider direction="rtl">
  <p>مرحبا</p>
</DirectionProvider>
```

Use `useDirection()` inside a descendant component when its behavior needs the current `ltr` or `rtl` direction.
