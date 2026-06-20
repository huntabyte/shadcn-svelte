<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

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
		"cn-combobox-item data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<span class="cn-combobox-item-text shrink-0 whitespace-nowrap">
			{#if childrenProp}
				{@render childrenProp({ selected, highlighted })}
			{:else}
				{label || value}
			{/if}
		</span>
		{#if selected}
			<span
				data-slot="combobox-item-indicator"
				class="pointer-events-none absolute right-2 flex size-4 items-center justify-center"
			>
				<IconPlaceholder
					lucide="CheckIcon"
					tabler="IconCheck"
					hugeicons="Tick02Icon"
					phosphor="CheckIcon"
					remixicon="RiCheckLine"
					class="size-4"
				/>
			</span>
		{/if}
	{/snippet}
</ComboboxPrimitive.Item>
