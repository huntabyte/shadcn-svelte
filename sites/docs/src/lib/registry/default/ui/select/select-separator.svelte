<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: SelectPrimitive.SeparatorProps = $props();
</script>

<SelectPrimitive.Separator
	bind:ref
	class={cn("-mx-1 my-1 h-px bg-muted", className)}
	{...restProps}
/>
