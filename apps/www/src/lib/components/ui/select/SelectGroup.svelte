<script lang="ts">
	import * as SelectPrimitive from "$primitives/select";

	type $$Props = SelectPrimitive.GroupProps;
</script>

<SelectPrimitive.Group {...$$restProps}>
	<slot />
</SelectPrimitive.Group>
