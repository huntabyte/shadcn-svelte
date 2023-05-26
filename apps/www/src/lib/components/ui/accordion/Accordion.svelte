<script lang="ts">
  import type { AccordionRootProps } from "radix-svelte";
  import { Accordion as AccordionPrimitive } from "radix-svelte";

  // Remove the any when radix-svelte is updated to properly satisfy the types
  // https://www.radix-svelte.com/docs/accordion
  export let value: any = undefined;
  export let type: "single" | "multiple" = "single";
  export let disabled: AccordionRootProps["disabled"] = undefined;
  type $$Props = AccordionRootProps & {
    value: any;
  };
</script>

<AccordionPrimitive.Root bind:value {type} {disabled} {...$$restProps}>
  <slot />
</AccordionPrimitive.Root>
