<script lang="ts">
	import type { PrimitiveHeadingAttributes } from "$lib/utils.js";

	let { children, ...restProps }: PrimitiveHeadingAttributes = $props();
</script>

<h3
	class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
	data-toc-ignore
	{...restProps}
>
	{@render children?.()}
</h3>
