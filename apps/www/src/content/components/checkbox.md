---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/checkbox
bits: https://www.bits-ui.com/docs/components/checkbox
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="checkbox-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add checkbox
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
  import { Checkbox } from "$components/ui/checkbox";
</script>
```

```svelte
<Checkbox />
```

## Examples

### With Text

<ComponentPreview name="checkbox-with-text">

<div />

</ComponentPreview>

---

### Disabled

<ComponentPreview name="checkbox-disabled">

<div />

</ComponentPreview>
