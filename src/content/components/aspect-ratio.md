---
title: Aspect Ratio
description: Displays content within a desired ratio.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/aspect-ratio
radix: https://www.radix-svelte.com/docs/aspect-ratio
---

<script>
  import { AspectRatioDemo, ComponentExample, ManualInstall } from '$components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/aspect-ratio/AspectRatioDemo.svelte">

<div slot="example" style="width: 100%;">
<AspectRatioDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-ui add aspect-ratio
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
  import { AspectRatio } from "$components/ui/aspect-ratio";
</script>
```

```svelte
<AspectRatio ratio={16 / 9} class="bg-muted">
  <img src="..." alt="..." class="rounded-md object-cover" />
</AspectRatio>
```
