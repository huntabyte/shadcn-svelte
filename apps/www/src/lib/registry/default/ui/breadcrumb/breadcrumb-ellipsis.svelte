<script lang="ts">
	import Ellipsis from "lucide-svelte/icons/ellipsis";
	import type { WithoutChildren } from "bits-ui";
	import { type PrimitiveSpanAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<PrimitiveSpanAttributes> = $props();

	export { className as class };
</script>

<span
	bind:this={ref}
	role="presentation"
	aria-hidden="true"
	class={cn("flex h-9 w-9 items-center justify-center", className)}
	{...restProps}
>
	<Ellipsis class="size-4" />
	<span class="sr-only">More</span>
</span>
