---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
featured: true
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/alert-dialog
radix: https://https://www.radix-svelte.com/docs/alert-dialog
---

<script>
  import { AlertDialogDemo, ComponentExample, ManualInstall } from '$components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/alert-dialog/AlertDialogDemo.svelte">

<div slot="example">
<AlertDialogDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-ui add alert-dialog
```

<ManualInstall>

1. Install `radix-svelte`:

```bash
npm install radix-svelte
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
  } from "$components/ui/alert-dialog";
</script>
```

```svelte
<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
