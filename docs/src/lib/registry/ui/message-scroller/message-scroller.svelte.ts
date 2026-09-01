import { getContext } from "svelte";

export type ScrollDirection = "start" | "end";

export interface MessageScrollerState {
	viewport: HTMLElement | null;
	content: HTMLElement | null;
	items: Map<string, HTMLElement>;
	autoScroll: boolean;
	follow: boolean;
	canScrollStart: boolean;
	canScrollEnd: boolean;
	programmatic: boolean;
}

export interface MessageScrollerContext {
	state: MessageScrollerState;
	setViewport: (viewport: HTMLElement | null) => void;
	registerItem: (id: string, item: HTMLElement) => () => void;
	scrollToStart: (behavior?: ScrollBehavior) => void;
	scrollToEnd: (behavior?: ScrollBehavior) => void;
	scrollToMessage: (id: string, behavior?: ScrollBehavior) => boolean;
}

export const MESSAGE_SCROLLER_CONTEXT = Symbol("shadcn-svelte.message-scroller");

export function useMessageScroller(): MessageScrollerContext {
	return getContext<MessageScrollerContext>(MESSAGE_SCROLLER_CONTEXT);
}

export function useMessageScrollerScrollable() {
	const { state } = useMessageScroller();
	return {
		get start() {
			return state.canScrollStart;
		},
		get end() {
			return state.canScrollEnd;
		},
	};
}

export function useMessageScrollerVisibility() {
	const { state } = useMessageScroller();
	return {
		get visibleMessageIds() {
			const viewport = state.viewport;
			if (!viewport) return [];
			const bounds = viewport.getBoundingClientRect();
			return Array.from(state.items).flatMap(([id, item]) => {
				const rect = item.getBoundingClientRect();
				return rect.bottom > bounds.top && rect.top < bounds.bottom ? [id] : [];
			});
		},
		get currentAnchorId() {
			const viewport = state.viewport;
			if (!viewport) return undefined;
			const top = viewport.getBoundingClientRect().top;
			return Array.from(state.items)
				.filter(([, item]) => item.dataset.scrollAnchor === "true" && item.getBoundingClientRect().top <= top + 1)
				.at(-1)?.[0];
		},
	};
}
