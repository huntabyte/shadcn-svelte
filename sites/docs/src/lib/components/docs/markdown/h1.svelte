<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<h1 class={cn("mt-2 scroll-m-20 text-4xl font-bold", className)} {...restProps}>
	{@render children?.()}
</h1>
