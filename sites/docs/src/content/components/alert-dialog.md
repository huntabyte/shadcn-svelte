---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/alert-dialog
  doc: https://bits-ui.com/docs/components/alert-dialog
  api: https://bits-ui.com/docs/components/alert-dialog#api-reference
---

<script>
  import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="alert-dialog-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="alert-dialog" />
{/snippet}
{#snippet manual()}
<Steps>

### Install `bits-ui`:

<PMInstall command="bits-ui -D" />

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger>Open</AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
```
