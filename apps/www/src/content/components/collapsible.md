---
title: Collapsible
description: An interactive component which expands/collapses a panel.
component: true
featured: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/collapsible
bits: https://www.bits-ui.com/docs/components/collapsible
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="collapsible-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add collapsible
```

<ManualInstall>

1. Install `bits-ui`:

```bash
npm install bits-ui
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Collapsible from "$lib/components/ui/collapsible";
</script>

<Collapsible.Root>
  <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
  <Collapsible.Content>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </Collapsible.Content>
</Collapsible.Root>
```
