<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div
	class={cn(
		"steps [&>h3]:step [&>[aria-level='3']]:step mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
