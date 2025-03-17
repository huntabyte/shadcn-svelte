<script lang="ts">
	import { type PrimitiveHeadingAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveHeadingAttributes = $props();
</script>

<h1
	class={cn(
		"text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</h1>
