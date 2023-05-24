<script lang="ts">
  import { cn } from "$lib/utils";
  import {
    Accordion as AccordionPrimitive,
    type AccordionItemProps
  } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
  export let value: AccordionItemProps["value"];
</script>

<AccordionPrimitive.Item
  {value}
  class={cn("border-b", className)}
  {...$$restProps}
>
  <slot />
</AccordionPrimitive.Item>
