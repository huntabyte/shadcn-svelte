---
title: Label
description: Renders an accessible label associated with controls.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/label
  doc: https://next.bits-ui.com/docs/components/label
  api: https://next.bits-ui.com/docs/components/label#api-reference
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="label-demo">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="label" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Label } from "$lib/components/ui/label";
</script>

<Label for="email">Your email address</Label>
```
