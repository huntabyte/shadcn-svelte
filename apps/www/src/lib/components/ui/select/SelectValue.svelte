<script lang="ts">
	import { Select as SelectPrimitive } from "@huntabyte/primitives";

	type $$Props = SelectPrimitive.ValueProps;
	export let placeholder: $$Props["placeholder"] = "";
</script>

<SelectPrimitive.Value {placeholder} {...$$restProps} />
