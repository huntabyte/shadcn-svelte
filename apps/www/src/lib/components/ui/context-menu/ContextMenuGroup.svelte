<script lang="ts">
	import * as ContextMenuPrimitive from "$primitives/context-menu";
	type $$Props = ContextMenuPrimitive.GroupProps;
</script>

<ContextMenuPrimitive.Group role="group" {...$$restProps}>
	<slot />
</ContextMenuPrimitive.Group>
