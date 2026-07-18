---
title: Marker
description: Use Marker to label or separate content with an icon and description.
component: true
---

## Installation

```bash
npx shadcn-svelte@latest add marker
```

## Usage

```svelte
<script lang="ts">
  import * as Marker from "$lib/components/ui/marker";
  import InfoIcon from "@lucide/svelte/icons/info";
</script>

<Marker.Root variant="border">
  <Marker.Icon><InfoIcon /></Marker.Icon>
  <Marker.Content>Changes are saved automatically.</Marker.Content>
</Marker.Root>
```

`Marker.Root` supports `default`, `border`, and `separator` variants.
