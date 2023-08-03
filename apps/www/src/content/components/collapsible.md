---
title: Collapsible
description: An interactive component which expands/collapses a panel.
component: true
featured: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/collapsible
radix: https://www.radix-svelte.com/docs/collapsible
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/collapsible
---

<script>
  import { CollapsibleDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/collapsible/CollapsibleDemo.svelte">

<div slot="example">
<CollapsibleDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add collapsible
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
  import { Collapsible } from "$components/ui/collapsible";
</script>
```

```svelte
<Collapsible>
  <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
  <Collapsible.Content>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </Collapsible.Content>
</Collapsible>
```
