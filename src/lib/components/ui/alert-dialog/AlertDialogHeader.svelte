<script lang="ts">
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div
  class={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
  {...$$restProps}
>
  <slot />
</div>
