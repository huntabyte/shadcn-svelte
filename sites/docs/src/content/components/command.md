---
title: Command
description: Fast, composable, unstyled command menu for Svelte.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/command
bits: https://github.com/huntabyte/cmdk-sv
---

<script>
  import { ComponentPreview, ManualInstall, Callout, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="command-demo" align="start" >

<div />

</ComponentPreview>

## About

The `<Command />` component uses the [`cmdk-sv`](https://cmdk-sv.com) library to provide a fast, composable, unstyled command menu for Svelte.

<Callout>

**Note:** `cmdk-sv` is a new library and is still in alpha. While I don't anticipate a ton of breaking changes, as the API aligns with the original, I want to bring this to your awareness. If you find any bugs, please [open an issue](https://github.com/huntabyte/cmdk-sv) with the library, rather than this project.

</Callout>

## Installation

<PMAddComp name="command" />

<ManualInstall>

1. Install `cmdk-sv` and `bits-ui`:

<PMInstall command="cmdk-sv bits-ui" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Command from "$lib/components/ui/command";
</script>

<Command.Root>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>Calendar</Command.Item>
      <Command.Item>Search Emoji</Command.Item>
      <Command.Item>Calculator</Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>Profile</Command.Item>
      <Command.Item>Billing</Command.Item>
      <Command.Item>Settings</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>
```

## Examples

### Dialog

<ComponentPreview name="command-dialog">

<div />

</ComponentPreview>

To show the command menu in a dialog, use the `<Command.Dialog />` component instead of `<Command.Root />`. It accepts props for both the `<Dialog.Root />` and `<Command.Root />` components.

```svelte
<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import { onMount } from "svelte";

  let open = false;

  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open = !open;
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<Command.Dialog bind:open>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>Calendar</Command.Item>
      <Command.Item>Search Emoji</Command.Item>
      <Command.Item>Calculator</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>
```
