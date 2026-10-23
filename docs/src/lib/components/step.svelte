<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...props }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3
	class={cn(
		"mt-8 scroll-m-32 font-heading text-lg font-medium tracking-tight [&>p]:!mt-0 [&>p]:inline",
		className
	)}
	{...props}
>
	{@render children?.()}
</h3>
