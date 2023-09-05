---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/radio-group
bits: https://www.bits-ui.com/docs/components/radio-group
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="radio-group-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add radio-group
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
  import { Label } from "$lib/components/ui/label";
  import * as RadioGroup from "$lib/components/ui/radio-group";
</script>

<RadioGroup.Root value="option-one">
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="option-one" id="option-one" />
    <Label for="option-one">Option One</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="option-two" id="option-two" />
    <Label for="option-two">Option Two</Label>
  </div>
</RadioGroup.Root>
```

## Examples

### Form

When using a radio group with a form, you'll want to use the `<Form.RadioGroup />` and `<Form.RadioItem />` components, which are wrappers around your existing radio group components that nicely handle the form state for you.

<ComponentPreview name="radio-group-form">

<div />

</ComponentPreview>
