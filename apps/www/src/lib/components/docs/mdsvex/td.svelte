<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLTdAttributes } from "svelte/elements";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLTdAttributes;
</script>

<td
  class={cn(
    "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
    className
  )}
  {...$$restProps}
>
  <slot />
</td>
