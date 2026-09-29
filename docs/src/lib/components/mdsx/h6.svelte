<script lang="ts">
	import { cn } from "$lib/utils.js";
	import HeadingAnchor from "./heading-anchor.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		id,
		...restProps
	}: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h6
	class={cn("mt-8 scroll-m-28 text-base font-medium tracking-tight", className)}
	{id}
	{...restProps}
>
	<HeadingAnchor id={id ?? undefined}>
		{@render children?.()}
	</HeadingAnchor>
</h6>
