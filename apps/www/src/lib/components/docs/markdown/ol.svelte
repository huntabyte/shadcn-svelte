<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<ol class={cn("my-6 ml-6 list-decimal", className)} {...restProps}>
	{@render children?.()}
</ol>
