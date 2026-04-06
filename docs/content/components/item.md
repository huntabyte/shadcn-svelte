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

<ComponentPreview name="item-demo">

<div></div>

</ComponentPreview>

The `Item` component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the `ItemGroup` component to create a list of items.

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

Use `Field` if you need to display a form input such as a checkbox, input, radio, or select.

If you only need to display content such as a title, description, and actions, use `Item`.

### Variants

Use the `variant` prop to change the visual style of the item. 

<ComponentPreview name="item-variants-demo">

<div></div>

</ComponentPreview>

### Size

Use the `size` prop to change the size of the item. Available sizes are `default`, `sm`, and `xs`.

<ComponentPreview name="item-size-demo">

<div></div>

</ComponentPreview>

## Examples

### Icon

Use `Item.Media` with `variant="icon"` to display an icon.

<ComponentPreview name="item-icon-demo">

<div></div>

</ComponentPreview>

### Avatar

You can use `Item.Media` to display an avatar.

<ComponentPreview name="item-avatar-demo">

<div></div>

</ComponentPreview>

### Image

Use `Item.Media` with `variant="image"` to display an image.

<ComponentPreview name="item-image-demo">

<div></div>

</ComponentPreview>

### Group

Use `Item.Group` to group related items together.

<ComponentPreview name="item-group-demo">

<div></div>

</ComponentPreview>

### Header

Use `Item.Header` to add a header above the item content.

<ComponentPreview name="item-header-demo">

<div></div>

</ComponentPreview>

### Link

Use the `child` snippet to render the item as a link. The hover and focus states will be applied to the anchor element.

<ComponentPreview name="item-link-demo">

<div></div>

</ComponentPreview>

### Dropdown

<ComponentPreview name="item-dropdown-demo">

<div></div>

</ComponentPreview>

## API Reference

### Item.Root

The main component for displaying content with media, title, description, and actions.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "outline" \| "muted"` | `"default"` |
| `size` | `"default" \| "sm" \| "xs"` | `"default"` |
| `child` | `Snippet<[{ props }]>` | - |

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

Use `Item.Media` to display media content such as icons, images, or avatars.

| Prop      | Type                             | Default     |
| --------- | -------------------------------- | ----------- |
| `variant` | `"default" \| "icon" \| "image"` | `"default"` |

```svelte
<Item.Media variant="icon">
  <Icon />
</Item.Media>
```

```svelte
<Item.Media variant="image">
  <img src="..." alt="..." />
</Item.Media>
```

### Item.Content

Wraps the title and description of the item.

```svelte
<Item.Content>
  <Item.Title>Title</Item.Title>
  <Item.Description>Description</Item.Description>
</Item.Content>
```

### Item.Title

Displays the title of the item.

```svelte
<Item.Title>Item Title</Item.Title>
```

### Item.Description

Displays the description of the item.

```svelte
<Item.Description>Item description</Item.Description>
```

### Item.Actions

Container for action buttons or other interactive elements.

```svelte
<Item.Actions>
  <Button>Action</Button>
</Item.Actions>
```

### Item.Header

Displays a header above the item content.

```svelte
<Item.Root>
  <Item.Header>Header</Item.Header>
  <Item.Content>...</Item.Content>
</Item.Root>
```

### Item.Footer

Displays a footer below the item content.

```svelte
<Item.Root>
  <Item.Content>...</Item.Content>
  <Item.Footer>Footer</Item.Footer>
</Item.Root>
```
