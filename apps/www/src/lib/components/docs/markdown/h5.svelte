<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<h5 class={cn("mt-8 scroll-m-20 text-lg font-semibold tracking-tight", className)} {...restProps}>
	{@render children?.()}
</h5>
