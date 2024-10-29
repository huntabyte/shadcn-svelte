---
title: Toggle
description: A two-state button that can be either on or off.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/toggle
  doc: https://next.bits-ui.com/docs/components/toggle
  api: https://next.bits-ui.com/docs/components/toggle#api-reference
---

<script>
  import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="toggle-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="toggle" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>

Install `bits-ui`:

</Step>
<PMInstall command="bits-ui -D" />
<Step>Copy and paste the component source files linked at the top of this page into your project.</Step>
</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle>Toggle</Toggle>
```

## Examples

### Default

<ComponentPreview name="toggle-demo">

<div></div>

</ComponentPreview>

### Outline

<ComponentPreview name="toggle-outline">

<div></div>

</ComponentPreview>

### With Text

<ComponentPreview name="toggle-with-text">

<div></div>

</ComponentPreview>

### Small

<ComponentPreview name="toggle-sm">

<div></div>

</ComponentPreview>

### Large

<ComponentPreview name="toggle-lg">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="toggle-disabled">

<div></div>

</ComponentPreview>
