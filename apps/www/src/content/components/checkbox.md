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
  import { CheckboxDemo, CheckboxDisabled, CheckboxWithText } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/checkbox/checkbox-demo.svelte">

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

<ComponentExample src="src/lib/registry/default/example/checkbox/checkbox-with-text.svelte">

<div slot="example">
<CheckboxWithText />
</div>

</ComponentExample>

### Disabled

<ComponentExample src="src/lib/registry/default/example/checkbox/checkbox-disabled.svelte">

<div slot="example">
<CheckboxDisabled />
</div>

</ComponentExample>
