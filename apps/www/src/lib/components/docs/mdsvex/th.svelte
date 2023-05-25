<script lang="ts">
  import type { HTMLThAttributes } from "svelte/elements";

  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLThAttributes;
</script>

<th
  class={cn(
    "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
    className
  )}
  {...$$restProps}
>
  <slot />
</th>
