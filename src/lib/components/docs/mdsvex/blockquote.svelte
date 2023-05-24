<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLBlockquoteAttributes } from "svelte/elements";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLBlockquoteAttributes;
</script>

<blockquote
  class={cn("mt-6 border-l-2 pl-6 italic", className)}
  {...$$restProps}
>
  <slot />
</blockquote>
