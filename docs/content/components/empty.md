---
title: Empty
description: Use the Empty component to display an empty state.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/empty
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

<ComponentPreview name="empty-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="empty" />
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

```svelte
<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import FolderCodeIcon from "@tabler/icons-svelte/icons/folder-code";
</script>
```

```svelte
<Empty.Root>
  <Empty.Header>
    <Empty.Media variant="icon">
      <FolderCodeIcon />
    </Empty.Media>
    <Empty.Title>No data</Empty.Title>
    <Empty.Description>No data found</Empty.Description>
  </Empty.Header>
  <Empty.Content>
    <Button>Add data</Button>
  </Empty.Content>
</Empty.Root>
```

## Composition

Use the following composition to build an `Empty`:

```text
Empty.Root
├── Empty.Header
│   ├── Empty.Media
│   ├── Empty.Title
│   └── Empty.Description
└── Empty.Content
```

## Examples

### Outline

Use the `border` utility class to create a outline empty state.

<ComponentPreview name="empty-outline-demo">

<div></div>

</ComponentPreview>

### Background

Use the `bg-*` and `bg-gradient-*` utilities to add a background to the empty state.

<ComponentPreview name="empty-background-demo">

<div></div>

</ComponentPreview>

### Avatar

Use the `EmptyMedia` component to display an avatar in the empty state.

<ComponentPreview name="empty-avatar-demo">

<div></div>

</ComponentPreview>

### Avatar Group

Use the `EmptyMedia` component to display an avatar group in the empty state.

<ComponentPreview name="empty-avatar-group-demo">

<div></div>

</ComponentPreview>

### InputGroup

You can add an `InputGroup` component to the `EmptyContent` component.

<ComponentPreview name="empty-input-group-demo">

<div></div>

</ComponentPreview>

## API Reference

### Empty.Root

The main component of the empty state. Wraps the `Empty.Header` and `Empty.Content` components.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Empty.Root>
  <Empty.Header />
  <Empty.Content />
</Empty.Root>
```

### Empty.Header

The `Empty.Header` component wraps the empty media, title, and description.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Empty.Header>
  <Empty.Media />
  <Empty.Title />
  <Empty.Description />
</Empty.Header>
```

### Empty.Media

Use the `Empty.Media` component to display the media of the empty state such as an icon or an image. You can also use it to display other components such as an avatar.

| Prop      | Type                  | Default     |
| --------- | --------------------- | ----------- |
| `variant` | `"default" \| "icon"` | `"default"` |
| `class`   | `string`              |             |

```svelte
<Empty.Media variant="icon">
  <Icon />
</Empty.Media>
```

```svelte
<Empty.Media>
  <Avatar.Root>
    <Avatar.Image src="..." />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>
</Empty.Media>
```

### Empty.Title

Use the `Empty.Title` component to display the title of the empty state.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Empty.Title>No data</Empty.Title>
```

### Empty.Description

Use the `Empty.Description` component to display the description of the empty state.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Empty.Description>You do not have any notifications.</Empty.Description>
```

### Empty.Content

Use the `Empty.Content` component to display the content of the empty state such as a button, input or a link.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<Empty.Content>
  <Button>Add Project</Button>
</Empty.Content>
```
