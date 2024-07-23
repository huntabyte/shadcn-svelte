<script lang="ts">
	import { type PrimitiveLiAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveLiAttributes = $props();
</script>

<li bind:this={ref} class={cn("inline-flex items-center gap-1.5", className)} {...restProps}>
	{@render children?.()}
</li>
