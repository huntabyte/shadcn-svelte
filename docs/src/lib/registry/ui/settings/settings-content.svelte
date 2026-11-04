<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	// A div, not a main: the app shell owns the page's main landmark.
	let {
		ref = $bindable(null),
		class: className,
		columnClass,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** Classes for the centered column inside the scrolling area. */
		columnClass?: string;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="settings-content"
	class={cn("min-w-0 flex-1 overflow-y-auto", className)}
	{...restProps}
>
	<div class={cn("mx-auto flex w-full max-w-[44rem] flex-col gap-8 px-6 py-6", columnClass)}>
		{@render children?.()}
	</div>
</div>
