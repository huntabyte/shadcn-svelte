<script lang="ts">
  import { cn } from "$lib/utils";
  import { Separator, type SeparatorRootProps } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };

  export let orientation: SeparatorRootProps["orientation"] = "horizontal";
  export let decorative: SeparatorRootProps["decorative"] = true;
</script>

<Separator.Root
  {orientation}
  {decorative}
  class={cn(
    "shrink-0 bg-border",
    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
    className
  )}
  {...$$restProps}
/>
