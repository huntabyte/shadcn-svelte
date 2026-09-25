<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	{label}
	data-slot="select-item"
	class={cn(
		"cn-select-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		// parity-ignore: Bits marks the active item with data-highlighted; Radix uses :focus, which cn-select-item already styles
		"data-highlighted:bg-accent data-highlighted:text-accent-foreground",
		className
	)}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<span class="cn-select-item-indicator">
			{#if selected}
				<IconPlaceholder
					lucide="CheckIcon"
					tabler="IconCheck"
					hugeicons="Tick02Icon"
					phosphor="CheckIcon"
					remixicon="RiCheckLine"
					class="cn-select-item-indicator-icon pointer-events-none"
				/>
			{/if}
		</span>
		<!-- parity-ignore: Bits renders the item text inline, so it needs its own box; Radix ItemText carries no classes -->
		<span class="cn-select-item-text shrink-0 whitespace-nowrap">
			{#if childrenProp}
				{@render childrenProp({ selected, highlighted })}
			{:else}
				{label || value}
			{/if}
		</span>
	{/snippet}
</SelectPrimitive.Item>
