<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { preservePickerScroll } from "./picker-scroll.js";

	let {
		ref = $bindable(null),
		value = $bindable(""),
		onValueChange,
		...restProps
	}: DropdownMenuPrimitive.RadioGroupProps = $props();

	function handleValueChange(nextValue: string) {
		preservePickerScroll();
		onValueChange?.(nextValue);
	}
</script>

<DropdownMenuPrimitive.RadioGroup
	bind:ref
	bind:value
	data-slot="dropdown-menu-radio-group"
	onValueChange={handleValueChange}
	{...restProps}
/>
