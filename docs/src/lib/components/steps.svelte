<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div
	class={cn(
		"[&>[aria-level='3']]:step steps mb-12 [counter-reset:step] *:[aria-level='3']:first:!mt-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
