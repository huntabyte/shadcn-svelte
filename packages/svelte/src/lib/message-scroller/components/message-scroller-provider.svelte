<script lang="ts">
	import { boxWith } from "svelte-toolbelt";
	import type { MessageScrollerProviderProps } from "../types.js";
	import {
		DEFAULT_SCROLL_EDGE_THRESHOLD,
		DEFAULT_SCROLL_MARGIN,
		DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
	} from "../types.js";
	import { MessageScrollerProviderState } from "../message-scroller.svelte.js";

	let {
		children,
		autoScroll = false,
		defaultScrollPosition = "end",
		scrollEdgeThreshold = DEFAULT_SCROLL_EDGE_THRESHOLD,
		scrollPreviousItemPeek = DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
		scrollMargin = DEFAULT_SCROLL_MARGIN,
	}: MessageScrollerProviderProps = $props();

	MessageScrollerProviderState.create({
		autoScroll: boxWith(() => autoScroll),
		defaultScrollPosition: boxWith(() => defaultScrollPosition),
		scrollEdgeThreshold: boxWith(() => scrollEdgeThreshold),
		scrollPreviousItemPeek: boxWith(() => scrollPreviousItemPeek),
		scrollMargin: boxWith(() => scrollMargin),
	});
</script>

{@render children?.()}
