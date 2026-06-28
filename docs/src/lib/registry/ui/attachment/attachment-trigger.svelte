<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		type = "button",
		child,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const attrs = $derived({
		"data-slot": "attachment-trigger",
		class: cn("absolute inset-0 z-10 outline-none", className),
		...(child ? {} : { type }),
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<button bind:this={ref} {...attrs}>
		{@render children?.()}
	</button>
{/if}
