<script lang="ts">
  import {
    RadioGroup as RadioGroupPrimitive,
    type RadioGroupRootProps
  } from "radix-svelte";

  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  export let value: RadioGroupRootProps["value"] = undefined;
  type $$Props = RadioGroupRootProps;
</script>

<RadioGroupPrimitive.Root
  bind:value
  class={cn("grid gap-2", className)}
  {...$$restProps}
>
  <slot />
</RadioGroupPrimitive.Root>
