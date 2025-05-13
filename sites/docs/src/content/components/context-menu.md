---
title: Context Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by right click.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/context-menu
  doc: https://bits-ui.com/docs/components/context-menu
  api: https://bits-ui.com/docs/components/context-menu#api-reference
---

<script>
    import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs'
</script>

<ComponentPreview name="context-menu-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="context-menu" />
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
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Profile</ContextMenu.Item>
    <ContextMenu.Item>Billing</ContextMenu.Item>
    <ContextMenu.Item>Team</ContextMenu.Item>
    <ContextMenu.Item>Subscription</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
```
