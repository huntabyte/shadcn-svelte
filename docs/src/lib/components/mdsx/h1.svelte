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

<h1
	class={cn("mt-2 scroll-m-28 font-heading text-3xl font-bold tracking-tight", className)}
	{id}
	{...restProps}
>
	<HeadingAnchor id={id ?? undefined}>
		{@render children?.()}
	</HeadingAnchor>
</h1>
