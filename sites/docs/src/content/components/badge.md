---
title: Badge
description: Displays a badge or a component that looks like a badge.
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/badge
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp } from '$lib/components/docs';
  import { BadgeDemo, BadgeDestructive, BadgeOutline, BadgeSecondary } from '$lib/registry/default/example'
</script>

<ComponentPreview name="badge-demo">

<div></div>

</ComponentPreview>

## Installation

<PMAddComp name="badge" />

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

<div></div>

</ComponentPreview>

---

### Secondary

<ComponentPreview name="badge-secondary">

<div></div>

</ComponentPreview>

---

### Outline

<ComponentPreview name="badge-outline">

<div></div>

</ComponentPreview>

---

### Destructive

<ComponentPreview name="badge-destructive">

<div></div>

</ComponentPreview>
