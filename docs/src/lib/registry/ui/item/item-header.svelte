<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="item-header"
	class={cn("flex basis-full items-center justify-between gap-2", className)}
	{...restProps}
>
	{@render children?.()}
</div>
