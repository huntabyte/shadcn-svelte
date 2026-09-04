<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { setContext } from "svelte";
	import { preservePickerScroll } from "./picker-scroll.js";

	type Props = DropdownMenuPrimitive.RadioGroupProps & {
		onItemPreview?: (value: string) => void;
	};

	let {
		ref = $bindable(null),
		value = $bindable(""),
		onValueChange,
		onItemPreview,
		...restProps
	}: Props = $props();

	setContext("picker-preview", () => onItemPreview);

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
