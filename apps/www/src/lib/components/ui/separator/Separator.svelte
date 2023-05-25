<script lang="ts">
  import { Separator, type SeparatorRootProps } from "radix-svelte";

  import { cn } from "$lib/utils";

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
