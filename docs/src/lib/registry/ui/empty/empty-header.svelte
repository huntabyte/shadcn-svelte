<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="empty-header"
	class={cn("flex max-w-sm flex-col items-center gap-2 text-center", className)}
	{...restProps}
>
	{@render children?.()}
</div>
