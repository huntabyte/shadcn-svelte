---
title: Badge
description: Displays a badge or a component that looks like a badge.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/badge
---

<script>
  import { ComponentExample, ManualInstall } from '$lib/components/docs';
  import { BadgeDemo, BadgeDestructive, BadgeOutline, BadgeSecondary } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/badge/badge-demo.svelte">

<div slot="example">
<BadgeDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add badge
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Badge } from "$components/ui/badge";
</script>
```

```svelte
<Badge variant="outline">Badge</Badge>
```

### Link

You can use the `badgeVariants` helper to create a link that looks like a badge.

```svelte
<script lang="ts">
  import { badgeVariants } from "$components/ui/badge";
</script>

<a href="/dashboard" class={badgeVariants({ variant: "outline" })}>Badge</a>
```

## Examples

### Default

<ComponentExample src="src/lib/registry/default/example/badge/badge-demo.svelte">

<div slot="example">
<BadgeDemo />
</div>

</ComponentExample>

---

### Secondary

<ComponentExample src="src/lib/registry/default/example/badge/badge-secondary.svelte">

<div slot="example">
<BadgeSecondary />
</div>

</ComponentExample>

---

### Outline

<ComponentExample src="src/lib/registry/default/example/badge/badge-outline.svelte">

<div slot="example">
<BadgeOutline />
</div>

</ComponentExample>

---

### Destructive

<ComponentExample src="src/lib/registry/default/example/badge/badge-destructive.svelte">

<div slot="example">
<BadgeDestructive />
</div>

</ComponentExample>
