<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { MessageScrollerViewportState } from "../message-scroller.svelte.js";
	import type { MessageScrollerViewportProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		"aria-label": ariaLabel,
		onkeydown,
		onscroll,
		ontouchmove,
		onwheel,
		preserveScrollOnPrepend = true,
		role,
		tabindex,
		...restProps
	}: MessageScrollerViewportProps = $props();

	const viewportState = MessageScrollerViewportState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		ariaLabel: boxWith(() => ariaLabel),
		onkeydown: boxWith(() => onkeydown),
		onscroll: boxWith(() => onscroll),
		ontouchmove: boxWith(() => ontouchmove),
		onwheel: boxWith(() => onwheel),
		preserveScrollOnPrepend: boxWith(() => preserveScrollOnPrepend),
		role: boxWith(() => role),
		tabindex: boxWith(() => tabindex),
	});

	const mergedProps = $derived(mergeProps(restProps, viewportState.props));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
