<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...props }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3
	class={cn(
		"font-heading mt-8 flex scroll-m-32 items-center text-lg font-medium tracking-tight",
		className
	)}
	{...props}
>
	{@render children?.()}
</h3>
