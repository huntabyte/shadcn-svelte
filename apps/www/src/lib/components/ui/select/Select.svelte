<script lang="ts">
	import * as SelectPrimitive from "$primitives/select";

	type $$Props = SelectPrimitive.Props;
	export let value: $$Props["value"] = undefined;
	export let open: $$Props["open"] = undefined;
</script>

<SelectPrimitive.Root bind:value bind:open {...$$restProps}>
	<slot />
</SelectPrimitive.Root>
