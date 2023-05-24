---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/textarea
---

<script>
  import { TextareaDemo, TextareaDemoDisabled, TextareaDemoLabel, TextareaDemoText , TextareaDemoButton, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/textarea/TextareaDemo.svelte" >

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-ui add textarea
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

<ComponentExample src="src/lib/components/docs/examples/textarea/TextareaDemo.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDemo />
</div>

</ComponentExample>

---

### Disabled

<ComponentExample src="src/lib/components/docs/examples/textarea/TextareaDemoDisabled.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDemoDisabled />
</div>

</ComponentExample>

---

### With Label

<ComponentExample src="src/lib/components/docs/examples/textarea/TextareaDemoLabel.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDemoLabel />
</div>

</ComponentExample>

---

### With Text

<ComponentExample src="src/lib/components/docs/examples/textarea/TextareaDemoText.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDemoText />
</div>

</ComponentExample>

---

### With Button

<ComponentExample src="src/lib/components/docs/examples/textarea/TextareaDemoButton.svelte">

<div slot="example" style="max-width: 24rem; width: 100%;">
<TextareaDemoButton />
</div>

</ComponentExample>
