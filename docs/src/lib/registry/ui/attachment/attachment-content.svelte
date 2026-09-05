<script lang="ts">
	import { cn } from "cn";
	import type { WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="attachment-content"
	class={cn("cn-attachment-content max-w-full min-w-0 flex-1", className)}
	{...restProps}
>
	{@render children?.()}
</div>
