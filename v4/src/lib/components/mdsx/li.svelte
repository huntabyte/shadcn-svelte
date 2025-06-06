<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLLIElement> = $props();
</script>

<li class={cn("mt-2", className)} {...restProps}>
	{@render children?.()}
</li>
