<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="empty-title"
	class={cn("text-lg font-medium tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</div>
