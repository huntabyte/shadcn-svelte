<script lang="ts">
  import { cn } from "$lib/utils";
  import { Tabs as TabsPrimitive, type TabsContentProps } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
  export let value: TabsContentProps["value"];
  type $$Props = TabsContentProps;
</script>

<TabsPrimitive.Content
  class={cn(
    "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className
  )}
  {value}
  {...$$restProps}
>
  <slot />
</TabsPrimitive.Content>
