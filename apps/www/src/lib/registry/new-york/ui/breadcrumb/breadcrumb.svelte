<script lang="ts">
	import type { PrimitiveElementAttributes } from "$lib/utils.js";

	let {
		ref = $bindable(),
		class: className,
		children,
		...restProps
	}: PrimitiveElementAttributes = $props();
</script>

<nav class={className} bind:this={ref} aria-label="breadcrumb" {...restProps}>
	{@render children?.()}
</nav>
