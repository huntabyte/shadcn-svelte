<script lang="ts">
	import { Select as SelectPrimitive } from "@huntabyte/primitives";

	type $$Props = SelectPrimitive.GroupProps;
</script>

<SelectPrimitive.Group {...$$restProps}>
	<slot />
</SelectPrimitive.Group>
