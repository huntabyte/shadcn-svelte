<script lang="ts">
  import { cn } from "$lib/utils";
  import { HoverCard as HoverCardPrimitive } from "radix-svelte";
  import type {
    HoverCardContentProps,
    HoverCardPortalProps
  } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
  export let align: HoverCardContentProps["align"] = undefined;
  export let sideOffset: HoverCardContentProps["sideOffset"] = undefined;
  export let container: HoverCardPortalProps["container"] = undefined;

  type $$Props = HoverCardContentProps & {
    container?: HoverCardPortalProps["container"];
  };
</script>

<HoverCardPrimitive.Portal {container}>
  <HoverCardPrimitive.Content
    {align}
    {sideOffset}
    class={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90",
      className
    )}
    {...$$restProps}
  >
    <slot />
  </HoverCardPrimitive.Content>
</HoverCardPrimitive.Portal>
