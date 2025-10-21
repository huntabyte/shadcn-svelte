<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h1
	class={cn("font-heading mt-2 scroll-m-28 text-3xl font-bold tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</h1>
