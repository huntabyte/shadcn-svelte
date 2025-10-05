<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="item-actions" class={cn("flex items-center gap-2", className)} {...restProps}>
	{@render children?.()}
</div>
