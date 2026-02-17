<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div
	class={cn(
		"steps mb-12 ml-4 border-l pl-8 [counter-reset:step] [&>h3]:step [&>[aria-level='3']]:step [&>h3:first-child]:!mt-0 [&>[aria-level='3']:first-child]:!mt-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
