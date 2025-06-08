<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let { class: className, href, children, ...restProps }: HTMLAnchorAttributes = $props();
</script>

<a
	{href}
	class={cn(
		"bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-center rounded-xl p-6 transition-colors sm:p-10",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</a>
