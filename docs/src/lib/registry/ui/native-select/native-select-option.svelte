<script lang="ts">
	import type { HTMLOptionAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLOptionAttributes> = $props();
</script>

<option
	bind:this={ref}
	data-slot="native-select-option"
	class={cn("bg-[Canvas] text-[CanvasText]", className)}
	{...restProps}
>
	{@render children?.()}
</option>
