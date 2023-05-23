---
title: Card
description: Displays a button or a component that looks like a button.
featured: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/card
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
npx shadcn-ui add card
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

## Examples

Coming soon
