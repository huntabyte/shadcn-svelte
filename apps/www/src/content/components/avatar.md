---
title: Avatar
description: An image element with a fallback for representing the user.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/avatar
bits: https://www.@huntabyte/bits-ui.com/docs/components/avatar
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="avatar-demo">

<div/>

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add avatar
```

<ManualInstall>

1. Install `@huntabyte/bits-ui`:

```bash
npm install @huntabyte/bits-ui
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
</script>

<Avatar.Root>
  <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
  <Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
```
