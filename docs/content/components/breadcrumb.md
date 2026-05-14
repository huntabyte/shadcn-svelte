---
title: Breadcrumb
description: Displays the path to the current resource using a hierarchy of links.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/breadcrumb
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

<ComponentPreview name="breadcrumb-demo" previewClassName="p-2">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="breadcrumb" />
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
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>
```

```svelte showLineNumbers
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

## Composition

Use the following composition to build a `Breadcrumb`:

```text
Breadcrumb.Root
└── Breadcrumb.List
    ├── Breadcrumb.Item
    │   └── Breadcrumb.Link
    ├── Breadcrumb.Separator
    ├── Breadcrumb.Item
    │   └── Breadcrumb.Link
    ├── Breadcrumb.Separator
    └── Breadcrumb.Item
        └── Breadcrumb.Page
```

Use `Breadcrumb.Ellipsis` inside a `Breadcrumb.Item` to represent collapsed items.

## Examples

### Basic

<ComponentPreview name="breadcrumb-basic">

<div></div>

</ComponentPreview>

### Custom separator

Pass a custom component as children of `<Breadcrumb.Separator />` to create a custom separator.

<ComponentPreview name="breadcrumb-separator">

<div></div>

</ComponentPreview>

### Dropdown

You can compose `<Breadcrumb.Item />` with a `<DropdownMenu />` to create a dropdown in the breadcrumb.

<ComponentPreview name="breadcrumb-dropdown">

<div></div>

</ComponentPreview>

### Collapsed

We provide a `<Breadcrumb.Ellipsis />` component to show a collapsed state when the breadcrumb is too long.

<ComponentPreview name="breadcrumb-ellipsis" previewClassName="p-2">

<div></div>

</ComponentPreview>

### Link component

To use a link just add the `href` prop to `<Breadcrumb.Link />`.

<ComponentPreview name="breadcrumb-link">

<div></div>

</ComponentPreview>

## API Reference

### Breadcrumb.Root

The `Breadcrumb.Root` component is the root navigation element that wraps all breadcrumb components.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` | -       |

### Breadcrumb.List

The `Breadcrumb.List` component displays the ordered list of breadcrumb items.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` | -       |

### Breadcrumb.Item

The `Breadcrumb.Item` component wraps individual breadcrumb items.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` | -       |

### Breadcrumb.Link

The `Breadcrumb.Link` component displays a clickable link in the breadcrumb.

| Prop    | Type                   | Default |
| ------- | ---------------------- | ------- |
| `class` | `string`               | -       |
| `child` | `Snippet<[{ props }]>` | -       |

### Breadcrumb.Page

The `Breadcrumb.Page` component displays the current page in the breadcrumb (non-clickable).

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` | -       |

### Breadcrumb.Separator

The `Breadcrumb.Separator` component displays a separator between breadcrumb items. You can pass custom children to override the default separator icon.

| Prop       | Type      | Default |
| ---------- | --------- | ------- |
| `children` | `Snippet` | -       |
| `class`    | `string`  | -       |

### Breadcrumb.Ellipsis

The `Breadcrumb.Ellipsis` component displays an ellipsis indicator for collapsed breadcrumb items.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` | -       |
