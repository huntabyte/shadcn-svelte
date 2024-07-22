---
title: Combobox
description: Autocomplete input and command palette with a list of suggestions.
component: true
---

<script>
  import { ComponentPreview, ManualInstall, Callout } from '$lib/components/docs';
</script>

<ComponentPreview name="combobox-demo">

<div />

</ComponentPreview>

## Installation

The Combobox is built using a composition of the `<Popover />` and the `<Command />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Command](/docs/components/command#installation) components.

## Usage

```svelte
<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Command from "$lib/registry/default/ui/command/index.js";
  import * as Popover from "$lib/registry/default/ui/popover/index.js";
  import { Button } from "$lib/registry/default/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { tick } from "svelte";

  const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  let open = false;
  let value = "";

  $: selectedValue =
    frameworks.find((f) => f.value === value)?.label ??
    "Select a framework...";

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between"
    >
      {selectedValue}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.Empty>No framework found.</Command.Empty>
      <Command.Group>
        {#each frameworks as framework}
          <Command.Item
            value={framework.value}
            onSelect={(currentValue) => {
              value = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check
              class={cn(
                "mr-2 h-4 w-4",
                value !== framework.value && "text-transparent"
              )}
            />
            {framework.label}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
```

## Examples

### Combobox

<ComponentPreview name="combobox-demo">

<div />

</ComponentPreview>

### Popover

<ComponentPreview name="combobox-popover">

<div />

</ComponentPreview>

### Dropdown menu

<ComponentPreview name="combobox-dropdown-menu">

<div />

</ComponentPreview>

### Form

Since the Combobox is built using the `<Popover />` and the `<Command />` components, we need to use the `<Form.Control />` component. `<Form.Control />` enables us to apply the right `aria-*` attributes to non-standard form elements, and adds a hidden input to ensure the form is submitted with the correct value.

Note: You must be on version `0.5.0` or higher of `formsnap` for this to work correctly.

<ComponentPreview name="combobox-form">

<div />

</ComponentPreview>
