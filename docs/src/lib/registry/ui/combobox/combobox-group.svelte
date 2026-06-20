<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<ComboboxPrimitive.GroupProps> = $props();
</script>

<ComboboxPrimitive.Group bind:ref data-slot="combobox-group" class={cn(className)} {...restProps}>
	{@render children?.()}
</ComboboxPrimitive.Group>
