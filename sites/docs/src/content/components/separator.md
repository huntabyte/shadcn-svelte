---
title: Separator
description: Visually or semantically separates content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/separator
  doc: https://bits-ui.com/docs/components/separator
  api: https://bits-ui.com/docs/components/separator#api-reference
---

<script>
  import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="separator-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="separator" />
{/snippet}
{#snippet manual()}
<Steps>

### Install `bits-ui`:

<PMInstall command="bits-ui -D" />

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Separator } from "$lib/components/ui/separator/index.js";
</script>

<Separator />
```
