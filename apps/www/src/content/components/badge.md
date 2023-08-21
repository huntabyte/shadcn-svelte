---
title: Badge
description: Displays a badge or a component that looks like a badge.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/badge
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
  import { BadgeDemo, BadgeDestructive, BadgeOutline, BadgeSecondary } from '@/registry/default/example'
</script>

<ComponentPreview name="badge-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add badge
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
</script>
```

```svelte
<Badge variant="outline">Badge</Badge>
```

### Link

You can use the `badgeVariants` helper to create a link that looks like a badge.

```svelte
<script lang="ts">
  import { badgeVariants } from "$lib/components/ui/badge";
</script>

<a href="/dashboard" class={badgeVariants({ variant: "outline" })}>Badge</a>
```

## Examples

### Default

<ComponentPreview name="badge-demo">

<div />

</ComponentPreview>

---

### Secondary

<ComponentPreview name="badge-secondary">

<div />

</ComponentPreview>

---

### Outline

<ComponentPreview name="badge-outline">

<div />

</ComponentPreview>

---

### Destructive

<ComponentPreview name="badge-destructive">

<div />

</ComponentPreview>
