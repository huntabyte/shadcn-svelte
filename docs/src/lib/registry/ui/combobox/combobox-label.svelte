<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<ComboboxPrimitive.GroupHeadingProps> = $props();
</script>

<ComboboxPrimitive.GroupHeading
	bind:ref
	data-slot="combobox-label"
	class={cn("cn-combobox-label", className)}
	{...restProps}
>
	{@render children?.()}
</ComboboxPrimitive.GroupHeading>
