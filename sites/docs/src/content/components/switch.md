---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/switch
  doc: https://bits-ui.com/docs/components/switch
  api: https://bits-ui.com/docs/components/switch#api-reference
---

<script>
  import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="switch-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="switch" />
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
  import { Switch } from "$lib/components/ui/switch/index.js";
</script>

<Switch />
```

## Examples

### Form

<ComponentPreview name="switch-form">

<div></div>

</ComponentPreview>
