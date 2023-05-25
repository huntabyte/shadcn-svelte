<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
  type $$Props = HTMLAttributes<HTMLUListElement>;
</script>

<ul class={cn("my-6 ml-6 list-disc", className)} {...$$restProps}>
  <slot />
</ul>
