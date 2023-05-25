<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLAttributes<HTMLHeadingElement>;
</script>

<h6
  class={cn(
    "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
    className
  )}
  {...$$restProps}
>
  <slot />
</h6>
