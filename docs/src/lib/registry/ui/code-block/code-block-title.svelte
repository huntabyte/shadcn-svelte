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
	data-slot="code-block-title"
	class={cn(
		"cn-code-block-title min-w-0 truncate [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
