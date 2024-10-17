<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<p
	class={cn("text-foreground max-w-2xl text-balance text-lg font-light", className)}
	{...restProps}
>
	{@render children?.()}
</p>
