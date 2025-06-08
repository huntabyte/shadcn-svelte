<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h1 class={cn("font-heading mt-2 scroll-m-20 text-4xl font-bold", className)} {...restProps}>
	{@render children?.()}
</h1>
