<script lang="ts">
	import * as DropdownMenuPrimitive from "$primitives/dropdown-menu";
	type $$Props = DropdownMenuPrimitive.RadioGroupProps;
	export let value: $$Props["value"] = undefined;
</script>

<DropdownMenuPrimitive.RadioGroup {...$$restProps} bind:value>
	<slot />
</DropdownMenuPrimitive.RadioGroup>
