---
title: Combobox
description: Autocomplete input with a list of suggestions.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/combobox
  doc: https://bits-ui.com/docs/components/combobox
  api: https://bits-ui.com/docs/components/combobox#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

<ComponentPreview name="combobox-demo">

<div></div>

</ComponentPreview>

## Installation

```bash
pnpm dlx shadcn-svelte@latest add combobox
```

## Usage

```svelte
<script lang="ts">
  import * as Combobox from "$lib/components/ui/combobox/index.js";

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const;

  let value = $state("");
  let inputValue = $state("");

  const filteredFrameworks = $derived(
    inputValue === ""
      ? frameworks
      : frameworks.filter((framework) =>
          framework.toLowerCase().includes(inputValue.toLowerCase())
        )
  );
</script>

<Combobox.Root
  bind:value
  {inputValue}
  onOpenChangeComplete={(open) => {
    if (!open) inputValue = "";
  }}
>
  <Combobox.Input
    placeholder="Select a framework"
    oninput={(event) => (inputValue = event.currentTarget.value)}
  />
  <Combobox.Content>
    <Combobox.List>
      {#each filteredFrameworks as framework (framework)}
        <Combobox.Item value={framework} label={framework} />
      {:else}
        <Combobox.Empty>No items found.</Combobox.Empty>
      {/each}
    </Combobox.List>
  </Combobox.Content>
</Combobox.Root>
```

## Composition

### Simple

A single-line input and a flat list (see [Basic](#basic)).

```txt
Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem
```

### With chips

Multi-select with `multiple`, chips, and a chips input (see [Multiple](#multiple)).

```txt
Combobox
├── ComboboxChips
│   ├── ComboboxValue
│   │   └── ComboboxChip
│   └── ComboboxChipsInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem
```

### With groups and collection

Nested items per group using `ComboboxCollection` inside each `ComboboxGroup`, with a separator between groups (see [Groups](#groups)).

```txt
Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxGroup
        │   ├── ComboboxLabel
        │   └── ComboboxCollection
        │       ├── ComboboxItem
        │       └── ComboboxItem
        ├── ComboboxSeparator
        └── ComboboxGroup
            ├── ComboboxLabel
            └── ComboboxCollection
                ├── ComboboxItem
                └── ComboboxItem
```

## Custom Items

Use custom item content when your items need richer rendering.

```svelte
<Combobox.Item value={country.value} label={country.label}>
  <Item.Root size="xs" class="p-0">
    <Item.Content>
      <Item.Title>{country.label}</Item.Title>
      <Item.Description>{country.continent}</Item.Description>
    </Item.Content>
  </Item.Root>
</Combobox.Item>
```

## Multiple Selection

Use `multiple` with chips for multi-select behavior.

## Examples

### Basic

A simple combobox with a list of frameworks.

<ComponentPreview name="combobox-basic">

<div></div>

</ComponentPreview>

### Multiple

A combobox with multiple selection using `multiple` and `ComboboxChips`.

<ComponentPreview name="combobox-multiple">

<div></div>

</ComponentPreview>

### Clear Button

Use the `showClear` prop to show a clear button.

<ComponentPreview name="combobox-clear">

<div></div>

</ComponentPreview>

### Groups

Use `ComboboxGroup` and `ComboboxSeparator` to group items.

<ComponentPreview name="combobox-groups">

<div></div>

</ComponentPreview>

### Custom Items

You can render a custom component inside `ComboboxItem`.

<ComponentPreview name="combobox-custom">

<div></div>

</ComponentPreview>

### Invalid

Use the `aria-invalid` prop to make the combobox invalid.

<ComponentPreview name="combobox-invalid">

<div></div>

</ComponentPreview>

### Disabled

Use the `disabled` prop to disable the combobox.

<ComponentPreview name="combobox-disabled">

<div></div>

</ComponentPreview>

### Auto Highlight

Use the `autoHighlight` prop to automatically highlight the first item on filter.

<ComponentPreview name="combobox-auto-highlight">

<div></div>

</ComponentPreview>

### Popup

You can trigger the combobox from a button or any other component by using the `child` snippet. Move the `ComboboxInput` inside the `ComboboxContent`.

<ComponentPreview name="combobox-in-popup">

<div></div>

</ComponentPreview>

### Input Group

You can add an addon to the combobox by using the `InputGroupAddon` component inside the `ComboboxInput`.

<ComponentPreview name="combobox-input-group">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI Combobox API reference](https://bits-ui.com/docs/components/combobox#api-reference) for more information.
