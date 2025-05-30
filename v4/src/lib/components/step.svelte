<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...props }: HTMLAttributes<HTMLElement> = $props();
</script>

<h3
	class={cn("font-heading mt-8 scroll-m-32 text-xl font-medium tracking-tight", className)}
	{...props}
>
	{@render children?.()}
</h3>
