<script lang="ts">
	import * as AlertDialogPrimitive from "$primitives/alert-dialog";

	type $$Props = AlertDialogPrimitive.PortalProps;
</script>

<AlertDialogPrimitive.Portal {...$$restProps}>
	<div
		class="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
	>
		<slot />
	</div>
</AlertDialogPrimitive.Portal>
