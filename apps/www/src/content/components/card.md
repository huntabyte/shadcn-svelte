---
title: Card
description: Displays a card with header, content, and footer.
featured: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/card
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="card-with-form">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add card
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Card from "$lib/components/ui/card";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card Description</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card Content</p>
  </Card.Content>
  <Card.Footer>
    <p>Card Footer</p>
  </Card.Footer>
</Card.Root>
```

### Modify the heading level

By default, the `<CardTitle>` component renders an `<h3>` element. You can change this by passing a `tag` prop to the component.

For example:

```svelte
<CardTitle tag="h2">This will render an H2</CardTitle>
```

```svelte
<CardTitle tag="h5">This will render an H5</CardTitle>
```

```svelte
<CardTitle tag="p">This will render a P tag</CardTitle>
```

## Examples

<ComponentPreview name="card-demo">

<div />

</ComponentPreview>
