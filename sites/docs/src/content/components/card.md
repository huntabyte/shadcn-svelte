---
title: Card
description: Displays a card with header, content, and footer.
featured: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/card
---

<script>
  import { ComponentPreview, ManualInstall, PMAddComp } from '$lib/components/docs';
</script>

<ComponentPreview name="card-with-form">

<div />

</ComponentPreview>

## Installation

<PMAddComp name="card" />

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

By default, the `<Card.Title>` component renders an `<h3>` element. You can change this by passing a `tag` prop to the component.

For example:

```svelte
<Card.Title tag="h1">This will render an H1</Card.Title>
```

...

```svelte
<Card.Title tag="h6">This will render an H6</Card.Title>
```

## Examples

<ComponentPreview name="card-demo">

<div />

</ComponentPreview>
