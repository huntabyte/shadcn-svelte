---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
component: true
featured: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/dialog
radix: https://www.radix-svelte.com/docs/dialog
---

<script>
  import { DialogDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/dialog/DialogDemo.svelte">

<div slot="example">
<DialogDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-ui add dialog
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "$components/ui/dialog";
</script>
```

```svelte
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

## Notes

(coming soon)
