<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		child,
		class: className,
		children,
		...restProps
	}: ComboboxPrimitive.TriggerProps = $props();
</script>

<ComboboxPrimitive.Trigger
	bind:ref
	data-slot="combobox-trigger"
	class={cn("cn-combobox-trigger", className)}
	{child}
	{...restProps}
>
	{@render children?.()}
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconSelector"
		hugeicons="UnfoldMoreIcon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
		class="cn-combobox-trigger-icon pointer-events-none"
	/>
</ComboboxPrimitive.Trigger>
