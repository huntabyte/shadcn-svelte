---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/accordion
radix: https://www.radix-svelte.com/docs/accordion
---

<script>
    import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '$ui/accordion';
    import { AccordionDemo, ComponentExample, CodeBlockWrapper, ComponentSource, Callout } from '$components/docs';
</script>

<ComponentExample>
  <div style="max-width: 70%; width: 100%;">
  <AccordionDemo />
  </div>
</ComponentExample>

## Installation

```bash
npx shadcn-ui add accordion
```

<Accordion type="single" collapsible>
<AccordionItem value="manual-installation">
<AccordionTrigger>Manual Installation</AccordionTrigger>
<AccordionContent>

1. Install the `radix-svelte`:

```bash
npm install radix-svelte
```

2. Copy and paste the component source files linked at the top of this page into your project.

<Callout>

This is the `<Accordion />` primitive. You can place it in a file at `components/ui/accordion.ts`.

</Callout>
</AccordionContent>
</AccordionItem>
</Accordion>

## Usage

```svelte
<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
  } from "$components/ui/accordion";
</script>

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>
```
