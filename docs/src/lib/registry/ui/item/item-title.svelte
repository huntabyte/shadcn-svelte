<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="item-title"
	class={cn("flex w-fit items-center gap-2 text-sm font-medium leading-snug", className)}
	{...restProps}
>
	{@render children?.()}
</div>
