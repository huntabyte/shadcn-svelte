<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLAttributes<HTMLOListElement>;
</script>

<ol class={cn("my-6 ml-6 list-decimal", className)} {...$$restProps}>
  <slot />
</ol>
