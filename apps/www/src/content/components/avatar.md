---
title: Avatar
description: An image element with a fallback for representing the user.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/avatar
radix: https://www.radix-svelte.com/docs/avatar
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/avatar
---

<script>
  import { AvatarDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/avatar/AvatarDemo.svelte">

<div slot="example">
<AvatarDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add avatar
```

<ManualInstall>

1. Install `@huntabyte/primitives`:

```bash
npm install @huntabyte/primitives
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Avatar from "$components/ui/avatar";
</script>

<Avatar.Root>
  <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
  <Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
```
