<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let { class: className, href, children, ...restProps }: HTMLAnchorAttributes = $props();
</script>

<a
	{href}
	class={cn(
		"flex w-full flex-col items-center rounded-xl bg-surface p-6 text-surface-foreground transition-colors hover:bg-surface/80 sm:p-10",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</a>
