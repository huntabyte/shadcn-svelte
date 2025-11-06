<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3
	class={cn(
		"font-heading *:[code]:text-xl mt-12 scroll-m-28 text-lg font-medium tracking-tight [&+p]:!mt-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</h3>
