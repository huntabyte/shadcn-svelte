<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<div data-slot="card-title" class={cn("leading-none font-semibold", className)} {...restProps}>
	{@render children?.()}
</div>
