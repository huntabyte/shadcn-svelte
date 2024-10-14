---
title: Separator
description: Visually or semantically separates content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/separator
  doc: https://next.bits-ui.com/docs/components/separator
  api: https://next.bits-ui.com/docs/components/separator#api-reference
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="separator-demo">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="separator" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
</script>

<Separator />
```
