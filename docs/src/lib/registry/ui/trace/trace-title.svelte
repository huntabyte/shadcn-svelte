<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	data-slot="trace-title"
	class={cn("cn-trace-title min-w-0 truncate motion-reduce:shimmer-none", className)}
	{...restProps}
>
	{@render children?.()}
</span>
