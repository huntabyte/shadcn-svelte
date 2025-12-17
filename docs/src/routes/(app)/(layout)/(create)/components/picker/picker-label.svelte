<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let {
		inset,
		class: className,
		...restProps
	}: DropdownMenuPrimitive.GroupHeadingProps & { inset?: boolean } = $props();
</script>

<DropdownMenuPrimitive.GroupHeading
	data-slot="dropdown-menu-label"
	data-inset={inset}
	class={cn("text-muted-foreground data-inset:pl-8 px-2 py-1.5 text-xs font-medium", className)}
	{...restProps}
/>
