<script lang="ts">
	import { attachRef, boxWith, mergeProps } from "svelte-toolbelt";
	import type { MessageScrollerRootProps } from "../types.js";
	import { MessageScrollerProviderState } from "../message-scroller.svelte.js";

	let { children, child, ref = $bindable(null), ...restProps }: MessageScrollerRootProps = $props();

	const root = MessageScrollerProviderState.get();
	const attachment = attachRef(
		boxWith(
			() => ref,
			(v) => (ref = v)
		),
		(node) => root.setRootElement(node as HTMLDivElement | null)
	);
	const mergedProps = $derived(
		mergeProps(restProps, {
			"data-pending-scroll": root.pendingDefaultScroll ? "" : undefined,
			...attachment,
		})
	);
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
