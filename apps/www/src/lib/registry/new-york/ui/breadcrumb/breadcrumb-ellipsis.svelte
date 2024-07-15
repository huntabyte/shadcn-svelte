<script lang="ts">
	import DotsHorizontal from "svelte-radix/DotsHorizontal.svelte";
	import { type PrimitiveSpanAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: PrimitiveSpanAttributes = $props();
</script>

<span
	bind:this={ref}
	role="presentation"
	aria-hidden="true"
	class={cn("flex size-9 items-center justify-center", className)}
	{...restProps}
>
	<DotsHorizontal class="size-4 outline-none" tabindex="-1" />
	<span class="sr-only">More</span>
</span>
