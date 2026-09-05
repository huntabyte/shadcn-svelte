<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "cn";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps> = $props();
</script>

<SelectPrimitive.ScrollUpButton
	bind:ref
	data-slot="select-scroll-up-button"
	class={cn("cn-select-scroll-up-button top-0 w-full", className)}
	{...restProps}
>
	<IconPlaceholder
		lucide="ChevronUpIcon"
		tabler="IconChevronUp"
		hugeicons="ArrowUp01Icon"
		phosphor="CaretUpIcon"
		remixicon="RiArrowUpSLine"
	/>
</SelectPrimitive.ScrollUpButton>
