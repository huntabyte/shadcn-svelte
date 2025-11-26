---
title: Breadcrumb
description: Displays the path to the current resource using a hierarchy of links.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/breadcrumb
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

<ComponentPreview name="breadcrumb-demo">

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

## Examples

### Custom separator

Use a custom component in the `<slot>` of `<Breadcrumb.Separator />` to create a custom separator.

<ComponentPreview name="breadcrumb-separator">

<div></div>

</ComponentPreview>

```svelte showLineNumbers {2,11-13}
<script lang="ts">
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

---

### Dropdown

You can compose `<Breadcrumb.Item />` with a `<DropdownMenu />` to create a dropdown in the breadcrumb.

<ComponentPreview name="breadcrumb-dropdown">

<div></div>

</ComponentPreview>

```svelte showLineNumbers {2-5,11-22}
<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

...

<Breadcrumb.Item>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="flex items-center gap-1">
      Components
      <ChevronDownIcon class="size-4" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="start">
      <DropdownMenu.Item>Documentation</DropdownMenu.Item>
      <DropdownMenu.Item>Themes</DropdownMenu.Item>
      <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</Breadcrumb.Item>
```

---

### Collapsed

We provide a `<Breadcrumb.Ellipsis />` component to show a collapsed state when the breadcrumb is too long.

<ComponentPreview name="breadcrumb-ellipsis">

<div></div>

</ComponentPreview>

```svelte showLineNumbers {2,9}
<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
 <Breadcrumb.List>
     {/* ... */}
  <Breadcrumb.Item>
   <Breadcrumb.Ellipsis />
  </Breadcrumb.Item>
    {/* ... */}
 </Breadcrumb.List>
</Breadcrumb.Root>
```

---

### Link component

To use a custom link component from your routing library, you can use the `asChild` prop on `<Breadcrumb.Link />`.

<ComponentPreview name="breadcrumb-link">

<div></div>

</ComponentPreview>

```svelte showLineNumbers {2,7-9}
<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
 <Breadcrumb.List>
  <Breadcrumb.Item>
   <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
    {/* ... */}
 </Breadcrumb.List>
</Breadcrumb.Root>
```

---

### Responsive

Here's an example of a responsive breadcrumb that composes `<Breadcrumb.Item />` with `<Breadcrumb.Ellipsis />`, `<DropdownMenu />`, and `<Drawer />`.

It displays a dropdown on desktop and a drawer on mobile.

<ComponentPreview name="breadcrumb-responsive">

<div></div>

</ComponentPreview>
