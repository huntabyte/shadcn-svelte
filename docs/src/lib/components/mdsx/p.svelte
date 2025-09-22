<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p class={cn("not-first:mt-6 leading-[1.65rem]", className)} {...restProps}>
	{@render children?.()}
</p>
