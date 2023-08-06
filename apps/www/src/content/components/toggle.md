---
title: Toggle
description: A two-state button that can be either on or off.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/toggle
radix: https://www.radix-svelte.com/docs/toggle
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/toggle
---

<script>
  import { ToggleDemo, ToggleDemoDisabled, ToggleDemoLg, ToggleDemoSm, ToggleDemoText, ToggleDemoOutline, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/toggle/ToggleDemo.svelte">

<div slot="example">
<ToggleDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add toggle
```

<ManualInstall>

1. Install `radix-svelte`:

```bash
npm install radix-svelte
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Toggle } from "$components/ui/toggle";
</script>

<Toggle>Toggle</Toggle>
```

## Examples

### Default

<ComponentExample src="src/lib/components/docs/examples/toggle/ToggleDemo.svelte">

<div slot="example">
<ToggleDemo />
</div>

</ComponentExample>

---

### Outline

<ComponentExample src="src/lib/components/docs/examples/toggle/ToggleDemoOutline.svelte">

<div slot="example">
<ToggleDemoOutline />
</div>

</ComponentExample>

---

### With Text

<ComponentExample src="src/lib/components/docs/examples/toggle/ToggleDemoText.svelte">

<div slot="example">
<ToggleDemoText />
</div>

</ComponentExample>

---

### Small

<ComponentExample src="src/lib/components/docs/examples/toggle/ToggleDemoSm.svelte">

<div slot="example">
<ToggleDemoSm />
</div>

</ComponentExample>

---

### Large

<ComponentExample src="src/lib/components/docs/examples/toggle/ToggleDemoLg.svelte">

<div slot="example">
<ToggleDemoLg />
</div>

</ComponentExample>

---

### Disabled

<ComponentExample src="src/lib/components/docs/examples/toggle/ToggleDemoDisabled.svelte">

<div slot="example">
<ToggleDemoDisabled />
</div>

</ComponentExample>
