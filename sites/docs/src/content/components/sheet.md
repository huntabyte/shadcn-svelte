---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/sheet
  doc: https://bits-ui.com/docs/components/dialog
  api: https://bits-ui.com/docs/components/dialog#api-reference
---

<script>
  import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="sheet-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="sheet" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>

Install `bits-ui`:

</Step>
<PMInstall command="bits-ui -D" />
<Step>Copy and paste the component source files linked at the top of this page into your project.</Step>
</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index.js";
</script>

<Sheet.Root>
  <Sheet.Trigger>Open</Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header>
      <Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
      <Sheet.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
```

## Examples

### Side

Pass the `side` property to `<SheetContent />` to indicate the edge of the screen where the component will appear. The values can be `top`, `right`, `bottom` or `left`.

<ComponentPreview name="sheet-side">

<div></div>

</ComponentPreview>
