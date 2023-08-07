---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/accordion
radix: https://www.radix-svelte.com/docs/accordion
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/accordion
---

<script>
    import { AccordionDemo, ComponentExample, ManualInstall } from '$components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/accordion/AccordionDemo.svelte">

<div slot="example" style="max-width: 70%; width: 100%;">
<AccordionDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add accordion
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
  import * as Accordion from "$components/ui/accordion";
</script>

<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```
