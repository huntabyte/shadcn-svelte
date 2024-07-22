<script lang="ts">
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h1
	class={cn(
		"text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]",
		className
	)}
	{...$$restProps}
>
	<slot />
</h1>
