---
title: Item
description: A versatile component that you can use to display any content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/item
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

<Step>

Update the import paths to match your project setup.

</Step>

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

Item comes in three visual variants: `default` (transparent, no border), `outline` (with a visible border), and `muted` (muted background for secondary content).

<ComponentPreview name="item-variants-demo">

<div></div>

</ComponentPreview>

### Size

The `Item` component has different sizes for different use cases. For example, you can use the `sm` size for a compact item or the default size for a standard item.

<ComponentPreview name="item-size-demo">

<div></div>

</ComponentPreview>

### Icon

Use `Item.Media` with `variant="icon"` to display an icon alongside the item content.

<ComponentPreview name="item-icon-demo">

<div></div>

</ComponentPreview>

### Avatar

Use `Item.Media` to display an avatar or a group of avatars next to the item content.

<ComponentPreview name="item-avatar-demo">

<div></div>

</ComponentPreview>

### Image

Use `Item.Media` with `variant="image"` to display an image thumbnail alongside the content.

<ComponentPreview name="item-image-demo">

<div></div>

</ComponentPreview>

### Group

Use `Item.Group` to stack multiple items in a list. Add `Item.Separator` between items to divide them visually.

<ComponentPreview name="item-group-demo">

<div></div>

</ComponentPreview>

### Header

Use `Item.Header` to display a full-width header inside the item, useful for card-style layouts with a leading image.

<ComponentPreview name="item-header-demo">

<div></div>

</ComponentPreview>

### Link

To render an item as a link, use the the `child` snippet. The hover and focus states will be applied to the anchor element.

<ComponentPreview name="item-link-demo">

<div></div>

</ComponentPreview>

### Dropdown

Use `Item` inside a `DropdownMenu.Item` to create rich menu items with avatars, descriptions, and other content.

<ComponentPreview name="item-dropdown-demo">

<div></div>

</ComponentPreview>

## API Reference

### Item

The main component for displaying content with media, title, description, and actions.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "outline" \| "muted"` | `"default"` |
| `size` | `"default" \| "sm" \| "xs"` | `"default"` |

To render the item as a different element (e.g. an anchor), use the `child` snippet:

```svelte
<Item.Root>
  {#snippet child({ props })}
    <a href="/link" {...props}>...</a>
  {/snippet}
</Item.Root>
```

### Item.Group

A container that groups related items together with consistent styling.

```svelte
<Item.Group>
  <Item.Root />
  <Item.Root />
</Item.Group>
```

### Item.Separator

A separator between items in a group.

```svelte
<Item.Group>
  <Item.Root />
  <Item.Separator />
  <Item.Root />
</Item.Group>
```

### Item.Media

Use this to display media content such as icons, images, or avatars.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "icon" \| "image"` | `"default"` |

### Item.Content

Wraps the title and description of the item.

### Item.Title

Displays the title of the item.

### Item.Description

Displays the description of the item.

### Item.Actions

Container for action buttons or other interactive elements.

### Item.Header

Displays a header above the item content.

### Item.Footer

Displays a footer below the item content.
