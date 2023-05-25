<script lang="ts">
  import type { HTMLLiAttributes } from "svelte/elements";

  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLLiAttributes;
</script>

<li class={cn("mt-2", className)} {...$$restProps}>
  <slot />
</li>
