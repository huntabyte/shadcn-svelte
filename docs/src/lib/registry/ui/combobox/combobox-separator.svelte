<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<ComponentProps<typeof ComboboxPrimitive.Separator>> = $props();
</script>

<ComboboxPrimitive.Separator
	bind:ref
	data-slot="combobox-separator"
	class={cn("bg-border -mx-1 my-1 h-px", className)}
	{...restProps}
/>
