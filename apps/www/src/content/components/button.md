---
title: Button
description: Displays a button or a component that looks like a button.
featured: true
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/button
---

<script>
  import { ComponentExample, ManualInstall } from '$lib/components/docs';
  import { ButtonDemo, ButtonDemoDestructive, ButtonDemoGhost, ButtonDemoOutline, ButtonDemoSecondary, ButtonDemoIcon, ButtonDemoLoading, ButtonDemoLink } from '@/registry/default/example'
</script>

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemo.svelte">

<div slot="example">
<ButtonDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add button
```

<ManualInstall>

1. Install `@huntabyte/primitives`:

```bash
npm install @huntabyte/primitives
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Button } from "$components/ui/button";
</script>
```

```svelte
<Button variant="outline">Button</Button>
```

### Link

You can convert the `<button>` into an `<a>` element by simply passing an `href` as a prop.

```svelte
<script lang="ts">
  import { Button } from "$components/ui/button";
</script>

<Button href="/dashboard">Dashboard</Button>
```

Alternatively, you can use the `buttonVariants` helper to create a link that looks like a button.

```svelte
<script lang="ts">
  import { buttonVariants } from "$components/ui/button";
</script>

<a href="/dashboard" class={buttonVariants({ variant: "outline" })}>
  Dashboard
</a>
```

## Examples

### Primary

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemo.svelte">

<div slot="example">
<ButtonDemo />
</div>

</ComponentExample>

---

### Secondary

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemoSecondary.svelte">

<div slot="example">
<ButtonDemoSecondary />
</div>

</ComponentExample>

---

### Destructive

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemoDestructive.svelte">

<div slot="example">
<ButtonDemoDestructive />
</div>

</ComponentExample>

---

### Outline

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemoOutline.svelte">

<div slot="example">
<ButtonDemoOutline />
</div>

</ComponentExample>

---

### Ghost

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemoGhost.svelte">

<div slot="example">
<ButtonDemoGhost />
</div>

</ComponentExample>

---

### Link

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemoLink.svelte">

<div slot="example">
<ButtonDemoLink />
</div>

</ComponentExample>

---

### With Icon

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemoIcon.svelte">

<div slot="example">
<ButtonDemoIcon />
</div>

</ComponentExample>

---

### Loading

<ComponentExample src="src/lib/registry/default/example/button/ButtonDemoLoading.svelte">

<div slot="example">
<ButtonDemoLoading />
</div>

</ComponentExample>
