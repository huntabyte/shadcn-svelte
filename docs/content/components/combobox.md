---
title: Combobox
description: Autocomplete input and command palette with a list of suggestions.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import CodeCollapsibleWrapper from "$lib/components/code-collapsible-wrapper.svelte";
</script>

<ComponentPreview name="combobox-demo" description="A combobox with a list of frameworks.">

<div></div>

</ComponentPreview>

## Installation

The Combobox is built using a composition of the `<Popover />` and the `<Command />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Command](/docs/components/command#installation) components.

## Usage

<CodeCollapsibleWrapper >

```svelte title="lib/components/example-combobox.svelte"
<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

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

  let open = $state(false);
  let value = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(
    frameworks.find((f) => f.value === value)?.label
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class="w-[200px] justify-between"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || "Select a framework..."}
        <ChevronsUpDownIcon class="ms-2 size-4 shrink-0 opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.List>
        <Command.Empty>No framework found.</Command.Empty>
        <Command.Group>
          {#each frameworks as framework}
            <Command.Item
              value={framework.value}
              onSelect={() => {
                value = framework.value;
                closeAndFocusTrigger();
              }}
            >
              <CheckIcon
                class={cn(
                  "me-2 size-4",
                  value !== framework.value && "text-transparent"
                )}
              />
              {framework.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
```

</CodeCollapsibleWrapper>

## Composition

The Combobox is not a single component — it is built by composing `Popover` and `Command` together:

```text
Popover.Root
├── Popover.Trigger
└── Popover.Content
    └── Command.Root
        ├── Command.Input
        └── Command.List
            ├── Command.Empty
            └── Command.Group
                └── Command.Item
```

## Examples

### Combobox

<ComponentPreview name="combobox-demo" description="A combobox with a list of frameworks.">

<div></div>

</ComponentPreview>

### Basic

A simple combobox with a list of frameworks.

<ComponentPreview name="combobox-basic">

<div></div>

</ComponentPreview>

### Multiple

A combobox with multiple selection using chips.

<ComponentPreview name="combobox-multiple">

<div></div>

</ComponentPreview>

### Clear Button

A combobox with a clear button to reset the selection.

<ComponentPreview name="combobox-clear">

<div></div>

</ComponentPreview>

### Groups

Use grouped items with separators between groups.

<ComponentPreview name="combobox-groups">

<div></div>

</ComponentPreview>

### Custom Items

You can render a custom component inside each item.

<ComponentPreview name="combobox-custom">

<div></div>

</ComponentPreview>

### Invalid

Use `aria-invalid` to indicate an invalid state.

<ComponentPreview name="combobox-invalid">

<div></div>

</ComponentPreview>

### Disabled

Use the `disabled` prop to disable the combobox.

<ComponentPreview name="combobox-disabled">

<div></div>

</ComponentPreview>

### Auto Highlight

Automatically highlight the first filtered item on input.

<ComponentPreview name="combobox-auto-highlight">

<div></div>

</ComponentPreview>

### Popup

Trigger a combobox from a button with a country list.

<ComponentPreview name="combobox-popup">

<div></div>

</ComponentPreview>

### Input Group

Add an icon addon to the combobox using the `InputGroup` component.

<ComponentPreview name="combobox-input-group">

<div></div>

</ComponentPreview>

### Popover

<ComponentPreview name="combobox-popover">

<div></div>

</ComponentPreview>

### Dropdown menu

<ComponentPreview name="combobox-dropdown-menu">

<div></div>

</ComponentPreview>

### Responsive

You can create a responsive combobox by using the `<Popover />` on desktop and the `<Drawer />` components on mobile.

<ComponentPreview name="combobox-responsive" >

<div></div>

</ComponentPreview>

### Form

<ComponentPreview name="combobox-form">

<div></div>

</ComponentPreview>
