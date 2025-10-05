---
title: Button
description: Displays a button or a component that looks like a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/button
  doc: https://bits-ui.com/docs/components/button
  api: https://bits-ui.com/docs/components/button#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="button-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="button" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the component source files linked at the top of this page into your project.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button variant="outline">Button</Button>
```

### Link

You can convert the `<button>` into an `<a>` element by simply passing an `href` as a prop.

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button href="/dashboard">Dashboard</Button>
```

Alternatively, you can use the `buttonVariants` helper to create a link that looks like a button.

```svelte
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
</script>

<a href="/dashboard" class={buttonVariants({ variant: "outline" })}>
  Dashboard
</a>
```

## Examples

### Primary

<ComponentPreview name="button-demo">

<div></div>

</ComponentPreview>

---

### Secondary

<ComponentPreview name="button-secondary">

<div></div>

</ComponentPreview>

---

### Destructive

<ComponentPreview name="button-destructive">

<div></div>

</ComponentPreview>

---

### Outline

<ComponentPreview name="button-outline">

<div></div>

</ComponentPreview>

---

### Ghost

<ComponentPreview name="button-ghost">

<div></div>

</ComponentPreview>

---

### Link

<ComponentPreview name="button-link">

<div></div>

</ComponentPreview>

---

### With Icon

<ComponentPreview name="button-with-icon">

<div></div>

</ComponentPreview>

---

### Icon

<ComponentPreview name="button-icon">

<div></div>

</ComponentPreview>

---

### Loading

<ComponentPreview name="button-loading">

<div></div>

</ComponentPreview>
