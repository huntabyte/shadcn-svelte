---
title: Item
description: A versatile component that you can use to display any content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/item
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

The `Item` component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the `ItemGroup` component to create a list of items.

You can pretty much achieve the same result with the `div` element and some classes, but **I've built this so many times** that I decided to create a component for it. Now I use it all the time.

<ComponentPreview name="item-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="item" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Item from "$lib/components/ui/item/index.js";
</script>
```

```svelte showLineNumbers
<Item.Root>
  <Item.Header>Item Header</Item.Header>
  <Item.Media />
  <Item.Content>
    <Item.Title>Item</Item.Title>
    <Item.Description>Item</Item.Description>
  </Item.Content>
  <Item.Actions />
  <Item.Footer>Item Footer</Item.Footer>
</Item.Root>
```

## Item vs Field

Use Field if you need to display a form input such as a checkbox, input, radio, or select.

If you only need to display content such as a title, description, and actions, use `Item`.

## Examples

### Variants

<ComponentPreview name="item-variants-demo">

<div></div>

</ComponentPreview>

### Size

The `Item` component has different sizes for different use cases. For example, you can use the `sm` size for a compact item or the default size for a standard item.

<ComponentPreview name="item-size-demo">

<div></div>

</ComponentPreview>

### Icon

<ComponentPreview name="item-icon-demo">

<div></div>

</ComponentPreview>

### Avatar

<ComponentPreview name="item-avatar-demo">

<div></div>

</ComponentPreview>

### Image

<ComponentPreview name="item-image-demo">

<div></div>

</ComponentPreview>

### Group

<ComponentPreview name="item-group-demo">

<div></div>

</ComponentPreview>

### Header

<ComponentPreview name="item-header-demo">

<div></div>

</ComponentPreview>

### Link

To render an item as a link, use the the `child` snippet. The hover and focus states will be applied to the anchor element.

<ComponentPreview name="item-link-demo">

<div></div>

</ComponentPreview>

### Dropdown

<ComponentPreview name="item-dropdown-demo">

<div></div>

</ComponentPreview>
