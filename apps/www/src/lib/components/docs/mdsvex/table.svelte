<script lang="ts">
  import type { HTMLTableAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLTableAttributes;
</script>

<div class="my-6 w-full overflow-y-auto">
  <table class={cn("w-full", className)} {...$$restProps}>
    <slot />
  </table>
</div>
