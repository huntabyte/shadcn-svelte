---
title: Navigation Menu
description: A collection of links for navigating websites.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/navigation-menu
  doc: https://bits-ui.com/docs/components/navigation-menu
  api: https://bits-ui.com/docs/components/navigation-menu#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="navigation-menu-demo" align="start" previewClassName="h-96" className="overflow-visible">

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
<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
</script>
```

```svelte showLineNumbers
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Item One</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link>Link</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

## Link Component

When using the `NavigationMenu.Link` component as a child of a SvelteKit `<a>` element or similar router link, use the `child` snippet to pass the link props through:

```svelte showLineNumbers
<NavigationMenu.Link>
  {#snippet child({ props })}
    <a href="/docs" {...props}> Documentation </a>
  {/snippet}
</NavigationMenu.Link>
```

## Composition

Use the following composition to build a `NavigationMenu`:

```text
NavigationMenu.Root
└── NavigationMenu.List
    └── NavigationMenu.Item
        ├── NavigationMenu.Trigger
        ├── NavigationMenu.Content
        │   └── NavigationMenu.Link
        └── NavigationMenu.Link
```

`NavigationMenu.Viewport` and `NavigationMenu.Indicator` are optional elements that can be placed outside the list for custom layouts.

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/navigation-menu#api-reference) documentation for more information.
