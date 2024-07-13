<script lang="ts">
	import { type PrimitiveLiAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveLiAttributes = $props();

	export { className as class };
</script>

<li bind:this={ref} class={cn("", className)} {...restProps}>
	{@render children?.()}
</li>
