<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<p
	class={cn("text-foreground max-w-3xl text-base text-balance sm:text-lg", className)}
	{...restProps}
>
	{@render children?.()}
</p>
