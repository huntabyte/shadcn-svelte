<script lang="ts">
  import { cn } from "$lib/utils";
  import { AspectRatio, type AspectRatioProps } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
  export let ratio: AspectRatioProps["ratio"] = 16 / 9;
  type $$Props = AspectRatioProps;
</script>

<AspectRatio.Root {ratio} class={cn(className)} {...$$restProps}>
  <slot />
</AspectRatio.Root>
