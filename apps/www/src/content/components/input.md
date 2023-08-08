---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/input
---

<script>
  import { ComponentExample, ManualInstall } from '$lib/components/docs';
  import { InputDemo, InputDisabled, InputWithLabel, InputWithText, InputFile, InputWithButton } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/input/input-demo.svelte" >

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDemo />
</div>

</ComponentExample>

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

<ComponentExample src="src/lib/registry/default/example/input/input-demo.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDemo />
</div>

</ComponentExample>

---

### Disabled

<ComponentExample src="src/lib/registry/default/example/input/input-disabled.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDisabled />
</div>

</ComponentExample>

---

### With Label

<ComponentExample src="src/lib/registry/default/example/input/input-with-label.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputWithLabel />
</div>

</ComponentExample>

---

### With Text

<ComponentExample src="src/lib/registry/default/example/input/input-with-text.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputWithText />
</div>

</ComponentExample>

---

### With Button

<ComponentExample src="src/lib/registry/default/example/input/input-with-button.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputWithButton />
</div>

</ComponentExample>

---

### File

<ComponentExample src="src/lib/registry/default/example/input/input-file.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputFile />
</div>

</ComponentExample>
