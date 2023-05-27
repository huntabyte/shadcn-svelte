---
title: Label
description: Renders an accessible label associated with controls.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/label
radix: https://www.radix-svelte.com/docs/label
---

<script>
  import { LabelDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/label/LabelDemo.svelte">

<div slot="example">
<LabelDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add label
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
  import { Label } from "$components/ui/label";
</script>
```

```svelte
<Label for="email">Your email address</Label>
```
