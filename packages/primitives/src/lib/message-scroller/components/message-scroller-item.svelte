<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import type { MessageScrollerItemProps } from "../types.js";
	import { MessageScrollerItemState } from "../message-scroller.svelte.js";

	let {
		children,
		child,
		ref = $bindable(null),
		messageId,
		scrollAnchor = false,
		...restProps
	}: MessageScrollerItemProps = $props();

	const itemState = MessageScrollerItemState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		messageId: boxWith(() => messageId),
		scrollAnchor: boxWith(() => scrollAnchor),
	});

	const mergedProps = $derived(mergeProps(restProps, itemState.props, itemState.attachment));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
