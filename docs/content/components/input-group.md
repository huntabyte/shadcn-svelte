---
title: Input Group
description: Display additional information or actions to an input or textarea.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/input-group
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
	import Callout from "$lib/components/callout.svelte";
</script>

<ComponentPreview name="input-group" previewClassName="h-[26rem]">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="input-group" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `@lucide/svelte`:

</Step>

<PMInstall command="@lucide/svelte -D" />

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
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
</script>
```

```svelte showLineNumbers
<InputGroup.Root>
  <InputGroup.Input placeholder="Search..." />
  <InputGroup.Addon>
    <SearchIcon />
  </InputGroup.Addon>
  <InputGroup.Addon align="inline-end">
    <InputGroup.Button>Search</InputGroup.Button>
  </InputGroup.Addon>
</InputGroup.Root>
```

## Composition

Use the following composition to build an `InputGroup`:

```text
InputGroup.Root
├── InputGroup.Input or InputGroup.Textarea
├── InputGroup.Addon
├── InputGroup.Button
└── InputGroup.Text
```

## Align

Use the `align` prop on `InputGroup.Addon` to position the addon relative to the input.

<Callout className="mt-4">

For proper focus management, `InputGroup.Addon` should always be placed after `InputGroup.Input` or `InputGroup.Textarea` in the DOM. Use the `align` prop to visually position the addon.

</Callout>

### inline-start

Use `align="inline-start"` to position the addon at the start of the input. This is the default.

<ComponentPreview name="input-group-inline-start-demo" previewClassName="h-48">

<div></div>

</ComponentPreview>

### inline-end

Use `align="inline-end"` to position the addon at the end of the input.

<ComponentPreview name="input-group-inline-end-demo" previewClassName="h-48">

<div></div>

</ComponentPreview>

### block-start

Use `align="block-start"` to position the addon above the input.

<ComponentPreview name="input-group-block-start-demo" previewClassName="h-96">

<div></div>

</ComponentPreview>

### block-end

Use `align="block-end"` to position the addon below the input.

<ComponentPreview name="input-group-block-end-demo" previewClassName="h-[26rem]">

<div></div>

</ComponentPreview>

## Examples

### Icon

Display icons inside the input group to provide visual context.

<ComponentPreview name="input-group-icon-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

### Text

Display additional text information alongside inputs.

<ComponentPreview name="input-group-text-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

### Button

Add buttons to perform actions within the input group.

<ComponentPreview name="input-group-button-demo" previewClassName="h-72">

<div></div>

</ComponentPreview>

### Kbd

Display keyboard shortcuts within the input group.

<ComponentPreview name="input-group-kbd-demo" previewClassName="h-40">

<div></div>

</ComponentPreview>

### Dropdown

Pair input groups with dropdown menus for complex interactions.

<ComponentPreview name="input-group-dropdown-demo" previewClassName="h-56">

<div></div>

</ComponentPreview>

### Spinner

Show loading indicators while processing input.

<ComponentPreview name="input-group-spinner-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

### Textarea

Input groups also work with textarea components. Use `block-start` or `block-end` for alignment.

<ComponentPreview name="input-group-textarea-demo" previewClassName="h-96">

<div></div>

</ComponentPreview>

### Custom Input

Add the `data-slot="input-group-control"` attribute to your custom input for automatic behavior and focus state handling.

No style is applied to the custom input. Apply your own styles using the `class` prop.

<ComponentPreview name="input-group-custom-input-demo" previewClassName="h-56">

<div></div>

</ComponentPreview>

## API Reference

### InputGroup.Root

The main component that wraps inputs and addons.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

```svelte
<InputGroup.Root>
  <InputGroup.Input />
  <InputGroup.Addon />
</InputGroup.Root>
```

### InputGroup.Addon

Displays icons, text, buttons, or other content alongside inputs.

<Callout>

For proper focus navigation, the `InputGroup.Addon` component should be placed after the input. Set the `align` prop to position the addon.

</Callout>

| Prop    | Type                                                             | Default          |
| ------- | ---------------------------------------------------------------- | ---------------- |
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |
| `class` | `string`                                                         |                  |

```svelte
<InputGroup.Addon align="inline-end">
  <SearchIcon />
</InputGroup.Addon>
```

**For `<InputGroup.Input />`, use the `inline-start` or `inline-end` alignment. For `<InputGroup.Textarea />`, use the `block-start` or `block-end` alignment.**

The `InputGroup.Addon` component can have multiple `InputGroup.Button` components and icons.

```svelte
<InputGroup.Addon>
  <InputGroup.Button>Button</InputGroup.Button>
  <InputGroup.Button>Button</InputGroup.Button>
</InputGroup.Addon>
```

### InputGroup.Button

Displays buttons within input groups.

| Prop      | Type                                                                          | Default   |
| --------- | ----------------------------------------------------------------------------- | --------- |
| `size`    | `"xs" \| "icon-xs" \| "sm" \| "icon-sm"`                                      | `"xs"`    |
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"ghost"` |
| `class`   | `string`                                                                      |           |

```svelte
<InputGroup.Button>Button</InputGroup.Button>
<InputGroup.Button size="icon-xs" aria-label="Copy">
  <CopyIcon />
</InputGroup.Button>
```

### InputGroup.Input

Replacement for `<Input />` when building input groups. This component has the input group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

All other props are passed through to the underlying `<Input />` component.

```svelte
<InputGroup.Root>
  <InputGroup.Input placeholder="Enter text..." />
  <InputGroup.Addon>
    <SearchIcon />
  </InputGroup.Addon>
</InputGroup.Root>
```

### InputGroup.Textarea

Replacement for `<Textarea />` when building input groups. This component has the textarea group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `class` | `string` |         |

All other props are passed through to the underlying `<Textarea />` component.

```svelte
<InputGroup.Root>
  <InputGroup.Textarea placeholder="Enter message..." />
  <InputGroup.Addon align="block-end">
    <InputGroup.Button>Send</InputGroup.Button>
  </InputGroup.Addon>
</InputGroup.Root>
```
