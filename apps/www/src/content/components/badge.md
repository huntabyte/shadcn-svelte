---
title: Badge
description: Displays a badge or a component that looks like a badge.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/badge
---

<script>
  import { BadgeDemo, BadgeDemoDestructive, BadgeDemoOutline, BadgeDemoSecondary, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/badge/BadgeDemo.svelte">

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
```

```svelte
<a href="/dashboard" class={badgeVariants({ variant: "outline" })}>Badge</a>
```

## Examples

### Default

<ComponentExample src="src/lib/components/docs/examples/badge/BadgeDemo.svelte">

<div slot="example">
<BadgeDemo />
</div>

</ComponentExample>

---

### Secondary

<ComponentExample src="src/lib/components/docs/examples/badge/BadgeDemoSecondary.svelte">

<div slot="example">
<BadgeDemoSecondary />
</div>

</ComponentExample>

---

### Outline

<ComponentExample src="src/lib/components/docs/examples/badge/BadgeDemoOutline.svelte">

<div slot="example">
<BadgeDemoOutline />
</div>

</ComponentExample>

---

### Destructive

<ComponentExample src="src/lib/components/docs/examples/badge/BadgeDemoDestructive.svelte">

<div slot="example">
<BadgeDemoDestructive />
</div>

</ComponentExample>
