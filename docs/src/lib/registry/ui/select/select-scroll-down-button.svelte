<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "cn";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<SelectPrimitive.ScrollDownButtonProps> = $props();
</script>

<SelectPrimitive.ScrollDownButton
	bind:ref
	data-slot="select-scroll-down-button"
	class={cn("cn-select-scroll-down-button bottom-0 w-full", className)}
	{...restProps}
>
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconChevronDown"
		hugeicons="ArrowDown01Icon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
	/>
</SelectPrimitive.ScrollDownButton>
