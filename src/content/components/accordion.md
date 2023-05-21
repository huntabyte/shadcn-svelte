---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
radix:
  link: https://www.radix-svelte.com/docs/accordion
  api: https://www.radix-svelte.com/docs/accordion
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

1. Install the `@radix-ui/react-accordion` component from radix-ui:

```bash
npm install @radix-ui/react-accordion
```

2. Copy and paste the following code into your project.

<CodeBlockWrapper>

```svelte
<script lang="ts">
  import { Accordion as AccordionPrimitive, type AccordionRootProps } from "radix-svelte";

  export let value: any = undefined;
  export let type: AccordionRootProps["type"] = "single";
  export let disabled: AccordionRootProps["disabled"] = undefined;
</script>

<AccordionPrimitive.Root bind:value {type} {disabled} {...$$restProps}>
  <slot />
</AccordionPrimitive.Root>
```

</CodeBlockWrapper>

<Callout>

This is the `<Accordion />` primitive. You can place it in a file at `components/ui/accordion.ts`.

</Callout>
</AccordionContent>
</AccordionItem>
</Accordion>

## tailwind.config.js

Add the following animations to your `tailwind.config.js` file:

```js title="tailwind.config.js" {5-18} /module/
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  }
};
```

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
