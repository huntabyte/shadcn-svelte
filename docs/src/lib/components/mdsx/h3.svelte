<script lang="ts">
	import { cn } from "cn";
	import HeadingAnchor from "./heading-anchor.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		id,
		...restProps
	}: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3
	class={cn(
		"mt-12 scroll-m-28 font-heading text-lg font-medium tracking-tight [&+p]:!mt-4 *:[code]:text-xl",
		className
	)}
	{id}
	{...restProps}
>
	<HeadingAnchor id={id ?? undefined}>
		{@render children?.()}
	</HeadingAnchor>
</h3>
