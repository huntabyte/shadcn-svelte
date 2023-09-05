---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/switch
bits: https://www.bits-ui.com/docs/components/switch
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="switch-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add switch
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
  import { Switch } from "$lib/components/ui/switch";
</script>

<Switch />
```

## Examples

### Form

When using the switch component in a form, you'll want to use the `<Form.Switch />` component, which is a wrapper around your existing `<Switch />` component that makes it seamlessly integrate with forms.

<ComponentPreview name="switch-form">

<div />

</ComponentPreview>
