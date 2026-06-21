<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<ComboboxPrimitive.ViewportProps> = $props();
</script>

<ComboboxPrimitive.Viewport
	bind:ref
	data-slot="combobox-list"
	class={cn(
		"cn-combobox-list max-h-[min(24rem,var(--bits-combobox-content-available-height))] overflow-y-auto overscroll-contain",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</ComboboxPrimitive.Viewport>
