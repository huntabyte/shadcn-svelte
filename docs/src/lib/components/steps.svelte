<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div
	class={cn("steps mb-12 [counter-reset:step] md:ms-4 md:border-s md:ps-8 [&>h3]:step", className)}
	{...restProps}
>
	{@render children?.()}
</div>
