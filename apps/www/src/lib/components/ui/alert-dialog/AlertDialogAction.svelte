<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";

  import { cn } from "$lib/utils";

  import { buttonVariants } from "$components/ui/button";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<AlertDialogPrimitive.Action
  class={cn(buttonVariants(), className)}
  {...$$restProps}
>
  <slot />
</AlertDialogPrimitive.Action>
