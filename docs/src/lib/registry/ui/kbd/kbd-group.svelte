<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<kbd data-slot="kbd-group" class={cn("inline-flex items-center gap-1", className)} {...restProps}>
	{@render children?.()}
</kbd>
