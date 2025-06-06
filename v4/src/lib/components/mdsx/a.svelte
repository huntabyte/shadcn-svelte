<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let { class: className, children, href, ...restProps }: HTMLAnchorAttributes = $props();

	const internal = $derived(href?.startsWith("/") || href?.startsWith("#"));
	const rel = $derived(!internal ? "noopener noreferrer" : undefined);
	const target = $derived(!internal ? "_blank" : undefined);
</script>

<a
	{href}
	{target}
	{rel}
	class={cn("font-medium underline underline-offset-4", className)}
	{...restProps}
>
	{@render children?.()}
</a>
