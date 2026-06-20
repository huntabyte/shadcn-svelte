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

<h4
	class={cn("font-heading mt-8 scroll-m-28 text-base font-medium tracking-tight", className)}
	{id}
	{...restProps}
>
	<HeadingAnchor id={id ?? undefined}>
		{@render children?.()}
	</HeadingAnchor>
</h4>
