<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h4
	class={cn("font-heading mt-8 scroll-m-28 text-base font-medium tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</h4>
