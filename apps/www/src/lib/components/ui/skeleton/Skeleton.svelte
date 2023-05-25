<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLAttributes<HTMLDivElement>;
</script>

<div
  class={cn("animate-pulse rounded-md bg-muted", className)}
  {...$$restProps}
/>
