<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		inset = undefined,
		...restProps
	}: MenubarPrimitive.GroupHeadingProps & {
		inset?: boolean;
	} = $props();
</script>

<MenubarPrimitive.GroupHeading
	bind:ref
	class={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
	{...restProps}
/>
