<script lang="ts">
  import { buttonVariants } from "$components/ui/button";
  import { cn } from "$lib/utils";
  import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<AlertDialogPrimitive.Action
  class={cn(buttonVariants(), className)}
  {...$$restProps}
>
  <slot />
</AlertDialogPrimitive.Action>
