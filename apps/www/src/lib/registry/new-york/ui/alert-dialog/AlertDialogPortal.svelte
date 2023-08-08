<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "@huntabyte/primitives";

	type $$Props = AlertDialogPrimitive.PortalProps;
</script>

<AlertDialogPrimitive.Portal {...$$restProps}>
	<slot />
</AlertDialogPrimitive.Portal>
