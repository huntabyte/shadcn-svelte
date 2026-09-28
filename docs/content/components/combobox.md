---
title: Combobox
description: Autocomplete input with a list of suggestions.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import CodeCollapsibleWrapper from "$lib/components/code-collapsible-wrapper.svelte";
</script>

<ComponentPreview name="combobox-demo">

<div></div>

</ComponentPreview>

## Installation

The Combobox is built using a composition of the `<Popover />` and the `<Command />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Command](/docs/components/command#installation) components.

## Usage

<CodeCollapsibleWrapper >

```svelte title="lib/components/example-combobox.svelte"
<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

  let open = $state(false);
  let value = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);

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
        {...props}
        variant="outline"
        class="w-[200px] justify-between font-normal"
        role="combobox"
        aria-expanded={open}
      >
        {value || "Select a framework"}
        <ChevronDownIcon class="text-muted-foreground" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.List>
        <Command.Empty>No items found.</Command.Empty>
        <Command.Group>
          {#each frameworks as framework (framework)}
            <Command.Item
              value={framework}
              data-checked={value === framework}
              onSelect={() => {
                value = framework;
                closeAndFocusTrigger();
              }}
            >
              {framework}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
```

</CodeCollapsibleWrapper>

## Examples

### Basic

A simple combobox with a list of frameworks.

<ComponentPreview name="combobox-basic">

<div></div>

</ComponentPreview>

### Groups

Use `<Command.Group />` and `<Command.Separator />` to group items.

<ComponentPreview name="combobox-groups">

<div></div>

</ComponentPreview>

### Custom Items

You can render a custom component inside `<Command.Item />`.

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

### Popup

You can trigger the combobox from a button or any other component by using the `child` snippet on `<Popover.Trigger />`. Place the `<Command.Input />` inside the `<Popover.Content />`.

<ComponentPreview name="combobox-popup">

<div></div>

</ComponentPreview>
