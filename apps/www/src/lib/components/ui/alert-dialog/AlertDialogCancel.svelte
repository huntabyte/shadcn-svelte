<script lang="ts">
  import { buttonVariants } from "$components/ui/button";
  import { cn } from "$lib/utils";
  import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<AlertDialogPrimitive.Cancel
  class={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
  {...$$restProps}
>
  <slot />
</AlertDialogPrimitive.Cancel>
