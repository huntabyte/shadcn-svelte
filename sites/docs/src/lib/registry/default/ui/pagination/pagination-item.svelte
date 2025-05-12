<script lang="ts">
	import type { HTMLLiAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		children,
		isVisible = true,
		class: className,
		...restProps
	}: { isVisible?: boolean } & WithElementRef<HTMLLiAttributes> = $props();
</script>

<li bind:this={ref} class={cn(className, { hidden: !isVisible })} {...restProps}>
	{@render children?.()}
</li>
