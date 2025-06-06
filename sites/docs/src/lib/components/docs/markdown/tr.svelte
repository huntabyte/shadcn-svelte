<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<tr class={cn("last:border-b-none m-0 border-b", className)} {...restProps}>
	{@render children?.()}
</tr>
