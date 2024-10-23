<script lang="ts">
	import type { PrimitiveHeadingAttributes } from "$lib/utils.js";

	let { children }: PrimitiveHeadingAttributes = $props();
</script>

<h3 class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
	{@render children?.()}
</h3>
