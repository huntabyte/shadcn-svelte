<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: WithoutChild<ComboboxPrimitive.ItemProps> = $props();
</script>

<ComboboxPrimitive.Item
	bind:ref
	{value}
	{label}
	data-slot="combobox-item"
	class={cn(
		"cn-combobox-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		className
	)}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<!-- parity-ignore: Bits item snippets need a flex wrapper for custom content beside the indicator -->
		<span class="cn-combobox-item-text">
			{#if childrenProp}
				{@render childrenProp({ selected, highlighted })}
			{:else}
				{label || value}
			{/if}
		</span>
		{#if selected}
			<!-- parity-ignore: Keep the indicator at the inline end in RTL as well as LTR -->
			<span
				data-slot="combobox-item-indicator"
				class="cn-combobox-item-indicator rtl:right-auto rtl:left-2"
			>
				<IconPlaceholder
					lucide="CheckIcon"
					tabler="IconCheck"
					hugeicons="Tick02Icon"
					phosphor="CheckIcon"
					remixicon="RiCheckLine"
					class="cn-combobox-item-indicator-icon pointer-events-none"
				/>
			</span>
		{/if}
	{/snippet}
</ComboboxPrimitive.Item>
