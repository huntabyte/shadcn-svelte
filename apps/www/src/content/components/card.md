---
title: Card
description: Displays a button or a component that looks like a button.
featured: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/card
---

<script>
  import { CardDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/card/CardDemo.svelte">

<div slot="example">
<CardDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add card
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "$components/ui/card";
</script>
```

```svelte
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

### Modify the heading level

By default, the `<CardTitle>` component renders an `<h3>` element. You can change this by passing a `tag` prop to the component.

For example:

```svelte
<CardTitle tag={"h2"}>This will render an H2</CardTitle>
```

```svelte
<CardTitle tag={"h5"}>This will render an H5</CardTitle>
```

```svelte
<CardTitle tag={"p"}>This will render a P tag</CardTitle>
```

## Examples

Coming soon
