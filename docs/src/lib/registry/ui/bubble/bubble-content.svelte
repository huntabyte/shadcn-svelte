<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		child,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const attrs = $derived({
		"data-slot": "bubble-content",
		class: cn(
			"[button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-ring/30 w-fit max-w-full min-w-0 overflow-hidden rounded-3xl border border-transparent px-3 py-2.5 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:ring-3",
			className
		),
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div bind:this={ref} {...attrs}>
		{@render children?.()}
	</div>
{/if}
