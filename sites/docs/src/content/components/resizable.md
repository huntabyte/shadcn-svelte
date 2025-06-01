---
title: Resizable
description: Accessible resizable panel groups and layouts with keyboard support.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/resizable
bits: https://paneforge.com
---

<script>
	import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs'
</script>

<ComponentPreview name="resizable-demo">

<div />

</ComponentPreview>

## About

The `Resizable` component is built on top of [PaneForge](https://github.com/svecosystem/paneforge) by [Huntabyte](https://github.com/huntabyte). Visit the [PaneForge documentation](https://paneforge.com) for all the available props and abilities of the `Resizable` component.

## Installation

<PMAddComp name="resizable" />

<ManualInstall>

1. Install `paneforge`:

<PMInstall command="paneforge" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable";
</script>

<Resizable.PaneGroup direction="horizontal">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

## Examples

### Vertical

Use the `direction` prop to set the direction of the resizable panels.

<ComponentPreview name="resizable-vertical">

<div />

</ComponentPreview>

```svelte showLineNumbers {5}
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable";
</script>

<Resizable.PaneGroup direction="vertical">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

### Handle

You can set or hide the handle by using the `withHandle` prop on the `ResizableHandle` component.

<ComponentPreview name="resizable-handle">

<div />

</ComponentPreview>

```svelte showLineNumbers {7}
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable";
</script>

<Resizable.PaneGroup direction="vertical">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```
