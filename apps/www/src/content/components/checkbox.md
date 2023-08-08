---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/checkbox
radix: https://www.radix-svelte.com/docs/checkbox
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/checkbox
---

<script>
  import { ComponentExample, ManualInstall } from '$lib/components/docs';
  import { CheckboxDemo, CheckboxDemoDisabled, CheckboxDemoText } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/checkbox/CheckboxDemo.svelte">

<div slot="example">
<CheckboxDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add checkbox
```

<ManualInstall>

1. Install `@huntabyte/primitives`:

```bash
npm install @huntabyte/primitives
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

<ComponentExample src="src/lib/registry/default/example/checkbox/CheckboxDemoText.svelte">

<div slot="example">
<CheckboxDemoText />
</div>

</ComponentExample>

### Disabled

<ComponentExample src="src/lib/registry/default/example/checkbox/CheckboxDemoDisabled.svelte">

<div slot="example">
<CheckboxDemoDisabled />
</div>

</ComponentExample>
