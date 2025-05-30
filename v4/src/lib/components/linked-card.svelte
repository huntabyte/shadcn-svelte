<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let { class: className, href, children, ...restProps }: HTMLAnchorAttributes = $props();
</script>

<a
	{href}
	class={cn(
		"bg-card text-card-foreground hover:bg-border flex w-full flex-col items-center rounded-xl border p-6 shadow transition-colors sm:p-10",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</a>
