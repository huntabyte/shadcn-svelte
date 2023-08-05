<script lang="ts">
	import * as DialogPrimitive from "$primitives/dialog";
	type $$Props = DialogPrimitive.PortalProps;
</script>

<DialogPrimitive.Portal {...$$restProps}>
	<slot />
</DialogPrimitive.Portal>
