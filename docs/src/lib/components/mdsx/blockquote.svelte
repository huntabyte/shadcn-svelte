<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<blockquote class={cn("mt-6 border-l-2 pl-6 italic", className)} {...restProps}>
	{@render children?.()}
</blockquote>
