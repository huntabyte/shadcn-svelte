<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLAttributes<HTMLTableRowElement>;
</script>

<tr class={cn("m-0 border-t p-0 even:bg-muted", className)} {...$$restProps}>
  <slot />
</tr>
