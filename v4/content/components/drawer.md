---
title: Drawer
description: A drawer component for Svelte.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/drawer
  doc: https://github.com/huntabyte/vaul-svelte
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
</script>

<ComponentPreview name="drawer-demo">

<div></div>

</ComponentPreview>

## About

Drawer is built on top of [Vaul Svelte](https://vaul-svelte.com), which is a Svelte port of [Vaul](https://vaul.emilkowal.ski) by [Emil Kowalski](https://twitter.com/emilkowalski_).

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="drawer" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `vaul-svelte`:

</Step>

<PMInstall command="vaul-svelte@next -D" />

<Step>

Copy and paste the component source files linked at the top of this page into your project.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
</script>

<Drawer.Root>
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
```

## Examples

### Responsive Dialog

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` on desktop and a `Drawer` on mobile.

<ComponentPreview name="drawer-dialog">

<div></div>

</ComponentPreview>
