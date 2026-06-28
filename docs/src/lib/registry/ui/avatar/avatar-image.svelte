<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLImgAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		src,
		class: className,
		onload,
		onerror,
		...restProps
	}: WithElementRef<HTMLImgAttributes> = $props();

	let errored = $state(false);
	let loaded = $derived(Boolean(src) && !errored);

	function handleLoad(event: Event & { currentTarget: EventTarget & Element }) {
		errored = false;
		onload?.(event);
	}

	function handleError(event: Event & { currentTarget: EventTarget & Element }) {
		errored = true;
		onerror?.(event);
	}
</script>

<img
	bind:this={ref}
	data-slot="avatar-image"
	data-loaded={loaded}
	{src}
	class={cn(
		"cn-avatar-image aspect-square size-full rounded-full object-cover data-[loaded=false]:hidden",
		className
	)}
	onload={handleLoad}
	onerror={handleError}
	{...restProps}
/>
