<script lang="ts">
	import { Command as CommandPrimitive, type WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<CommandPrimitive.ListProps> = $props();
</script>

<CommandPrimitive.List
	bind:ref
	data-slot="command-list"
	class={cn("max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", className)}
	{...restProps}
/>
