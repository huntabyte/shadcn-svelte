<script lang="ts">
	import { onDestroy, setContext } from "svelte";
	import type { Snippet } from "svelte";
	import { MESSAGE_SCROLLER_CONTEXT } from "./context.js";
	import { MessageScrollerController } from "./message-scroller-controller.js";
	import type { MessageScrollerProviderProps } from "./types.js";

	let {
		autoScroll,
		children,
		defaultScrollPosition,
		scrollEdgeThreshold,
		scrollMargin,
		scrollPreviousItemPeek,
	}: MessageScrollerProviderProps & {
		children?: Snippet;
	} = $props();

	const controller = new MessageScrollerController();

	setContext(MESSAGE_SCROLLER_CONTEXT, controller);
	onDestroy(controller.destroy);

	$effect(() => {
		controller.setOptions({
			autoScroll,
			defaultScrollPosition,
			scrollEdgeThreshold,
			scrollMargin,
			scrollPreviousItemPeek,
		});
	});
</script>

{@render children?.()}
