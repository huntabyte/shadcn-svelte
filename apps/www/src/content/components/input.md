---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/input
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="input-demo" />

## Installation

```bash
npx shadcn-svelte add input
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Input } from "$components/ui/input";
</script>
```

```svelte
<Input />
```

## Examples

### Default

<ComponentPreview name="input-demo" />

---

### Disabled

<ComponentPreview name="input-disabled" />

---

### With Label

<ComponentPreview name="input-with-label" />

---

### With Text

<ComponentPreview name="input-with-text" />

---

### With Button

<ComponentPreview name="input-with-button" />

---

### File

<ComponentPreview name="input-file" />
