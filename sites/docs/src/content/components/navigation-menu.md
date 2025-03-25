---
title: Navigation Menu
description: A collection of links for navigating websites.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/navigation-menu
  doc: https://next.bits-ui.com/docs/components/navigation-menu
  api: https://next.bits-ui.com/docs/components/navigation-menu#api-reference
---

<script>
    import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs'
</script>

<ComponentPreview name="navigation-menu-demo">

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="navigation-menu" />
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
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
</script>

<NavigationMenu.Root>
  <NavigationMenu.Menu>
    <NavigationMenu.Trigger>File</NavigationMenu.Trigger>
    <NavigationMenu.Content>
      <NavigationMenu.Item>
        New Tab
        <NavigationMenu.Shortcut>⌘T</NavigationMenu.Shortcut>
      </NavigationMenu.Item>
      <NavigationMenu.Item>New Window</NavigationMenu.Item>
      <NavigationMenu.Separator />
      <NavigationMenu.Item>Share</NavigationMenu.Item>
      <NavigationMenu.Separator />
      <NavigationMenu.Item>Print</NavigationMenu.Item>
    </NavigationMenu.Content>
  </NavigationMenu.Menu>
</NavigationMenu.Root>
```
