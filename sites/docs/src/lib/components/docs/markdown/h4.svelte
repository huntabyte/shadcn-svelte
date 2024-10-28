<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<h4
	class={cn("font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</h4>
