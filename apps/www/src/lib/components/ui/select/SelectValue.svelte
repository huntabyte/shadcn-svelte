<script lang="ts">
	import * as SelectPrimitive from "$primitives/select";

	type $$Props = SelectPrimitive.ValueProps;
	export let placeholder: $$Props["placeholder"] = "";
</script>

<SelectPrimitive.Value {placeholder} {...$$restProps} />
