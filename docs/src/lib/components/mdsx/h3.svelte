<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import HeadingAnchor from "./heading-anchor.svelte";

	let {
		class: className,
		children,
		id,
		...restProps
	}: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3
	class={cn(
		"font-heading mt-12 scroll-m-28 text-lg font-medium tracking-tight [&+p]:!mt-4 *:[code]:text-xl",
		className
	)}
	{id}
	{...restProps}
>
	<HeadingAnchor id={id ?? undefined}>
		{@render children?.()}
	</HeadingAnchor>
</h3>
