---
title: Combobox
description: Autocomplete input with a list of suggestions.
component: true
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

A single-line input and a flat list.

```txt
Combobox
+-- ComboboxInput
`-- ComboboxContent
    +-- ComboboxEmpty
    `-- ComboboxList
        +-- ComboboxItem
        `-- ComboboxItem
```

### With groups

Grouped items with labels and separators.

```txt
Combobox
+-- ComboboxInput
`-- ComboboxContent
    `-- ComboboxList
        +-- ComboboxGroup
        |   +-- ComboboxLabel
        |   +-- ComboboxItem
        |   `-- ComboboxItem
        +-- ComboboxSeparator
        `-- ComboboxGroup
```

## Examples

### Basic

A simple combobox with a list of frameworks.

<ComponentPreview name="combobox-basic">

<div></div>

</ComponentPreview>

### Clear

<ComponentPreview name="combobox-clear">

<div></div>

</ComponentPreview>

### Custom items

<ComponentPreview name="combobox-custom">

<div></div>

</ComponentPreview>

### Groups

<ComponentPreview name="combobox-groups">

<div></div>

</ComponentPreview>

### Multiple

<ComponentPreview name="combobox-multiple">

<div></div>

</ComponentPreview>

## Status

The current Svelte combobox uses the `bits-ui` combobox primitive. Multiple selection with chips and built-in clear controls are still blocked on the bits-ui chips work in [huntabyte/bits-ui#2051](https://github.com/huntabyte/bits-ui/pull/2051).
