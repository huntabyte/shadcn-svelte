<script lang="ts">
	import type { PrimitiveDivAttributes } from "$lib/utils.js";

	let { children, ...restProps }: PrimitiveDivAttributes = $props();
</script>

<div class="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]" {...restProps}>
	{@render children?.()}
</div>
