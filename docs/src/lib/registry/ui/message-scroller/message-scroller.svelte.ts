import { getContext, hasContext, onMount, setContext } from "svelte";
import { SvelteMap, SvelteSet } from "svelte/reactivity";
import {
	getContentBottom,
	getElementTop,
	getElementScrollTop,
	getElementViewportTop,
	getFirstVisibleMessageItem,
	getFlexGap,
	getLastScrollAnchor,
	getMaxScrollTop,
	getMessageScrollerItems,
	getMessageScrollerScrollable,
	getMessageScrollerVisibilityState,
	getNewScrollAnchor,
	getTailSpacerHeight,
	getUnanchoredScrollAnchor,
	hasMultipleNewScrollAnchors,
} from "./geometry.js";
import {
	AUTOSCROLLING_CLEAR_DELAY,
	DEFAULT_SCROLL_EDGE_THRESHOLD,
	DEFAULT_SCROLL_MARGIN,
	DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
	EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE,
	SCROLL_POSITION_EPSILON,
	type MessageScrollerMode,
	type MessageScrollerProviderProps,
	type MessageScrollerScrollOptions,
	type MessageScrollerScrollable,
	type MessageScrollerVisibilityState,
} from "./types.js";

type PrependRestoreAnchor = {
	element: HTMLElement;
	viewportTop: number;
};

type PendingScrollToMessage = {
	messageId: string;
	options?: MessageScrollerScrollOptions;
};

export class MessageScrollerController {
	readonly scrollable = $state<MessageScrollerScrollable>({ start: false, end: false });
	readonly visibility = $state<MessageScrollerVisibilityState>({
		currentAnchorId: null,
		visibleMessageIds: [],
	});

	private autoScroll = false;
	private isAutoScrolling = false;
	private autoScrollingTimeout: ReturnType<typeof setTimeout> | null = null;
	private content: HTMLElement | null = null;
	private defaultScrollPosition: MessageScrollerProviderProps["defaultScrollPosition"] = "end";
	private hasAppliedDefaultScrollPosition = false;
	private firstItem: HTMLElement | null = null;
	private handledAnchors = new WeakSet<HTMLElement>();
	private itemCount = 0;
	private lastScrollTop = 0;
	private messageElements = new SvelteMap<string, HTMLElement>();
	private mode: MessageScrollerMode = "free-scrolling";
	private pendingContentFrame: number | null = null;
	private pendingStateFrame: number | null = null;
	private pendingVisibilityFrame: number | null = null;
	private pendingScrollToMessage: PendingScrollToMessage | null = null;
	private prependRestore: PrependRestoreAnchor | null = null;
	private shouldPreserveScrollOnPrepend = true;
	private root: HTMLElement | null = null;
	private scrollEdgeThreshold = DEFAULT_SCROLL_EDGE_THRESHOLD;
	private scrollMargin = DEFAULT_SCROLL_MARGIN;
	private scrollPreviousItemPeek = DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK;
	private spacer: HTMLElement | null = null;
	private spacerGap = 0;
	private spacerHeight = 0;
	private streamingTurn: HTMLElement | null = null;
	private viewport: HTMLElement | null = null;
	private visibilityObserver: IntersectionObserver | null = null;
	private visibilitySubscriberCount = 0;
	private visibleMessageIds = new SvelteSet<string>();

	setOptions = ({
		autoScroll = false,
		defaultScrollPosition = "end",
		scrollEdgeThreshold = DEFAULT_SCROLL_EDGE_THRESHOLD,
		scrollMargin = DEFAULT_SCROLL_MARGIN,
		scrollPreviousItemPeek = DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
	}: MessageScrollerProviderProps) => {
		if (this.defaultScrollPosition !== defaultScrollPosition) {
			this.hasAppliedDefaultScrollPosition = false;
		}

		const shouldRebuildVisibilityObserver =
			this.scrollMargin !== scrollMargin ||
			this.scrollPreviousItemPeek !== scrollPreviousItemPeek;

		this.autoScroll = autoScroll;
		this.defaultScrollPosition = defaultScrollPosition;
		this.scrollEdgeThreshold = scrollEdgeThreshold;
		this.scrollMargin = scrollMargin;
		this.scrollPreviousItemPeek = scrollPreviousItemPeek;

		if (shouldRebuildVisibilityObserver) this.rebuildVisibilityObserver();

		if (autoScroll && this.mode === "following-bottom" && this.itemCount > 0) {
			this.scrollToEnd({ behavior: "auto" });
			return;
		}

		this.commitScrollState();
	};

	setRootElement = (element: HTMLElement | null) => {
		this.root = element;
		this.writeStateAttributes(this.scrollable);
	};

	setViewportElement = (element: HTMLElement | null) => {
		this.viewport = element;
		this.lastScrollTop = element?.scrollTop ?? 0;
		this.writeStateAttributes(this.scrollable);
		this.rebuildVisibilityObserver();
	};

	setContentElement = (element: HTMLElement | null) => {
		this.content = element;
	};

	setSpacerElement = (element: HTMLElement | null) => {
		this.spacer = element;
		this.spacerGap = getFlexGap(element?.parentElement ?? null);
	};

	setPreserveScrollOnPrepend = (shouldPreserve: boolean) => {
		this.shouldPreserveScrollOnPrepend = shouldPreserve;
	};

	registerMessage = (
		messageId: string,
		element: HTMLElement | null,
		removedElement?: HTMLElement | null
	) => {
		if (element) {
			this.messageElements.set(messageId, element);
			this.visibilityObserver?.observe(element);
			this.scheduleVisibilitySync();
			if (this.pendingScrollToMessage?.messageId === messageId) {
				this.scheduleContentChange();
			}
			return;
		}

		if (!removedElement || this.messageElements.get(messageId) !== removedElement) return;

		this.messageElements.delete(messageId);
		this.visibleMessageIds.delete(messageId);
		this.visibilityObserver?.unobserve(removedElement);
		this.scheduleVisibilitySync();
	};

	scheduleContentChange = () => {
		if (this.pendingContentFrame !== null) return;

		this.pendingContentFrame = requestAnimationFrame(() => {
			this.pendingContentFrame = null;
			this.handleContentChange();
		});
	};

	handleContentChange = () => {
		const content = this.content;
		if (!content) return;

		const items = getMessageScrollerItems(content, this.spacer);
		const previousItemCount = this.itemCount;
		const previousFirstItem = this.firstItem;
		this.itemCount = items.length;
		this.firstItem = items[0] ?? null;

		if (this.flushPendingScrollToMessage()) return this.captureAfterContentChange();
		if (previousItemCount === 0) return this.handleInitialContent(items);

		const previousFirstItemIndex = previousFirstItem ? items.indexOf(previousFirstItem) : -1;
		if (this.shouldPreserveScrollOnPrepend && previousFirstItemIndex > 0) {
			this.restorePrependedAnchor();
			return this.captureAfterContentChange();
		}

		if (this.handleNewScrollAnchor(items, previousItemCount)) {
			return this.captureAfterContentChange();
		}

		if (this.handleUnanchoredScrollAnchor(items, previousItemCount)) {
			return this.captureAfterContentChange();
		}

		if (this.mode === "following-bottom" && this.autoScroll) {
			this.scrollToEnd({ behavior: "auto" });
		} else {
			this.commitScrollState();
		}

		this.captureAfterContentChange();
	};

	handleResize = () => {
		if (this.mode === "following-bottom" && this.autoScroll) {
			this.scrollToEnd({ behavior: "auto" });
			return;
		}

		const previousSpacerHeight = this.spacerHeight;
		if (this.reanchorToAnchoredMessage()) {
			if (this.autoScroll && previousSpacerHeight > 0 && this.spacerHeight === 0) {
				this.scrollToEnd({ behavior: "auto" });
			}
			return;
		}

		this.scheduleStateCommit();
		this.scheduleVisibilitySync();
	};

	syncAfterScroll = () => {
		this.commitScrollState();
		this.capturePrependAnchor();
		this.scheduleVisibilitySync();
	};

	userScrollIntent = () => {
		if (
			this.mode !== "following-bottom" &&
			this.mode !== "anchored-to-message" &&
			this.mode !== "settling-jump"
		) {
			return;
		}

		this.streamingTurn = null;
		this.mode = "free-scrolling";
	};

	scrollToStart = ({ behavior = "auto" }: MessageScrollerScrollOptions = {}) => {
		if (!this.viewport) return false;

		this.setTailSpacerHeight(0);
		this.streamingTurn = null;
		this.mode = "free-scrolling";
		this.scrollToPosition(0, { behavior });
		this.scheduleVisibilitySync();
		return true;
	};

	scrollToEnd = ({ behavior = "auto" }: MessageScrollerScrollOptions = {}) => {
		const viewport = this.viewport;
		if (!viewport) return false;

		this.setTailSpacerHeight(0);
		this.streamingTurn = null;
		this.mode = this.autoScroll ? "following-bottom" : "free-scrolling";
		this.scrollToPosition(getMaxScrollTop(viewport), {
			isAutoScrolling: true,
			behavior,
		});
		this.scheduleVisibilitySync();
		return true;
	};

	scrollToMessage = (messageId: string, options?: MessageScrollerScrollOptions) => {
		const element = this.messageElements.get(messageId);

		if (!element) {
			if (this.itemCount !== 0) return false;
			this.pendingScrollToMessage = { messageId, options };
			this.hasAppliedDefaultScrollPosition = true;
			return true;
		}

		this.hasAppliedDefaultScrollPosition = true;
		if (this.scrollToElement(element, options)) {
			this.pendingScrollToMessage = null;
			return true;
		}

		this.pendingScrollToMessage = { messageId, options };
		return true;
	};

	connectVisibility = () => {
		this.visibilitySubscriberCount += 1;
		if (this.visibilitySubscriberCount === 1) this.observeVisibility();

		return () => {
			this.visibilitySubscriberCount = Math.max(0, this.visibilitySubscriberCount - 1);
			if (this.visibilitySubscriberCount === 0) this.unobserveVisibility();
		};
	};

	destroy = () => {
		this.cancelFrame(this.pendingContentFrame);
		this.cancelFrame(this.pendingStateFrame);
		this.cancelFrame(this.pendingVisibilityFrame);
		this.pendingContentFrame = null;
		this.pendingStateFrame = null;
		this.pendingVisibilityFrame = null;

		if (this.autoScrollingTimeout !== null) {
			clearTimeout(this.autoScrollingTimeout);
			this.autoScrollingTimeout = null;
		}

		this.visibilityObserver?.disconnect();
		this.visibilityObserver = null;
	};

	private handleInitialContent(items: HTMLElement[]) {
		if (this.applyDefaultScrollPosition()) return this.captureAfterContentChange();

		if (items.length > 0 && this.autoScroll && this.scrollToEnd({ behavior: "auto" })) {
			return this.captureAfterContentChange();
		}

		this.commitScrollState();
		this.captureAfterContentChange();
	}

	private handleNewScrollAnchor(items: HTMLElement[], previousItemCount: number) {
		if (items.length <= previousItemCount) return false;

		const anchor = getNewScrollAnchor(items, previousItemCount);
		if (!anchor) return false;

		if (
			this.autoScroll &&
			this.mode === "following-bottom" &&
			hasMultipleNewScrollAnchors(items, previousItemCount)
		) {
			this.scrollToEnd({ behavior: "auto" });
		} else {
			this.scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true });
			this.handledAnchors.add(anchor);
		}

		return true;
	}

	private handleUnanchoredScrollAnchor(items: HTMLElement[], previousItemCount: number) {
		if (items.length !== previousItemCount) return false;

		const anchor = getUnanchoredScrollAnchor(items, this.handledAnchors);
		if (!anchor) return false;

		this.scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true });
		this.handledAnchors.add(anchor);
		return true;
	}

	private captureAfterContentChange() {
		this.capturePrependAnchor();
		this.scheduleVisibilitySync();
	}

	private applyDefaultScrollPosition() {
		if (
			!this.defaultScrollPosition ||
			this.hasAppliedDefaultScrollPosition ||
			this.itemCount === 0
		) {
			return false;
		}

		const wasHandled =
			this.defaultScrollPosition === "last-anchor"
				? this.scrollToLastAnchor()
				: this.defaultScrollPosition === "end"
					? this.scrollToEnd({ behavior: "auto" })
					: this.scrollToStart({ behavior: "auto" });

		if (wasHandled) this.hasAppliedDefaultScrollPosition = true;
		return wasHandled;
	}

	private scrollToLastAnchor() {
		const content = this.content;
		const viewport = this.viewport;
		if (!content || !viewport) return false;

		const anchor = getLastScrollAnchor(getMessageScrollerItems(content, this.spacer));
		if (!anchor) return this.scrollToEnd({ behavior: "auto" });

		const anchorTop = getElementTop(anchor, viewport);
		const contentBottom = getContentBottom({
			content,
			spacer: this.spacer,
			viewport,
		});
		const lastTurnFits = contentBottom - anchorTop <= viewport.clientHeight;

		return lastTurnFits
			? this.scrollToEnd({ behavior: "auto" })
			: this.scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true });
	}

	private flushPendingScrollToMessage() {
		const pendingScroll = this.pendingScrollToMessage;
		if (!pendingScroll) return false;

		const element = this.messageElements.get(pendingScroll.messageId);
		if (!element || !this.scrollToElement(element, pendingScroll.options)) return false;

		this.pendingScrollToMessage = null;
		this.hasAppliedDefaultScrollPosition = true;
		return true;
	}

	private scrollToElement(
		element: HTMLElement,
		{
			align = "start",
			behavior = "auto",
			scrollMargin = this.scrollMargin,
		}: MessageScrollerScrollOptions = {},
		{ keepPreviousPeek = false }: { keepPreviousPeek?: boolean } = {}
	) {
		const content = this.content;
		const viewport = this.viewport;
		if (!content || !viewport || !content.contains(element)) return false;

		const scrollTop = getElementScrollTop({
			align,
			element,
			scrollMargin: keepPreviousPeek
				? scrollMargin + this.scrollPreviousItemPeek
				: scrollMargin,
			spacer: this.spacer,
			viewport,
		});
		const spacerHeight = getTailSpacerHeight({
			content,
			scrollTop,
			spacer: this.spacer,
			viewport,
		});

		this.setTailSpacerHeight(spacerHeight);
		this.prependRestore = {
			element,
			viewportTop: getElementViewportTop(element, viewport),
		};
		this.mode = keepPreviousPeek ? "anchored-to-message" : "settling-jump";
		this.streamingTurn = keepPreviousPeek ? element : null;
		this.scrollToPosition(scrollTop, { behavior });
		this.scheduleVisibilitySync();
		return true;
	}

	private reanchorToAnchoredMessage() {
		const element = this.streamingTurn;
		if (!element || !element.isConnected || this.mode !== "anchored-to-message") {
			return false;
		}

		return this.scrollToElement(element, { align: "start" }, { keepPreviousPeek: true });
	}

	private scrollToPosition(
		scrollTop: number,
		{
			behavior = "auto",
			isAutoScrolling = false,
		}: {
			behavior?: ScrollBehavior;
			isAutoScrolling?: boolean;
		} = {}
	) {
		const viewport = this.viewport;
		if (!viewport) return;

		const nextScrollTop = Math.max(0, scrollTop);
		if (Math.abs(viewport.scrollTop - nextScrollTop) <= SCROLL_POSITION_EPSILON) {
			viewport.scrollTop = nextScrollTop;
			this.commitScrollState();
			return;
		}

		if (isAutoScrolling) this.setAutoScrolling(true);
		viewport.scrollTo({ top: nextScrollTop, behavior });
		this.scheduleStateCommit();
	}

	private restorePrependedAnchor() {
		const anchor = this.prependRestore;
		const viewport = this.viewport;
		if (!anchor || !viewport || !anchor.element.isConnected) return false;

		const nextViewportTop = getElementViewportTop(anchor.element, viewport);
		const offset = nextViewportTop - anchor.viewportTop;
		if (Math.abs(offset) <= SCROLL_POSITION_EPSILON) return false;

		viewport.scrollTop += offset;
		anchor.viewportTop = getElementViewportTop(anchor.element, viewport);
		this.scheduleStateCommit();
		return true;
	}

	private capturePrependAnchor() {
		const content = this.content;
		const viewport = this.viewport;
		if (!content || !viewport) {
			this.prependRestore = null;
			return;
		}

		const anchor = getFirstVisibleMessageItem({
			content,
			spacer: this.spacer,
			viewport,
		});
		this.prependRestore = anchor
			? { element: anchor, viewportTop: getElementViewportTop(anchor, viewport) }
			: null;
	}

	private setAutoScrolling(isAutoScrolling: boolean) {
		if (this.autoScrollingTimeout !== null) {
			clearTimeout(this.autoScrollingTimeout);
			this.autoScrollingTimeout = null;
		}

		if (this.isAutoScrolling !== isAutoScrolling) {
			this.isAutoScrolling = isAutoScrolling;
			this.commitScrollState();
		}

		if (!isAutoScrolling) return;

		this.autoScrollingTimeout = setTimeout(() => {
			this.autoScrollingTimeout = null;
			this.isAutoScrolling = false;
			this.commitScrollState();
		}, AUTOSCROLLING_CLEAR_DELAY);
	}

	private setTailSpacerHeight(height: number) {
		const spacer = this.spacer;
		if (!spacer) return;

		const nextHeight = Math.max(0, Math.ceil(height));
		if (this.spacerHeight === nextHeight) return;

		this.spacerHeight = nextHeight;
		spacer.hidden = nextHeight === 0;
		spacer.style.height = `${nextHeight}px`;
		spacer.style.marginTop = nextHeight > 0 ? `${-this.spacerGap}px` : "";
	}

	private scheduleStateCommit() {
		if (this.pendingStateFrame !== null) return;

		this.pendingStateFrame = requestAnimationFrame(() => {
			this.pendingStateFrame = null;
			this.commitScrollState();
		});
	}

	private commitScrollState() {
		const nextState = getMessageScrollerScrollable({
			content: this.content,
			scrollEdgeThreshold: this.scrollEdgeThreshold,
			spacer: this.spacer,
			viewport: this.viewport,
		});

		this.reconcileFollowMode(nextState);
		const publishedState =
			this.mode === "following-bottom" ? { ...nextState, end: false } : nextState;

		this.scrollable.start = publishedState.start;
		this.scrollable.end = publishedState.end;
		this.writeStateAttributes(publishedState);
	}

	private reconcileFollowMode(scrollable: MessageScrollerScrollable) {
		const scrollTop = this.viewport?.scrollTop ?? 0;
		const hasScrolledUp = scrollTop < this.lastScrollTop - SCROLL_POSITION_EPSILON;
		this.lastScrollTop = scrollTop;

		if (
			this.autoScroll &&
			!scrollable.end &&
			this.mode !== "settling-jump" &&
			this.mode !== "anchored-to-message"
		) {
			this.mode = "following-bottom";
			return;
		}

		if (
			this.mode === "following-bottom" &&
			scrollable.end &&
			hasScrolledUp &&
			!this.isAutoScrolling
		) {
			this.mode = "free-scrolling";
		}
	}

	private writeStateAttributes(state: MessageScrollerScrollable) {
		const scrollable = [state.start && "start", state.end && "end"].filter(Boolean).join(" ");

		for (const element of [this.root, this.viewport]) {
			if (!element) continue;
			if (scrollable) element.setAttribute("data-scrollable", scrollable);
			else element.removeAttribute("data-scrollable");
			element.toggleAttribute("data-autoscrolling", this.isAutoScrolling);
		}
	}

	private observeVisibility() {
		if (!this.viewport || this.visibilitySubscriberCount === 0) return;
		if (typeof IntersectionObserver === "undefined") {
			this.scheduleVisibilitySync();
			return;
		}

		this.visibilityObserver = new IntersectionObserver(this.handleVisibilityChange, {
			root: this.viewport,
			rootMargin: `${-(this.scrollMargin + this.scrollPreviousItemPeek)}px 0px 0px 0px`,
			threshold: [0, 0.01, 0.5, 1],
		});
		this.messageElements.forEach((element) => this.visibilityObserver?.observe(element));
		this.scheduleVisibilitySync();
	}

	private handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
		for (const entry of entries) {
			const messageId =
				entry.target instanceof HTMLElement ? entry.target.dataset.messageId : undefined;
			if (!messageId) continue;
			if (entry.isIntersecting) this.visibleMessageIds.add(messageId);
			else this.visibleMessageIds.delete(messageId);
		}

		this.scheduleVisibilitySync();
	};

	private rebuildVisibilityObserver() {
		if (this.visibilitySubscriberCount === 0) return;
		this.visibilityObserver?.disconnect();
		this.visibilityObserver = null;
		this.visibleMessageIds.clear();
		this.observeVisibility();
	}

	private unobserveVisibility() {
		this.cancelFrame(this.pendingVisibilityFrame);
		this.pendingVisibilityFrame = null;
		this.visibilityObserver?.disconnect();
		this.visibilityObserver = null;
		this.visibleMessageIds.clear();
		this.visibility.currentAnchorId = EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE.currentAnchorId;
		this.visibility.visibleMessageIds =
			EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE.visibleMessageIds;
	}

	private scheduleVisibilitySync() {
		if (this.visibilitySubscriberCount === 0 || this.pendingVisibilityFrame !== null) return;

		this.pendingVisibilityFrame = requestAnimationFrame(() => {
			this.pendingVisibilityFrame = null;
			if (this.visibilitySubscriberCount === 0) return;

			const nextState = getMessageScrollerVisibilityState({
				content: this.content,
				scrollMargin: this.scrollMargin,
				scrollPreviousItemPeek: this.scrollPreviousItemPeek,
				spacer: this.spacer,
				viewport: this.viewport,
				visibleMessageIds: this.visibleMessageIds,
			});
			this.visibility.currentAnchorId = nextState.currentAnchorId;
			this.visibility.visibleMessageIds = nextState.visibleMessageIds;
		});
	}

	private cancelFrame(frame: number | null) {
		if (frame !== null) cancelAnimationFrame(frame);
	}
}

const MESSAGE_SCROLLER_CONTEXT = Symbol("message-scroller");

export function provideMessageScroller(controller: MessageScrollerController) {
	setContext(MESSAGE_SCROLLER_CONTEXT, controller);
}

function getMessageScrollerContext() {
	if (!hasContext(MESSAGE_SCROLLER_CONTEXT)) {
		throw new Error("MessageScroller components must be used within MessageScroller.Provider");
	}

	return getContext<MessageScrollerController>(MESSAGE_SCROLLER_CONTEXT);
}

export function useMessageScroller() {
	const controller = getMessageScrollerContext();
	return {
		scrollToEnd: controller.scrollToEnd,
		scrollToMessage: controller.scrollToMessage,
		scrollToStart: controller.scrollToStart,
	};
}

export function useMessageScrollerScrollable() {
	return getMessageScrollerContext().scrollable;
}

export function useMessageScrollerVisibility() {
	const controller = getMessageScrollerContext();
	onMount(controller.connectVisibility);
	return controller.visibility;
}

export function useMessageScrollerController() {
	return getMessageScrollerContext();
}
