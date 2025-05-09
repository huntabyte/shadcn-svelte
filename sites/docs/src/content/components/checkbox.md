---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/checkbox
  doc: https://bits-ui.com/docs/components/checkbox
  api: https://bits-ui.com/docs/components/checkbox#api-reference
---

<script>
  import { ComponentPreview, PMAddComp, PMInstall, Steps, Step, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="checkbox-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="checkbox" />
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
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
</script>
```

```svelte
<Checkbox />
```

## Examples

### With Text

<ComponentPreview name="checkbox-with-text">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="checkbox-disabled">

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="checkbox-form-single">

<div></div>

</ComponentPreview>

<ComponentPreview name="checkbox-form-multiple">

<div></div>

</ComponentPreview>
