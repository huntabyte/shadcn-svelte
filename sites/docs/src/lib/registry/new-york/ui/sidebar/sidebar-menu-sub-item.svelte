<script lang="ts">
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLLIElement>> = $props();
</script>

<li bind:this={ref} data-sidebar="menu-sub-item" {...restProps}>
	{@render children?.()}
</li>
