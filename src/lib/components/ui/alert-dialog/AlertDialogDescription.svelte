<script lang="ts">
  import { cn } from "$lib/utils";
  import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<AlertDialogPrimitive.Description
  class={cn("text-sm text-muted-foreground", className)}
  {...$$restProps}
>
  <slot />
</AlertDialogPrimitive.Description>
