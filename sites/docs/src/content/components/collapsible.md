---
title: Collapsible
description: An interactive component which expands/collapses a panel.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/collapsible
  doc: https://next.bits-ui.com/docs/components/collapsible
  api: https://next.bits-ui.com/docs/components/collapsible#api-reference
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="collapsible-demo">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="collapsible" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui -D" />

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
