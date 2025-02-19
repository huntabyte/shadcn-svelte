<script lang="ts">
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<nav bind:this={ref} class={className} aria-label="breadcrumb" {...restProps}>
	{@render children?.()}
</nav>
