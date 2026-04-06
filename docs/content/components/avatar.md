---
title: Avatar
description: An image element with a fallback for representing the user.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/avatar
  doc: https://bits-ui.com/docs/components/avatar
  api: https://bits-ui.com/docs/components/avatar#api-reference
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

<ComponentPreview name="avatar-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="avatar" />
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
  import * as Avatar from "$lib/components/ui/avatar/index.js";
</script>
```

```svelte showLineNumbers
<Avatar.Root>
  <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
  <Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
```

## Examples

### Basic

A basic avatar component with an image and a fallback.

<ComponentPreview name="avatar-basic">

<div></div>

</ComponentPreview>

### Badge

Use the `Avatar.Badge` component to add a badge to the avatar. The badge is positioned at the bottom right of the avatar.

<ComponentPreview name="avatar-badge">

<div></div>

</ComponentPreview>

### Badge with Icon

You can also use an icon inside `<Avatar.Badge>`.

<ComponentPreview name="avatar-badge-icon">

<div></div>

</ComponentPreview>

### Group

Use the `Avatar.Group` component to add a group of avatars.

<ComponentPreview name="avatar-group">

<div></div>

</ComponentPreview>

### Group Count

Use `<Avatar.GroupCount>` to add a count to the group.

<ComponentPreview name="avatar-group-count">

<div></div>

</ComponentPreview>

### Group with Icon

You can also use an icon inside `<Avatar.GroupCount>`.

<ComponentPreview name="avatar-group-icon">

<div></div>

</ComponentPreview>

### Sizes

Use the `size` prop to change the size of the avatar.

<ComponentPreview name="avatar-sizes">

<div></div>

</ComponentPreview>

### Dropdown

You can use the `Avatar` component as a trigger for a dropdown menu.

<ComponentPreview name="avatar-dropdown">

<div></div>

</ComponentPreview>

## API Reference

### Avatar.Root

The `Avatar.Root` component serves as the root element that wraps the avatar image and fallback content.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"default" \| "sm" \| "lg"` | `"default"` |
| `class` | `string` | - |

### Avatar.Image

The `Avatar.Image` component displays the avatar image.

| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | - |
| `alt` | `string` | - |
| `class` | `string` | - |

### Avatar.Fallback

The `Avatar.Fallback` component displays a fallback when the image fails to load.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

### Avatar.Badge

The `Avatar.Badge` component displays a badge indicator on the avatar, typically positioned at the bottom right.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

### Avatar.Group

The `Avatar.Group` component displays a group of avatars with overlapping styling.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

### Avatar.GroupCount

The `Avatar.GroupCount` component displays a count indicator in an avatar group, typically showing the number of additional avatars.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |
