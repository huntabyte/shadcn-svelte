<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<h3
	class={cn("font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</h3>
