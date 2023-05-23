---
title: Separator
description: Visually or semantically separates content.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/separator
radix: https://www.radix-svelte.com/docs/separator
---

<script>
  import { SeparatorDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/separator/SeparatorDemo.svelte">

<div slot="example">
<SeparatorDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-ui add separator
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
  import { Separator } from "@/components/ui/separator";
</script>
```

```svelte
<Separator />
```
