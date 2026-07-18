<script lang="ts">
	import { setContext, tick } from "svelte";
	import { MESSAGE_SCROLLER_CONTEXT, type MessageScrollerContext, type MessageScrollerState } from "./message-scroller.svelte.js";
	import type { Snippet } from "svelte";

	let {
		autoScroll = false,
		defaultScrollPosition = "end",
		children,
	}: {
		autoScroll?: boolean;
		defaultScrollPosition?: "start" | "end" | "last-anchor";
		children?: Snippet;
	} = $props();

	const state = $state<MessageScrollerState>({
		viewport: null,
		content: null,
		items: new Map(),
		autoScroll,
		follow: autoScroll,
		canScrollStart: false,
		canScrollEnd: false,
		programmatic: false,
	});

	function refresh() {
		const viewport = state.viewport;
		if (!viewport) return;
		state.canScrollStart = viewport.scrollTop > 1;
		state.canScrollEnd = viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 1;
	}

	function scrollToStart(behavior: ScrollBehavior = "smooth") {
		state.programmatic = true;
		state.follow = false;
		state.viewport?.scrollTo({ top: 0, behavior });
		window.setTimeout(() => (state.programmatic = false), behavior === "smooth" ? 350 : 0);
	}

	function scrollToEnd(behavior: ScrollBehavior = "smooth") {
		state.programmatic = true;
		state.follow = state.autoScroll;
		state.viewport?.scrollTo({ top: state.viewport.scrollHeight, behavior });
		window.setTimeout(() => {
			state.programmatic = false;
			refresh();
		}, behavior === "smooth" ? 350 : 0);
	}

	const context: MessageScrollerContext = {
		state,
		setViewport(viewport) {
			state.viewport = viewport;
			if (!viewport) return;
			void tick().then(() => {
				if (defaultScrollPosition === "start") scrollToStart("auto");
				else if (defaultScrollPosition === "last-anchor") {
					Array.from(state.items.values()).filter((item) => item.dataset.scrollAnchor === "true").at(-1)?.scrollIntoView({ block: "start" });
				} else scrollToEnd("auto");
				refresh();
			});
		},
		registerItem(id, item) {
			state.items.set(id, item);
			return () => state.items.delete(id);
		},
		scrollToStart,
		scrollToEnd,
		scrollToMessage(id, behavior = "smooth") {
			const item = state.items.get(id);
			if (!item) return false;
			state.follow = false;
			item.scrollIntoView({ block: "start", behavior });
			return true;
		},
	};

	$effect(() => {
		state.autoScroll = autoScroll;
		if (!autoScroll) state.follow = false;
	});

	setContext(MESSAGE_SCROLLER_CONTEXT, context);
</script>

{@render children?.()}
