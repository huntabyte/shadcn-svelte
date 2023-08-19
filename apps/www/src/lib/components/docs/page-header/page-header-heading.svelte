<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h1
	class={cn(
		"text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]",
		className
	)}
	{...$$restProps}
>
	<slot />
</h1>
