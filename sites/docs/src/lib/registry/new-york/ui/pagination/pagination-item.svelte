<script lang="ts">
	import { type PrimitiveLiAttributes } from "$lib/utils.js";

	let { ref = $bindable(null), children, ...restProps }: PrimitiveLiAttributes = $props();
</script>

<li bind:this={ref} {...restProps}>
	{@render children?.()}
</li>
