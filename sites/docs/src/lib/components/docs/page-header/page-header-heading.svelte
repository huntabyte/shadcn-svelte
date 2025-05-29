<script lang="ts">
	import { type PrimitiveHeadingAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveHeadingAttributes = $props();
</script>

<h1
	class={cn(
		"text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</h1>
