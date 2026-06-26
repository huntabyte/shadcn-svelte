<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
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
	data-slot="bubble-content"
	class={cn(
		"[button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-ring/30 w-fit max-w-full min-w-0 overflow-hidden rounded-3xl border border-transparent px-3 py-2.5 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:ring-3",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
