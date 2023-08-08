---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/input
---

<script>
  import { ComponentExample, ManualInstall } from '$lib/components/docs';
  import { InputDemo, InputDemoDisabled, InputDemoLabel, InputDemoText, InputDemoFile, InputDemoButton } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/input/InputDemo.svelte" >

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

<ComponentExample src="src/lib/registry/default/example/input/InputDemo.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDemo />
</div>

</ComponentExample>

---

### Disabled

<ComponentExample src="src/lib/registry/default/example/input/InputDemoDisabled.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDemoDisabled />
</div>

</ComponentExample>

---

### With Label

<ComponentExample src="src/lib/registry/default/example/input/InputDemoLabel.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDemoLabel />
</div>

</ComponentExample>

---

### With Text

<ComponentExample src="src/lib/registry/default/example/input/InputDemoText.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDemoText />
</div>

</ComponentExample>

---

### With Button

<ComponentExample src="src/lib/registry/default/example/input/InputDemoButton.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDemoButton />
</div>

</ComponentExample>

---

### File

<ComponentExample src="src/lib/registry/default/example/input/InputDemoFile.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<InputDemoFile />
</div>

</ComponentExample>
