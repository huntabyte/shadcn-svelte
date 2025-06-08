<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div class={cn(className)} {...restProps}>
	{@render children?.()}
</div>
