<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "@huntabyte/primitives";
	type $$Props = DropdownMenuPrimitive.RadioGroupProps;
	export let value: $$Props["value"] = undefined;
</script>

<DropdownMenuPrimitive.RadioGroup {...$$restProps} bind:value>
	<slot />
</DropdownMenuPrimitive.RadioGroup>
