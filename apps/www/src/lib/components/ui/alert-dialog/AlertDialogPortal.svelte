<script lang="ts">
  import type { AlertDialogPortalProps } from "radix-svelte";
  import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";

  type $$Props = AlertDialogPortalProps;
</script>

<AlertDialogPrimitive.Portal {...$$restProps}>
  <div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
    <slot />
  </div>
</AlertDialogPrimitive.Portal>
