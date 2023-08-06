<script lang="ts">
	import * as ContextMenuPrimitive from "$primitives/context-menu";
	type $$Props = ContextMenuPrimitive.RadioGroupProps;
	export let value: $$Props["value"] = undefined;
</script>

<ContextMenuPrimitive.RadioGroup {...$$restProps} bind:value>
	<slot />
</ContextMenuPrimitive.RadioGroup>
