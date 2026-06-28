import {
	getElementScrollTop,
	getElementViewportTop,
	getFirstVisibleMessageItem,
	getFlexGap,
	getLastScrollAnchor,
	getMaxScrollTop,
	getMessageScrollerItems,
	getMessageScrollerScrollable,
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
	SCROLL_POSITION_EPSILON,
	type MessageScrollerMode,
	type MessageScrollerProviderProps,
	type MessageScrollerScrollOptions,
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
	private autoScroll = false;
	private autoscrolling = false;
	private autoscrollingTimeout: ReturnType<typeof setTimeout> | null = null;
	private content: HTMLElement | null = null;
	private defaultScrollPosition: MessageScrollerProviderProps["defaultScrollPosition"] = "end";
	private defaultScrollPositionApplied = false;
	private firstItem: HTMLElement | null = null;
	private handledAnchors = new WeakSet<HTMLElement>();
	private itemCount = 0;
	private messageElements = new Map<string, HTMLElement>();
	private mode: MessageScrollerMode = "free-scrolling";
	private pendingFrame: number | null = null;
	private pendingScrollToMessage: PendingScrollToMessage | null = null;
	private prependRestore: PrependRestoreAnchor | null = null;
	private preserveScrollOnPrepend = true;
	private root: HTMLElement | null = null;
	private scrollEdgeThreshold = DEFAULT_SCROLL_EDGE_THRESHOLD;
	private scrollMargin = DEFAULT_SCROLL_MARGIN;
	private scrollPreviousItemPeek = DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK;
	private spacer: HTMLElement | null = null;
	private spacerGap = 0;
	private spacerHeight = 0;
	private streamingTurn: HTMLElement | null = null;
	private viewport: HTMLElement | null = null;

	setOptions = ({
		autoScroll = false,
		defaultScrollPosition = "end",
		scrollEdgeThreshold = DEFAULT_SCROLL_EDGE_THRESHOLD,
		scrollMargin = DEFAULT_SCROLL_MARGIN,
		scrollPreviousItemPeek = DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
	}: MessageScrollerProviderProps) => {
		if (this.defaultScrollPosition !== defaultScrollPosition) {
			this.defaultScrollPositionApplied = false;
		}

		this.autoScroll = autoScroll;
		this.defaultScrollPosition = defaultScrollPosition;
		this.scrollEdgeThreshold = scrollEdgeThreshold;
		this.scrollMargin = scrollMargin;
		this.scrollPreviousItemPeek = scrollPreviousItemPeek;

		if (autoScroll && this.mode === "following-bottom" && this.itemCount > 0) {
			this.scrollToEnd({ behavior: "auto" });
			return;
		}

		this.commitScrollState();
	};

	setRootElement = (element: HTMLElement | null) => {
		this.root = element;
		this.mirrorStateAttributes();
	};

	setViewportElement = (element: HTMLElement | null) => {
		this.viewport = element;
		this.mirrorStateAttributes();
	};

	setContentElement = (element: HTMLElement | null) => {
		this.content = element;
	};

	setSpacerElement = (element: HTMLElement | null) => {
		this.spacer = element;
		this.spacerGap = getFlexGap(element?.parentElement ?? null);
	};

	setPreserveScrollOnPrepend = (value: boolean) => {
		this.preserveScrollOnPrepend = value;
	};

	registerMessage = (
		messageId: string,
		element: HTMLElement | null,
		removedElement?: HTMLElement | null
	) => {
		if (element) {
			this.messageElements.set(messageId, element);

			if (this.pendingScrollToMessage?.messageId === messageId) {
				this.scheduleContentChange();
			}

			return;
		}

		if (removedElement && this.messageElements.get(messageId) === removedElement) {
			this.messageElements.delete(messageId);
		}
	};

	scheduleContentChange = () => {
		if (this.pendingFrame !== null) return;

		this.pendingFrame = requestAnimationFrame(() => {
			this.pendingFrame = null;
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

		if (this.flushPendingScrollToMessage()) {
			this.capturePrependAnchor();
			return;
		}

		if (previousItemCount === 0) {
			if (this.applyDefaultScrollPosition()) {
				this.capturePrependAnchor();
				return;
			}

			if (items.length > 0 && this.autoScroll && this.scrollToEnd({ behavior: "auto" })) {
				this.capturePrependAnchor();
				return;
			}

			this.commitScrollState();
			this.capturePrependAnchor();
			return;
		}

		const previousFirstItemIndex = previousFirstItem ? items.indexOf(previousFirstItem) : -1;
		const didPrepend = this.preserveScrollOnPrepend && previousFirstItemIndex > 0;

		if (didPrepend) {
			this.restorePrependedAnchor();
			this.capturePrependAnchor();
			return;
		}

		if (items.length > previousItemCount) {
			const anchor = getNewScrollAnchor(items, previousItemCount);

			if (anchor) {
				if (
					this.autoScroll &&
					this.mode === "following-bottom" &&
					hasMultipleNewScrollAnchors(items, previousItemCount)
				) {
					this.scrollToEnd({ behavior: "auto" });
					this.capturePrependAnchor();
					return;
				}

				this.scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true });
				this.handledAnchors.add(anchor);
				this.capturePrependAnchor();
				return;
			}
		}

		if (items.length === previousItemCount) {
			const anchor = getUnanchoredScrollAnchor(items, this.handledAnchors);

			if (anchor) {
				this.scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true });
				this.handledAnchors.add(anchor);
				this.capturePrependAnchor();
				return;
			}
		}

		if (this.mode === "following-bottom" && this.autoScroll) {
			this.scrollToEnd({ behavior: "auto" });
		} else {
			this.commitScrollState();
		}

		this.capturePrependAnchor();
	};

	handleResize = () => {
		if (this.mode === "following-bottom" && this.autoScroll) {
			this.scrollToEnd({ behavior: "auto" });
			return;
		}

		if (this.reanchorToAnchoredMessage()) return;

		this.scheduleStateCommit();
	};

	syncAfterScroll = () => {
		this.commitScrollState();
		this.capturePrependAnchor();
	};

	userScrollIntent = () => {
		if (
			this.mode === "following-bottom" ||
			this.mode === "anchored-to-message" ||
			this.mode === "settling-jump"
		) {
			this.streamingTurn = null;
			this.mode = "free-scrolling";
		}
	};

	scrollToStart = ({ behavior = "auto" }: MessageScrollerScrollOptions = {}) => {
		if (!this.viewport) return false;

		this.setTailSpacerHeight(0);
		this.streamingTurn = null;
		this.mode = "free-scrolling";
		this.scrollToPosition(0, { behavior });

		return true;
	};

	scrollToEnd = ({ behavior = "auto" }: MessageScrollerScrollOptions = {}) => {
		const viewport = this.viewport;
		if (!viewport) return false;

		this.setTailSpacerHeight(0);
		this.streamingTurn = null;
		this.mode = this.autoScroll ? "following-bottom" : "free-scrolling";
		this.scrollToPosition(getMaxScrollTop(viewport), {
			autoscrolling: true,
			behavior,
		});

		return true;
	};

	scrollToMessage = (messageId: string, options?: MessageScrollerScrollOptions) => {
		const element = this.messageElements.get(messageId);

		if (!element) {
			if (this.itemCount === 0) {
				this.pendingScrollToMessage = { messageId, options };
				this.defaultScrollPositionApplied = true;
				return true;
			}

			return false;
		}

		this.defaultScrollPositionApplied = true;

		if (this.scrollToElement(element, options)) {
			this.pendingScrollToMessage = null;
			return true;
		}

		this.pendingScrollToMessage = { messageId, options };

		return true;
	};

	destroy = () => {
		if (this.pendingFrame !== null) {
			cancelAnimationFrame(this.pendingFrame);
			this.pendingFrame = null;
		}

		if (this.autoscrollingTimeout !== null) {
			clearTimeout(this.autoscrollingTimeout);
			this.autoscrollingTimeout = null;
		}
	};

	private applyDefaultScrollPosition() {
		if (
			!this.defaultScrollPosition ||
			this.defaultScrollPositionApplied ||
			this.itemCount === 0
		) {
			return false;
		}

		let handled: boolean;

		if (this.defaultScrollPosition === "last-anchor") {
			const content = this.content;
			const viewport = this.viewport;
			const anchor =
				content && viewport
					? getLastScrollAnchor(getMessageScrollerItems(content, this.spacer))
					: null;

			if (!content || !viewport || !anchor) {
				handled = this.scrollToEnd({ behavior: "auto" });
			} else {
				const scrollTop = getElementScrollTop({
					align: "start",
					element: anchor,
					scrollMargin: this.scrollMargin + this.scrollPreviousItemPeek,
					spacer: this.spacer,
					viewport,
				});
				const lastTurnFits =
					getTailSpacerHeight({
						content,
						scrollTop,
						spacer: this.spacer,
						viewport,
					}) <= 0;

				handled = lastTurnFits
					? this.scrollToEnd({ behavior: "auto" })
					: this.scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true });
			}
		} else {
			handled =
				this.defaultScrollPosition === "end"
					? this.scrollToEnd({ behavior: "auto" })
					: this.scrollToStart({ behavior: "auto" });
		}

		if (!handled) return false;

		this.defaultScrollPositionApplied = true;
		return true;
	}

	private flushPendingScrollToMessage() {
		const pending = this.pendingScrollToMessage;
		if (!pending) return false;

		const element = this.messageElements.get(pending.messageId);
		if (!element) return false;

		const handled = this.scrollToElement(element, pending.options);
		if (!handled) return false;

		this.pendingScrollToMessage = null;
		this.defaultScrollPositionApplied = true;

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

		const nextSpacerHeight = getTailSpacerHeight({
			content,
			scrollTop,
			spacer: this.spacer,
			viewport,
		});

		this.setTailSpacerHeight(nextSpacerHeight);
		this.prependRestore = {
			element,
			viewportTop: getElementViewportTop(element, viewport),
		};
		this.mode = keepPreviousPeek ? "anchored-to-message" : "settling-jump";
		this.streamingTurn = keepPreviousPeek ? element : null;
		this.scrollToPosition(scrollTop, { behavior });

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
			autoscrolling = false,
		}: {
			behavior?: ScrollBehavior;
			autoscrolling?: boolean;
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

		if (autoscrolling) {
			this.setAutoScrolling(true);
		}

		viewport.scrollTo({
			top: nextScrollTop,
			behavior,
		});
		this.scheduleStateCommit();
	}

	private restorePrependedAnchor() {
		const anchor = this.prependRestore;
		const viewport = this.viewport;

		if (!anchor || !viewport || !anchor.element.isConnected) {
			return false;
		}

		const nextViewportTop = getElementViewportTop(anchor.element, viewport);
		const delta = nextViewportTop - anchor.viewportTop;

		if (Math.abs(delta) <= SCROLL_POSITION_EPSILON) {
			return false;
		}

		viewport.scrollTop += delta;
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
			? {
					element: anchor,
					viewportTop: getElementViewportTop(anchor, viewport),
				}
			: null;
	}

	private setAutoScrolling(autoscrolling: boolean) {
		if (this.autoscrollingTimeout !== null) {
			clearTimeout(this.autoscrollingTimeout);
			this.autoscrollingTimeout = null;
		}

		if (this.autoscrolling !== autoscrolling) {
			this.autoscrolling = autoscrolling;
			this.commitScrollState();
		}

		if (autoscrolling) {
			this.autoscrollingTimeout = setTimeout(() => {
				this.autoscrollingTimeout = null;
				this.autoscrolling = false;
				this.commitScrollState();
			}, AUTOSCROLLING_CLEAR_DELAY);
		}
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
		requestAnimationFrame(() => this.commitScrollState());
	}

	private commitScrollState() {
		const state = getMessageScrollerScrollable({
			content: this.content,
			scrollEdgeThreshold: this.scrollEdgeThreshold,
			spacer: this.spacer,
			viewport: this.viewport,
		});

		if (this.autoScroll && !state.end && this.mode !== "settling-jump") {
			this.mode = "following-bottom";
		} else if (this.mode === "following-bottom" && state.end && !this.autoscrolling) {
			this.mode = "free-scrolling";
		}

		this.writeStateAttributes(state);
	}

	private mirrorStateAttributes() {
		this.commitScrollState();
	}

	private writeStateAttributes(state: { start: boolean; end: boolean }) {
		const scrollable = [state.start && "start", state.end && "end"].filter(Boolean).join(" ");

		for (const element of [this.root, this.viewport]) {
			if (!element) continue;

			if (scrollable) {
				element.setAttribute("data-scrollable", scrollable);
			} else {
				element.removeAttribute("data-scrollable");
			}

			element.toggleAttribute("data-autoscrolling", this.autoscrolling);
		}
	}
}
