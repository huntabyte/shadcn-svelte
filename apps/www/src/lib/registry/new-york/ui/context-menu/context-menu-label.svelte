<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: ContextMenuPrimitive.LabelProps & {
		inset?: boolean;
	} = $props();
</script>

<ContextMenuPrimitive.Label
	bind:ref
	class={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
	{...restProps}
/>
