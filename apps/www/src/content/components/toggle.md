---
title: Toggle
description: A two-state button that can be either on or off.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/toggle
bits: https://www.bits-ui.com/docs/components/toggle
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="toggle-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add toggle
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
  import { Toggle } from "$lib/components/ui/toggle";
</script>

<Toggle>Toggle</Toggle>
```

## Examples

### Default

<ComponentPreview name="toggle-demo" />

---

### Outline

<ComponentPreview name="toggle-outline" />

---

### With Text

<ComponentPreview name="toggle-with-text" />

---

### Small

<ComponentPreview name="toggle-sm" />

---

### Large

<ComponentPreview name="toggle-lg" />

---

### Disabled

<ComponentPreview name="toggle-disabled" />
