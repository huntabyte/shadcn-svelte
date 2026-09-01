<script lang="ts">
	import { onDestroy, type Snippet } from "svelte";
	import {
		MessageScrollerController,
		provideMessageScroller,
	} from "./message-scroller.svelte.js";
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
	provideMessageScroller(controller);
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
