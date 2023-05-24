<script lang="ts">
  import { cn } from "$lib/utils";
  import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<AlertDialogPrimitive.Title
  class={cn("text-lg font-semibold", className)}
  {...$$restProps}
>
  <slot />
</AlertDialogPrimitive.Title>
