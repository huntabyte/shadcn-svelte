---
title: Card
description: Displays a card with header, content, and footer.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/card
---

<script>
  import { ComponentPreview, PMAddComp, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="card-with-form">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="card" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Copy and paste the component source files linked at the top of this page into your project.</Step>
</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
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

## Examples

<ComponentPreview name="card-demo">

<div></div>

</ComponentPreview>
