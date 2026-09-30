<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { MessageScrollerRootState } from "../message-scroller.svelte.js";
	import type { MessageScrollerRootProps } from "../types.js";

	let { children, child, ref = $bindable(null), ...restProps }: MessageScrollerRootProps = $props();

	const rootState = MessageScrollerRootState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
	});

	const mergedProps = $derived(mergeProps(restProps, rootState.props, rootState.attachment));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
