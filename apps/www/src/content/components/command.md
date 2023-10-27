---
title: Command
description: Fast, composable, unstyled command menu for Svelte.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/command
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="command-demo" align="start" >

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add command
```

<ManualInstall>

1. Install `cmdk-sv`:

```bash
npm install cmdk-sv bits-ui
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Collapsible from "$lib/components/ui/collapsible";
</script>

<Collapsible.Root>
  <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
  <Collapsible.Content>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </Collapsible.Content>
</Collapsible.Root>
```
