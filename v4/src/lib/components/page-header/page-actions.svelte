<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div
	class={cn(
		"**:data-[slot=button]:shadow-none flex w-full items-center justify-center gap-2 pt-2",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
