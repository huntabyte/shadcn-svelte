<script lang="ts">
	import HeadingAnchor from "./heading-anchor.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		id,
		...restProps
	}: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h4 class={className} {id} {...restProps}>
	<HeadingAnchor id={id ?? undefined}>
		{@render children?.()}
	</HeadingAnchor>
</h4>
