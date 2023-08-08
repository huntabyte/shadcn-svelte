---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/textarea
---

<script>
  import { ComponentExample, ManualInstall } from '$lib/components/docs';
  import { TextareaDemo, TextareaDisabled, TextareaWithLabel, TextareaWithText , TextareaWithButton } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/textarea/textarea-demo.svelte" >

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add textarea
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Textarea } from "$components/ui/textarea";
</script>
```

```svelte
<Textarea />
```

## Examples

### Default

<ComponentExample src="src/lib/registry/default/example/textarea/textarea-demo.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDemo />
</div>

</ComponentExample>

---

### Disabled

<ComponentExample src="src/lib/registry/default/example/textarea/textarea-disabled.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDisabled />
</div>

</ComponentExample>

---

### With Label

<ComponentExample src="src/lib/registry/default/example/textarea/textarea-with-label.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaWithLabel />
</div>

</ComponentExample>

---

### With Text

<ComponentExample src="src/lib/registry/default/example/textarea/textarea-with-text.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaWithText />
</div>

</ComponentExample>

---

### With Button

<ComponentExample src="src/lib/registry/default/example/textarea/textarea-with-button.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaWithButton />
</div>

</ComponentExample>
