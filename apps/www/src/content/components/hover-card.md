---
title: Hover Card
description: For sighted users to preview content available behind a link.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/hover-card
radix: https://www.radix-svelte.com/docs/hovercard
---

<script>
  import { HoverCardDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/hover-card/HoverCardDemo.svelte">

<div slot="example">
<HoverCardDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add hover-card
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
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
  } from "$components/ui/hover-card";
</script>
```

```svelte
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>SvelteKit - Web development, streamlined</HoverCardContent>
</HoverCard>
```
