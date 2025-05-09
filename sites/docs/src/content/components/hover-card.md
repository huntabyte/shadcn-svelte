---
title: Hover Card
description: For sighted users to preview content available behind a link.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/link-preview
  doc: https://bits-ui.com/docs/components/link-preview
  api: https://bits-ui.com/docs/components/link-preview#api-reference
---

<script>
  import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="hover-card-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="hover-card" />
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
  import * as HoverCard from "$lib/components/ui/hover-card/index.js";
</script>

<HoverCard.Root>
  <HoverCard.Trigger>Hover</HoverCard.Trigger>
  <HoverCard.Content>
    SvelteKit - Web development, streamlined
  </HoverCard.Content>
</HoverCard.Root>
```
