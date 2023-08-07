<script lang="ts">
	import { Dialog as DialogPrimitive } from "@huntabyte/primitives";
	type $$Props = DialogPrimitive.PortalProps;
</script>

<DialogPrimitive.Portal {...$$restProps}>
	<slot />
</DialogPrimitive.Portal>
