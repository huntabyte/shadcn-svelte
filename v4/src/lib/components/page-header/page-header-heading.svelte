<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<h1
	class={cn(
		"text-primary leading-tighter max-w-2xl text-balance text-4xl font-semibold tracking-tight lg:font-semibold lg:leading-[1.1] xl:text-5xl xl:tracking-tighter",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</h1>
