<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<blockquote class={cn("mt-6 border-l-2 pl-6 italic", className)} {...restProps}>
	{@render children?.()}
</blockquote>
