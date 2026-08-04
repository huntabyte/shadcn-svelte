<script lang="ts">
	import { onDestroy, setContext } from "svelte";
	import {
		MESSAGE_SCROLLER_CONTEXT,
		MessageScrollerController,
		type MessageScrollerDefaultScrollPosition,
	} from "./message-scroller.svelte.js";
	import type { Snippet } from "svelte";

	let {
		autoScroll = false,
		defaultScrollPosition = "end",
		scrollEdgeThreshold = 8,
		scrollPreviousItemPeek = 64,
		scrollMargin = 0,
		children,
	}: {
		autoScroll?: boolean;
		defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
		scrollEdgeThreshold?: number;
		scrollPreviousItemPeek?: number;
		scrollMargin?: number;
		children?: Snippet;
	} = $props();

	const controller = new MessageScrollerController();
	setContext(MESSAGE_SCROLLER_CONTEXT, controller);

	$effect.pre(() => {
		controller.configure({
			autoScroll,
			defaultScrollPosition,
			scrollEdgeThreshold,
			scrollPreviousItemPeek,
			scrollMargin,
		});
	});

	onDestroy(() => controller.destroy());
</script>

{@render children?.()}
