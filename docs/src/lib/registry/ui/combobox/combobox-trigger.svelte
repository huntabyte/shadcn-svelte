<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComboboxPrimitive.TriggerProps = $props();
</script>

<ComboboxPrimitive.Trigger
	bind:ref
	data-slot="combobox-trigger"
	class={cn("[&_svg:not([class*='size-'])]:size-4", className)}
	{...restProps}
>
	{@render children?.()}
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconSelector"
		hugeicons="UnfoldMoreIcon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
		class="text-muted-foreground pointer-events-none size-4"
	/>
</ComboboxPrimitive.Trigger>
