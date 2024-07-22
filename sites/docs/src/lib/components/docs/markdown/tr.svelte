<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<tr class={cn("m-0 border-t p-0 even:bg-muted", className)} {...restProps}>
	{@render children?.()}
</tr>
