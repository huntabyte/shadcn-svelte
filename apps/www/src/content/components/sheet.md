---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/sheet
radix: https://www.radix-svelte.com/docs/dialog
---

<script>
  import { SheetDemo, SheetPositionDemo, SheetSizeDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/sheet/SheetDemo.svelte">

<div slot="example">
<SheetDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add sheet
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
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "@/components/ui/sheet";
</script>
```

```svelte
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you sure absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

## Examples

### Position

Pass the `position` property to `<SheetContent />` to indicate the edge of the screen where the component will appear. The values can be `top`, `right`, `bottom` or `left`.

<ComponentExample src="src/lib/components/docs/examples/sheet/SheetPositionDemo.svelte">

<div slot="example">
<SheetPositionDemo />
</div>

</ComponentExample>

---

### Size

Pass the `size` property to `<SheetContent />` if you need to adjust the size of the sheet. The values can be `sm`, `default`, `lg`, `xl`, `full` or `content`.

<ComponentExample src="src/lib/components/docs/examples/sheet/SheetSizeDemo.svelte">

<div slot="example">
<SheetSizeDemo />
</div>

</ComponentExample>
