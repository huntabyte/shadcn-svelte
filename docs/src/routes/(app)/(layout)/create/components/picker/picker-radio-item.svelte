<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import { getContext } from "svelte";
	import { usePreviewOverride } from "../preview-override-context.svelte.js";
	import { preservePickerScroll } from "./picker-scroll.js";

	let {
		ref = $bindable(null),
		value,
		class: className,
		children: childrenProp,
		onpointerdown,
		onclick,
		onfocus,
		onmousemove,
		onSelect,
		...restProps
	}: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();

	const isSubmenu = (getContext<() => boolean>("picker-is-submenu") ?? (() => false))();
	const getPreview = getContext<() => ((value: string) => void) | undefined>("picker-preview");
	const previewOverride = usePreviewOverride();

	function preview() {
		getPreview?.()?.(value as string);
	}
</script>

<DropdownMenuPrimitive.RadioItem
	bind:ref
	{value}
	data-slot="dropdown-menu-radio-item"
	class={cn(
		"relative flex cursor-default items-center gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm font-medium outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 pointer-coarse:gap-3 pointer-coarse:py-2.5 pointer-coarse:pl-3 pointer-coarse:text-base [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		isSubmenu
			? "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground"
			: "**:text-neutral-100 focus:bg-neutral-600 focus:text-neutral-100 focus:**:text-neutral-100 dark:focus:bg-neutral-700/80",
		className
	)}
	onpointerdown={(event) => {
		preservePickerScroll(event.currentTarget);
		onpointerdown?.(event);
	}}
	onclick={(event) => {
		preservePickerScroll(event.currentTarget);
		onclick?.(event);
	}}
	onfocus={(event) => {
		preservePickerScroll(event.currentTarget);
		preview();
		onfocus?.(event);
	}}
	onmousemove={(event) => {
		preview();
		onmousemove?.(event);
	}}
	onmouseleave={previewOverride.clearOverride}
	onpointerleave={previewOverride.clearOverride}
	onSelect={(event) => {
		preservePickerScroll(event.currentTarget);
		onSelect?.(event);
	}}
	{...restProps}
>
	{#snippet children({ checked })}
		<span
			class="pointer-events-none absolute right-2 flex items-center justify-center"
			data-slot="dropdown-menu-radio-item-indicator"
		>
			{#if checked}
				<IconPlaceholder
					lucide="CheckIcon"
					tabler="IconCheck"
					hugeicons="Tick02Icon"
					phosphor="CheckIcon"
					remixicon="RiCheckLine"
					class="size-4 pointer-coarse:size-5"
				/>
			{/if}
		</span>
		{@render childrenProp?.({ checked })}
	{/snippet}
</DropdownMenuPrimitive.RadioItem>
