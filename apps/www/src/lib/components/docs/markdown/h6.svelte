<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<h6 class={cn("mt-8 scroll-m-20 text-base font-semibold tracking-tight", className)} {...restProps}>
	{@render children?.()}
</h6>
