<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p class={cn("leading-[1.65rem] [&:not(:first-child)]:mt-6", className)} {...restProps}>
	{@render children?.()}
</p>
