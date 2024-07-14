<script lang="ts">
	import type { PrimitiveElementAttributes } from "$lib/utils.js";

	let {
		ref = $bindable(),
		class: className,
		children,
		...restProps
	}: PrimitiveElementAttributes = $props();
</script>

<nav bind:this={ref} class={className} aria-label="breadcrumb" {...restProps}>
	{@render children?.()}
</nav>
