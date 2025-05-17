<script lang="ts">
	import type { PrimitiveDivAttributes } from "$lib/utils.js";

	let { children, ...restProps }: PrimitiveDivAttributes = $props();
</script>

<div
	class="[&>h3]:step steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8"
	{...restProps}
>
	{@render children?.()}
</div>
