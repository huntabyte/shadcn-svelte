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
	data-slot="message-footer"
	class={cn(
		"cn-message-footer flex max-w-full min-w-0 items-center group-data-[align=end]/message:justify-end",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
