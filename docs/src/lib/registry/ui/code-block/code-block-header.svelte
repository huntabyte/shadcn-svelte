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
	data-slot="code-block-header"
	class={cn(
		"cn-code-block-header flex min-w-0 shrink-0 items-center *:has-[>[data-slot=code-block-title]]:min-w-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
