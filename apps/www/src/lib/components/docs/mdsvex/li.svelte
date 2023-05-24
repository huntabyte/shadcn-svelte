<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLLiAttributes } from "svelte/elements";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLLiAttributes;
</script>

<li class={cn("mt-2", className)} {...$$restProps}>
  <slot />
</li>
