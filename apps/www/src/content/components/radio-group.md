---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/radio-group
radix: https://www.radix-svelte.com/docs/radiogroup
---

<script>
  import { RadioGroupDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/radio-group/RadioGroupDemo.svelte">

<div slot="example">
<RadioGroupDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add radio-group
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
  import { Label } from "$components/ui/label";
  import { RadioGroup, RadioGroupItem } from "$components/ui/radio-group";
</script>
```

```svelte
<RadioGroup value="option-one">
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label for="option-one">Option One</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label for="option-two">Option Two</Label>
  </div>
</RadioGroup>
```
