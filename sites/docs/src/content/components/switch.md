---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/switch
  doc: https://next.bits-ui.com/docs/components/switch
  api: https://next.bits-ui.com/docs/components/switch#api-reference
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="switch-demo">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="switch" />

<ManualInstall>

1. Install `bits-ui`:

<PMInstall command="bits-ui -D" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Switch } from "$lib/components/ui/switch";
</script>

<Switch />
```

## Examples

### Form

<ComponentPreview name="switch-form">

<div></div>

</ComponentPreview>
