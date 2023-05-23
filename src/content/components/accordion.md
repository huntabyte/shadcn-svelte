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

```svelte title="Accordion.svelte"
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

```svelte title="AccordionContent.svelte"
<script lang="ts">
  import { Accordion as AccordionPrimitive, type AccordionContentProps } from "radix-svelte";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  export let transition: AccordionContentProps["transition"] = true;

  type $$Props = AccordionContentProps;
</script>

<AccordionPrimitive.Content
  class={cn("overflow-hidden text-sm", className)}
  {...$$restProps}
  {transition}
>
  <div class="pb-4 pt-0">
    <slot />
  </div>
</AccordionPrimitive.Content>
```

```svelte title="AccordionItem.svelte"
<script lang="ts">
  import { Accordion as AccordionPrimitive, type AccordionItemProps } from "radix-svelte";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  export let value: AccordionItemProps["value"];
</script>

<AccordionPrimitive.Item {value} class={cn("border-b", className)} {...$$restProps}>
  <slot />
</AccordionPrimitive.Item>
```

```svelte title="AccordionTrigger.svelte"
<script lang="ts">
  import { Accordion as AccordionPrimitive } from "radix-svelte";
  import { ChevronDown } from "lucide-svelte";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<AccordionPrimitive.Header class="flex">
  <AccordionPrimitive.Trigger
    class={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...$$restProps}
  >
    <slot />
    <ChevronDown class="h-4 w-4 transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
```

</CodeBlockWrapper>

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
