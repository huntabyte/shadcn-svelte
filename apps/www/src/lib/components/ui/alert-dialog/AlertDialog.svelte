<script lang="ts">
	import * as AlertDialogPrimitive from "$primitives/alert-dialog";
	import type { AlertDialogProps } from "$primitives/alert-dialog";

	type $$Props = AlertDialogProps;
</script>

<AlertDialogPrimitive.Root {...$$restProps}>
	<slot />
</AlertDialogPrimitive.Root>
