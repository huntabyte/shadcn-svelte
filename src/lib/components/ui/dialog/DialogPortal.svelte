<script lang="ts">
  import { cn } from "$lib/utils";
  import { Dialog as DialogPrimitive, type DialogPortalProps } from "radix-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };

  type $$Props = DialogPortalProps & {
    class?: string;
  };
</script>

<DialogPrimitive.Portal class={cn(className)} {...$$restProps}>
  <div class="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
    <slot />
  </div>
</DialogPrimitive.Portal>
