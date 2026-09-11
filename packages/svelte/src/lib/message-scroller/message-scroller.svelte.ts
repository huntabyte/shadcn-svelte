import { tick } from "svelte";
import { Context } from "runed";
import type { ReadableBoxedValues } from "svelte-toolbelt";
import {
	getContentBottom,
	getElementScrollTop,
	getElementTop,
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
	areScrollStatesEqual,
	createMessageScrollerStore,
	createMessageScrollerVisibilityStore,
} from "./stores.js";
import {
	AUTOSCROLLING_CLEAR_DELAY,
	EMPTY_MESSAGE_SCROLLER_SCROLLABLE,
	EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE,
	SCROLL_POSITION_EPSILON,
} from "./types.js";
import type {
	MessageScrollerDefaultScrollPosition,
	MessageScrollerMode,
	MessageScrollerRef,
	MessageScrollerRegisterMessage,
	MessageScrollerScrollable,
	MessageScrollerScrollOptions,
	MessageScrollerStore,
	MessageScrollerVisibilityState,
	MessageScrollerVisibilityStore,
} from "./types.js";

function createRef<T>(initial: T): MessageScrollerRef<T> {
	return { current: initial };
}

type MessageScrollerRefs = {
	autoScrollRef: MessageScrollerRef<boolean>;
	autoscrollingRef: MessageScrollerRef<boolean>;
	autoscrollingTimeoutRef: MessageScrollerRef<number | null>;
	streamingTurnRef: MessageScrollerRef<HTMLElement | null>;
	contentRef: MessageScrollerRef<HTMLDivElement | null>;
	defaultScrollPositionAppliedRef: MessageScrollerRef<boolean>;
	firstItemRef: MessageScrollerRef<HTMLElement | null>;
	itemCountRef: MessageScrollerRef<number>;
	lastScrollTopRef: MessageScrollerRef<number>;
	messageElementsRef: MessageScrollerRef<Map<string, HTMLElement>>;
	modeRef: MessageScrollerRef<MessageScrollerMode>;
	pendingScrollFrameRef: MessageScrollerRef<number | null>;
	pendingScrollToMessageRef: MessageScrollerRef<{
		messageId: string;
		options?: MessageScrollerScrollOptions;
	} | null>;
	prependRestoreRef: MessageScrollerRef<{
		element: HTMLElement;
		viewportTop: number;
	} | null>;
	preserveScrollOnPrependRef: MessageScrollerRef<boolean>;
	pendingDefaultScrollStore: MessageScrollerStore<boolean>;
	rootRef: MessageScrollerRef<HTMLDivElement | null>;
	scrollEdgeThresholdRef: MessageScrollerRef<number>;
	scrollMarginRef: MessageScrollerRef<number>;
	scrollPreviousItemPeekRef: MessageScrollerRef<number>;
	spacerGapRef: MessageScrollerRef<number>;
	spacerHeightRef: MessageScrollerRef<number>;
	spacerRef: MessageScrollerRef<HTMLDivElement | null>;
	stateFrameRef: MessageScrollerRef<number | null>;
	stateStore: MessageScrollerStore<MessageScrollerScrollable>;
	viewportRef: MessageScrollerRef<HTMLDivElement | null>;
	visibilityFrameRef: MessageScrollerRef<number | null>;
	visibilityObserverRef: MessageScrollerRef<IntersectionObserver | null>;
	visibilityStore: MessageScrollerVisibilityStore;
	visibleMessageIdsRef: MessageScrollerRef<Set<string>>;
	handledScrollAnchorsRef: MessageScrollerRef<WeakSet<HTMLElement>>;
};

function createMessageScrollerRefs({
	autoScroll,
	defaultScrollPosition,
	scrollEdgeThreshold,
	scrollMargin,
	scrollPreviousItemPeek,
}: {
	autoScroll: boolean;
	defaultScrollPosition: MessageScrollerDefaultScrollPosition;
	scrollEdgeThreshold: number;
	scrollMargin: number;
	scrollPreviousItemPeek: number;
}): MessageScrollerRefs {
	return {
		autoScrollRef: createRef(autoScroll),
		autoscrollingRef: createRef(false),
		autoscrollingTimeoutRef: createRef<number | null>(null),
		streamingTurnRef: createRef<HTMLElement | null>(null),
		contentRef: createRef<HTMLDivElement | null>(null),
		defaultScrollPositionAppliedRef: createRef(false),
		firstItemRef: createRef<HTMLElement | null>(null),
		itemCountRef: createRef(0),
		lastScrollTopRef: createRef(0),
		messageElementsRef: createRef(new Map<string, HTMLElement>()),
		modeRef: createRef<MessageScrollerMode>(autoScroll ? "following-bottom" : "free-scrolling"),
		pendingScrollFrameRef: createRef<number | null>(null),
		pendingScrollToMessageRef: createRef<{
			messageId: string;
			options?: MessageScrollerScrollOptions;
		} | null>(null),
		prependRestoreRef: createRef<{
			element: HTMLElement;
			viewportTop: number;
		} | null>(null),
		preserveScrollOnPrependRef: createRef(true),
		pendingDefaultScrollStore: createMessageScrollerStore(
			defaultScrollPosition === "end" || defaultScrollPosition === "last-anchor",
			(current, next) => current === next
		),
		rootRef: createRef<HTMLDivElement | null>(null),
		scrollEdgeThresholdRef: createRef(scrollEdgeThreshold),
		scrollMarginRef: createRef(scrollMargin),
		scrollPreviousItemPeekRef: createRef(scrollPreviousItemPeek),
		spacerGapRef: createRef(0),
		spacerHeightRef: createRef(0),
		spacerRef: createRef<HTMLDivElement | null>(null),
		stateFrameRef: createRef<number | null>(null),
		stateStore: createMessageScrollerStore(
			EMPTY_MESSAGE_SCROLLER_SCROLLABLE,
			areScrollStatesEqual
		),
		viewportRef: createRef<HTMLDivElement | null>(null),
		visibilityFrameRef: createRef<number | null>(null),
		visibilityObserverRef: createRef<IntersectionObserver | null>(null),
		visibilityStore: createMessageScrollerVisibilityStore(),
		visibleMessageIdsRef: createRef(new Set<string>()),
		handledScrollAnchorsRef: createRef(new WeakSet<HTMLElement>()),
	};
}

function clearPendingDefaultScroll(refs: MessageScrollerRefs) {
	refs.pendingDefaultScrollStore.setSnapshot(false);
}

function markDefaultScrollPositionApplied(refs: MessageScrollerRefs) {
	refs.defaultScrollPositionAppliedRef.current = true;
	clearPendingDefaultScroll(refs);
}

function createMessageScrollerCommands({
	refs,
	commitScrollState,
	scheduleStateCommit,
	scheduleVisibilitySync,
}: {
	refs: MessageScrollerRefs;
	commitScrollState: () => void;
	scheduleStateCommit: () => void;
	scheduleVisibilitySync: () => void;
}) {
	const {
		streamingTurnRef,
		autoScrollRef,
		autoscrollingRef,
		autoscrollingTimeoutRef,
		contentRef,
		itemCountRef,
		messageElementsRef,
		modeRef,
		pendingScrollToMessageRef,
		prependRestoreRef,
		scrollMarginRef,
		scrollPreviousItemPeekRef,
		spacerGapRef,
		spacerHeightRef,
		spacerRef,
		viewportRef,
	} = refs;

	const setAutoScrolling = (autoscrolling: boolean) => {
		if (autoscrollingTimeoutRef.current !== null) {
			window.clearTimeout(autoscrollingTimeoutRef.current);
			autoscrollingTimeoutRef.current = null;
		}

		if (autoscrollingRef.current !== autoscrolling) {
			autoscrollingRef.current = autoscrolling;
			commitScrollState();
		}

		if (autoscrolling) {
			autoscrollingTimeoutRef.current = window.setTimeout(() => {
				autoscrollingTimeoutRef.current = null;
				autoscrollingRef.current = false;
				commitScrollState();
			}, AUTOSCROLLING_CLEAR_DELAY);
		}
	};

	const setTailSpacerHeight = (height: number) => {
		const spacer = spacerRef.current;

		if (!spacer) {
			return;
		}

		const nextHeight = Math.max(0, Math.ceil(height));

		if (spacerHeightRef.current === nextHeight) {
			return;
		}

		spacerHeightRef.current = nextHeight;
		spacer.hidden = nextHeight === 0;
		spacer.style.height = `${nextHeight}px`;
		spacer.style.marginTop = nextHeight > 0 ? `${-spacerGapRef.current}px` : "";
	};

	const scrollToPosition = (
		scrollTop: number,
		{
			behavior = "auto",
			autoscrolling = false,
		}: {
			behavior?: ScrollBehavior;
			autoscrolling?: boolean;
		} = {}
	) => {
		const viewport = viewportRef.current;

		if (!viewport) {
			return;
		}

		const nextScrollTop = Math.max(0, scrollTop);

		if (Math.abs(viewport.scrollTop - nextScrollTop) <= SCROLL_POSITION_EPSILON) {
			viewport.scrollTop = nextScrollTop;
			commitScrollState();
			return;
		}

		if (autoscrolling) {
			setAutoScrolling(true);
		}

		viewport.scrollTo({
			top: nextScrollTop,
			behavior,
		});
		scheduleStateCommit();
	};

	const scrollToStart = ({ behavior = "auto" }: MessageScrollerScrollOptions = {}) => {
		if (!viewportRef.current) {
			return false;
		}

		setTailSpacerHeight(0);
		streamingTurnRef.current = null;
		modeRef.current = "free-scrolling";
		scrollToPosition(0, { behavior });
		scheduleVisibilitySync();

		return true;
	};

	const scrollToEnd = ({ behavior = "auto" }: MessageScrollerScrollOptions = {}) => {
		const viewport = viewportRef.current;

		if (!viewport) {
			return false;
		}

		setTailSpacerHeight(0);
		streamingTurnRef.current = null;
		modeRef.current = autoScrollRef.current ? "following-bottom" : "free-scrolling";
		scrollToPosition(getMaxScrollTop(viewport), {
			autoscrolling: true,
			behavior,
		});
		scheduleVisibilitySync();

		return true;
	};

	const scrollToElement = (
		element: HTMLElement,
		{
			align = "start",
			behavior = "auto",
			scrollMargin = scrollMarginRef.current,
		}: MessageScrollerScrollOptions = {},
		{
			keepPreviousPeek = false,
		}: {
			keepPreviousPeek?: boolean;
		} = {}
	) => {
		const content = contentRef.current;
		const viewport = viewportRef.current;

		if (!content || !viewport || !content.contains(element)) {
			return false;
		}

		const scrollTop = getElementScrollTop({
			align,
			element,
			scrollMargin: keepPreviousPeek
				? scrollMargin + scrollPreviousItemPeekRef.current
				: scrollMargin,
			spacer: spacerRef.current,
			viewport,
		});

		const nextSpacerHeight = getTailSpacerHeight({
			content,
			scrollTop,
			spacer: spacerRef.current,
			viewport,
		});

		setTailSpacerHeight(nextSpacerHeight);
		// Seed the prepend anchor with the jump target so a prepend that lands
		// before this scroll settles still preserves the jumped-to row; once it
		// settles, syncAfterScroll's capturePrependAnchor re-captures it from the
		// first visible row.
		prependRestoreRef.current = {
			element,
			viewportTop: getElementViewportTop(element, viewport),
		};

		modeRef.current = keepPreviousPeek ? "anchored-to-message" : "settling-jump";
		streamingTurnRef.current = keepPreviousPeek ? element : null;

		scrollToPosition(scrollTop, { behavior });
		scheduleVisibilitySync();

		return true;
	};

	const reanchorToAnchoredMessage = () => {
		const element = streamingTurnRef.current;

		if (!element || !element.isConnected || modeRef.current !== "anchored-to-message") {
			return false;
		}

		// Re-run the placement so the tail spacer is recomputed for the new content
		// height and the turn is held at the reading line.
		return scrollToElement(element, { align: "start" }, { keepPreviousPeek: true });
	};

	// The target row may not be mounted yet (e.g. an async-loaded transcript).
	// When it is missing the request is queued in pendingScrollToMessageRef and
	// flushed later — on registerMessage for that id, or on the next content
	// change. An explicit jump also marks the mount default as applied, so
	// defaultScrollPosition does not override it.
	const scrollToMessage = (messageId: string, options?: MessageScrollerScrollOptions) => {
		const element = messageElementsRef.current.get(messageId);

		if (!element) {
			if (itemCountRef.current === 0) {
				pendingScrollToMessageRef.current = {
					messageId,
					options,
				};
				markDefaultScrollPositionApplied(refs);

				return true;
			}

			return false;
		}

		markDefaultScrollPositionApplied(refs);

		if (scrollToElement(element, options)) {
			pendingScrollToMessageRef.current = null;
			return true;
		}

		pendingScrollToMessageRef.current = {
			messageId,
			options,
		};

		return true;
	};

	const flushPendingScrollToMessage = () => {
		const pending = pendingScrollToMessageRef.current;

		if (!pending) {
			return false;
		}

		const element = messageElementsRef.current.get(pending.messageId);

		if (!element) {
			return false;
		}

		const handled = scrollToElement(element, pending.options);

		if (!handled) {
			return false;
		}

		pendingScrollToMessageRef.current = null;
		markDefaultScrollPositionApplied(refs);

		return true;
	};

	return {
		flushPendingScrollToMessage,
		reanchorToAnchoredMessage,
		scrollToElement,
		scrollToEnd,
		scrollToMessage,
		scrollToStart,
	};
}

interface MessageScrollerProviderStateOpts
	extends ReadableBoxedValues<{
		autoScroll: boolean;
		defaultScrollPosition: MessageScrollerDefaultScrollPosition;
		scrollEdgeThreshold: number;
		scrollPreviousItemPeek: number;
		scrollMargin: number;
	}> {}

const MessageScrollerContext = new Context<MessageScrollerProviderState>("MessageScroller");

export class MessageScrollerProviderState {
	static create(opts: MessageScrollerProviderStateOpts) {
		return MessageScrollerContext.set(new MessageScrollerProviderState(opts));
	}

	static get() {
		return MessageScrollerContext.get();
	}

	readonly opts: MessageScrollerProviderStateOpts;
	readonly refs: MessageScrollerRefs;
	readonly commands: ReturnType<typeof createMessageScrollerCommands>;
	previousDefaultScrollPosition: MessageScrollerDefaultScrollPosition;

	constructor(opts: MessageScrollerProviderStateOpts) {
		this.opts = opts;
		this.previousDefaultScrollPosition = opts.defaultScrollPosition.current;
		this.refs = createMessageScrollerRefs({
			autoScroll: opts.autoScroll.current,
			defaultScrollPosition: opts.defaultScrollPosition.current,
			scrollEdgeThreshold: opts.scrollEdgeThreshold.current,
			scrollMargin: opts.scrollMargin.current,
			scrollPreviousItemPeek: opts.scrollPreviousItemPeek.current,
		});
		this.commands = createMessageScrollerCommands({
			refs: this.refs,
			commitScrollState: () => this.commitScrollState(),
			scheduleStateCommit: () => this.scheduleStateCommit(),
			scheduleVisibilitySync: () => this.scheduleVisibilitySync(),
		});

		this.handleContentChange = this.handleContentChange.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.observeVisibility = this.observeVisibility.bind(this);
		this.unobserveVisibility = this.unobserveVisibility.bind(this);
		this.registerMessage = this.registerMessage.bind(this);
		this.userScrollIntent = this.userScrollIntent.bind(this);
		this.setRootElement = this.setRootElement.bind(this);
		this.setViewportElement = this.setViewportElement.bind(this);
		this.setContentElement = this.setContentElement.bind(this);
		this.setSpacerElement = this.setSpacerElement.bind(this);
		this.syncAfterScroll = this.syncAfterScroll.bind(this);

		$effect.pre(() => {
			this.refs.autoScrollRef.current = this.opts.autoScroll.current;
			this.refs.scrollEdgeThresholdRef.current = this.opts.scrollEdgeThreshold.current;
			this.refs.scrollMarginRef.current = this.opts.scrollMargin.current;
			this.refs.scrollPreviousItemPeekRef.current = this.opts.scrollPreviousItemPeek.current;
		});

		$effect.pre(() => {
			const defaultScrollPosition = this.opts.defaultScrollPosition.current;

			if (this.previousDefaultScrollPosition !== defaultScrollPosition) {
				this.previousDefaultScrollPosition = defaultScrollPosition;
				this.refs.defaultScrollPositionAppliedRef.current = false;
				// The pending-scroll hold is mount-only. A live prop change re-applies the
				// opening position in layout; it does not hide the viewport again.
			}
		});

		$effect(() => {
			void this.opts.defaultScrollPosition.current;
			let cancelled = false;

			void tick().then(() => {
				if (cancelled) {
					return;
				}

				if (this.applyDefaultScrollPosition()) {
					return;
				}

				if (this.refs.itemCountRef.current === 0) {
					clearPendingDefaultScroll(this.refs);
				}
			});

			return () => {
				cancelled = true;
			};
		});

		$effect(() => {
			const autoScroll = this.opts.autoScroll.current;

			if (
				autoScroll &&
				this.refs.modeRef.current === "following-bottom" &&
				this.refs.itemCountRef.current > 0
			) {
				this.commands.scrollToEnd({ behavior: "auto" });
				return;
			}

			this.commitScrollState();
		});

		$effect(() => {
			return () => {
				// Reset every ref after cancelling. StrictMode replays effects on the same
				// refs (unmount then remount), so a frame id left non-null here makes the
				// scheduler on remount think a frame is still pending and never reschedule.
				if (this.refs.stateFrameRef.current !== null) {
					window.cancelAnimationFrame(this.refs.stateFrameRef.current);
					this.refs.stateFrameRef.current = null;
				}

				if (this.refs.visibilityFrameRef.current !== null) {
					window.cancelAnimationFrame(this.refs.visibilityFrameRef.current);
					this.refs.visibilityFrameRef.current = null;
				}

				if (this.refs.autoscrollingTimeoutRef.current !== null) {
					window.clearTimeout(this.refs.autoscrollingTimeoutRef.current);
					this.refs.autoscrollingTimeoutRef.current = null;
				}

				if (this.refs.pendingScrollFrameRef.current !== null) {
					window.cancelAnimationFrame(this.refs.pendingScrollFrameRef.current);
					this.refs.pendingScrollFrameRef.current = null;
				}

				this.refs.visibilityObserverRef.current?.disconnect();
				this.refs.visibilityObserverRef.current = null;
			};
		});
	}

	get pendingDefaultScrollStore() {
		return this.refs.pendingDefaultScrollStore;
	}

	get stateStore() {
		return this.refs.stateStore;
	}

	get visibilityStore() {
		return this.refs.visibilityStore;
	}

	get preserveScrollOnPrependRef() {
		return this.refs.preserveScrollOnPrependRef;
	}

	get viewportRef() {
		return this.refs.viewportRef;
	}

	get scrollToEnd() {
		return this.commands.scrollToEnd;
	}

	get scrollToMessage() {
		return this.commands.scrollToMessage;
	}

	get scrollToStart() {
		return this.commands.scrollToStart;
	}

	writeStateAttributes(state: MessageScrollerScrollable) {
		const root = this.refs.rootRef.current;
		const viewport = this.refs.viewportRef.current;
		const scrollable = [state.start && "start", state.end && "end"].filter(Boolean).join(" ");
		const autoScrolling = this.refs.autoscrollingRef.current;

		for (const element of [root, viewport]) {
			if (!element) {
				continue;
			}

			if (scrollable) {
				element.setAttribute("data-scrollable", scrollable);
			} else {
				element.removeAttribute("data-scrollable");
			}

			element.toggleAttribute("data-autoscrolling", autoScrolling);
		}
	}

	// Owns the one follow-bottom transition: arm at the bottom, release on any
	// scroll away (including a scrollbar drag), suppressed during a programmatic
	// scroll so the auto-scroll animation cannot release itself. Arming also
	// skips the anchored-to-message hold: the tail spacer makes a freshly
	// anchored turn read as "at the end", and re-arming there would let the
	// first streamed chunk yank the reader off the anchor. The hold hands back
	// to following in handleResize, once the reply consumes the tail spacer.
	reconcileFollowMode(scrollable: MessageScrollerScrollable) {
		const scrollTop = this.refs.viewportRef.current?.scrollTop ?? 0;
		// Content growing past the live edge also reads as "not at the end", but
		// only a scrollbar drag moves scrollTop up. Growth must not release
		// follow-output: the resize handler is coalesced onto a frame, so a state
		// commit can observe the grown content before follow catches up.
		const scrolledUp = scrollTop < this.refs.lastScrollTopRef.current - SCROLL_POSITION_EPSILON;

		this.refs.lastScrollTopRef.current = scrollTop;

		if (
			this.refs.autoScrollRef.current &&
			!scrollable.end &&
			this.refs.modeRef.current !== "settling-jump" &&
			this.refs.modeRef.current !== "anchored-to-message"
		) {
			this.refs.modeRef.current = "following-bottom";
		} else if (
			this.refs.modeRef.current === "following-bottom" &&
			scrollable.end &&
			scrolledUp &&
			!this.refs.autoscrollingRef.current
		) {
			this.refs.modeRef.current = "free-scrolling";
		}
	}

	commitScrollState() {
		const nextState = getMessageScrollerScrollable({
			content: this.refs.contentRef.current,
			scrollEdgeThreshold: this.refs.scrollEdgeThresholdRef.current,
			spacer: this.refs.spacerRef.current,
			viewport: this.refs.viewportRef.current,
		});

		this.reconcileFollowMode(nextState);

		// While follow-output is engaged the scroller is already closing any gap a
		// streamed chunk just opened, so publishing it as scrollable toward the
		// end would strobe the scroll button once per chunk. Reconcile runs on the
		// raw geometry first, so a commit that releases follow still publishes the
		// gap it released over.
		const publishedState =
			this.refs.modeRef.current === "following-bottom"
				? { ...nextState, end: false }
				: nextState;

		this.writeStateAttributes(publishedState);
		this.refs.stateStore.setSnapshot(publishedState);
	}

	scheduleStateCommit() {
		if (this.refs.stateFrameRef.current !== null) {
			return;
		}

		this.refs.stateFrameRef.current = window.requestAnimationFrame(() => {
			this.refs.stateFrameRef.current = null;
			this.commitScrollState();
		});
	}

	scheduleVisibilitySync() {
		if (!this.refs.visibilityStore.hasListeners()) {
			return;
		}

		if (this.refs.visibilityFrameRef.current !== null) {
			return;
		}

		this.refs.visibilityFrameRef.current = window.requestAnimationFrame(() => {
			this.refs.visibilityFrameRef.current = null;

			// A frame can outlive the last unsubscribe. Recomputing here would
			// overwrite the EMPTY snapshot that teardown just wrote, leaving a stale
			// value for the next subscriber to read.
			if (!this.refs.visibilityStore.hasListeners()) {
				return;
			}

			this.refs.visibilityStore.setSnapshot(
				getMessageScrollerVisibilityState({
					content: this.refs.contentRef.current,
					scrollMargin: this.refs.scrollMarginRef.current,
					scrollPreviousItemPeek: this.refs.scrollPreviousItemPeekRef.current,
					spacer: this.refs.spacerRef.current,
					viewport: this.refs.viewportRef.current,
					visibleMessageIds: this.refs.visibleMessageIdsRef.current,
				})
			);
		});
	}

	restorePrependedAnchor() {
		const anchor = this.refs.prependRestoreRef.current;
		const viewport = this.refs.viewportRef.current;

		if (!anchor || !viewport || !anchor.element.isConnected) {
			return false;
		}

		// Compare the anchor relative to the viewport, not to the content. Native
		// scroll anchoring leaves the viewport-relative position unchanged, so this
		// is a no-op where the browser already handled the prepend and only corrects
		// the scroll where it did not (e.g. Safari) — without trusting a capability
		// flag, which some engines report incorrectly.
		const nextViewportTop = getElementViewportTop(anchor.element, viewport);
		const delta = nextViewportTop - anchor.viewportTop;

		if (Math.abs(delta) <= SCROLL_POSITION_EPSILON) {
			return false;
		}

		viewport.scrollTop += delta;
		anchor.viewportTop = getElementViewportTop(anchor.element, viewport);
		this.scheduleStateCommit();
		this.scheduleVisibilitySync();

		return true;
	}

	capturePrependAnchor() {
		const content = this.refs.contentRef.current;
		const viewport = this.refs.viewportRef.current;

		if (!content || !viewport) {
			this.refs.prependRestoreRef.current = null;
			return;
		}

		const anchor = getFirstVisibleMessageItem({
			content,
			spacer: this.refs.spacerRef.current,
			viewport,
		});

		this.refs.prependRestoreRef.current = anchor
			? {
					element: anchor,
					viewportTop: getElementViewportTop(anchor, viewport),
				}
			: null;
	}

	schedulePendingScrollToMessageFlush() {
		if (this.refs.pendingScrollFrameRef.current !== null) {
			return;
		}

		this.refs.pendingScrollFrameRef.current = window.requestAnimationFrame(() => {
			this.refs.pendingScrollFrameRef.current = null;

			if (this.commands.flushPendingScrollToMessage()) {
				this.capturePrependAnchor();
			}
		});
	}

	applyDefaultScrollPosition() {
		const defaultScrollPosition = this.opts.defaultScrollPosition.current;

		if (
			!defaultScrollPosition ||
			this.refs.defaultScrollPositionAppliedRef.current ||
			this.refs.itemCountRef.current === 0
		) {
			return false;
		}

		let handled = false;

		if (defaultScrollPosition === "last-anchor") {
			const content = this.refs.contentRef.current;
			const viewport = this.refs.viewportRef.current;
			const anchor =
				content && viewport
					? getLastScrollAnchor(
							getMessageScrollerItems(content, this.refs.spacerRef.current)
						)
					: null;

			if (!content || !viewport || !anchor) {
				handled = this.commands.scrollToEnd({ behavior: "auto" });
			} else {
				const anchorTop = getElementTop(anchor, viewport);
				const contentBottom = getContentBottom({
					content,
					spacer: this.refs.spacerRef.current,
					viewport,
				});
				// A short last turn already fits below the anchor, so opening at the end
				// shows the whole turn without leaving a blank gap beneath it.
				const lastTurnFits = contentBottom - anchorTop <= viewport.clientHeight;

				handled = lastTurnFits
					? this.commands.scrollToEnd({ behavior: "auto" })
					: this.commands.scrollToElement(
							anchor,
							{ align: "start" },
							{ keepPreviousPeek: true }
						);
			}
		} else {
			handled =
				defaultScrollPosition === "end"
					? this.commands.scrollToEnd({ behavior: "auto" })
					: this.commands.scrollToStart({ behavior: "auto" });
		}

		if (!handled) {
			return false;
		}

		markDefaultScrollPositionApplied(this.refs);

		return true;
	}

	handleContentChange() {
		const content = this.refs.contentRef.current;

		if (!content) {
			return;
		}

		const items = getMessageScrollerItems(content, this.refs.spacerRef.current);
		const previousItemCount = this.refs.itemCountRef.current;
		const previousFirstItem = this.refs.firstItemRef.current;

		this.refs.itemCountRef.current = items.length;
		this.refs.firstItemRef.current = items[0] ?? null;

		// Reconcile the scroll position with the new content. Every path re-captures
		// the prepend anchor afterward, so each branch just returns.
		//
		// Branch order is load-bearing: first-content, prepended, appended, updated.
		const reconcileScrollPosition = () => {
			if (this.commands.flushPendingScrollToMessage()) {
				return;
			}

			if (previousItemCount === 0) {
				if (this.applyDefaultScrollPosition()) {
					return;
				}

				if (
					items.length > 0 &&
					this.refs.autoScrollRef.current &&
					this.commands.scrollToEnd({ behavior: "auto" })
				) {
					return;
				}

				this.commitScrollState();
				this.scheduleVisibilitySync();
				return;
			}

			const previousFirstItemIndex = previousFirstItem
				? items.indexOf(previousFirstItem)
				: -1;
			const didPrepend =
				this.refs.preserveScrollOnPrependRef.current && previousFirstItemIndex > 0;

			if (didPrepend) {
				// Prepended rows are not new appends. Restore the prior scroll position.
				// The restore is a no-op where native scroll anchoring already did it.
				this.restorePrependedAnchor();
				return;
			}

			if (items.length > previousItemCount) {
				const anchor = getNewScrollAnchor(items, previousItemCount);

				if (anchor) {
					// While the reader is following the live end, a batch of several
					// anchored turns arriving at once should keep following the end — not
					// yank back to anchor the first turn of the batch. A single new anchor
					// still moves to the top as usual.
					if (
						this.refs.autoScrollRef.current &&
						this.refs.modeRef.current === "following-bottom" &&
						hasMultipleNewScrollAnchors(items, previousItemCount)
					) {
						this.commands.scrollToEnd({ behavior: "auto" });
						return;
					}

					this.commands.scrollToElement(
						anchor,
						{ align: "start" },
						{ keepPreviousPeek: true }
					);
					this.refs.handledScrollAnchorsRef.current.add(anchor);
					return;
				}
			}

			if (items.length === previousItemCount) {
				const anchor = getUnanchoredScrollAnchor(
					items,
					this.refs.handledScrollAnchorsRef.current
				);

				if (anchor) {
					this.commands.scrollToElement(
						anchor,
						{ align: "start" },
						{ keepPreviousPeek: true }
					);
					this.refs.handledScrollAnchorsRef.current.add(anchor);
					return;
				}
			}

			// Appends with no new anchor (and content-only updates) fall through here:
			// keep following the end if we still are, otherwise just recommit state.
			if (
				this.refs.modeRef.current === "following-bottom" &&
				this.refs.autoScrollRef.current
			) {
				this.commands.scrollToEnd({ behavior: "auto" });
			} else {
				this.commitScrollState();
				this.scheduleVisibilitySync();
			}
		};

		reconcileScrollPosition();
		this.capturePrependAnchor();
	}

	handleResize() {
		if (
			this.refs.modeRef.current === "following-bottom" &&
			this.refs.autoScrollRef.current
		) {
			this.commands.scrollToEnd({ behavior: "auto" });
			return;
		}

		// Hold the anchored turn in place as content below it resizes (a reply
		// streaming in, or a transient marker collapsing) — otherwise the shrinking
		// content lets the browser clamp scrollTop and the turn drops.
		const previousSpacerHeight = this.refs.spacerHeightRef.current;

		if (this.commands.reanchorToAnchoredMessage()) {
			// The reply streaming below the anchor consumes the tail spacer as it
			// grows. Once the last of it is gone the reply has filled the viewport
			// and the reader is genuinely at the live edge, so autoScroll hands off
			// from the anchor hold to following the bottom. Requiring the >0 → 0
			// transition keeps a turn taller than the viewport (placed with no
			// spacer) held instead of yanked to the end.
			if (
				this.refs.autoScrollRef.current &&
				previousSpacerHeight > 0 &&
				this.refs.spacerHeightRef.current === 0
			) {
				this.commands.scrollToEnd({ behavior: "auto" });
			}

			return;
		}

		this.scheduleStateCommit();
		this.scheduleVisibilitySync();
	}

	observeVisibility() {
		const viewport = this.refs.viewportRef.current;

		if (!viewport || !this.refs.visibilityStore.hasListeners()) {
			return;
		}

		if (typeof IntersectionObserver === "undefined") {
			this.scheduleVisibilitySync();
			return;
		}

		if (!this.refs.visibilityObserverRef.current) {
			this.refs.visibilityObserverRef.current = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						const messageId = (entry.target as HTMLElement).dataset.messageId;

						if (!messageId) {
							continue;
						}

						if (entry.isIntersecting) {
							this.refs.visibleMessageIdsRef.current.add(messageId);
						} else {
							this.refs.visibleMessageIdsRef.current.delete(messageId);
						}
					}

					this.scheduleVisibilitySync();
				},
				{
					root: viewport,
					// Shrink the root's top edge to the anchoring line so a previous turn
					// peeking in the scrollMargin + peek band is not reported as visible,
					// keeping visibleMessageIds consistent with currentAnchorId. Captured
					// at observe time; a prop change rebuilds the observer on resubscribe.
					rootMargin: `${-(
						this.refs.scrollMarginRef.current +
						this.refs.scrollPreviousItemPeekRef.current
					)}px 0px 0px 0px`,
					threshold: [0, 0.01, 0.5, 1],
				}
			);
		}

		this.refs.messageElementsRef.current.forEach((element) => {
			this.refs.visibilityObserverRef.current?.observe(element);
		});
		this.scheduleVisibilitySync();
	}

	unobserveVisibility() {
		if (this.refs.visibilityFrameRef.current !== null) {
			window.cancelAnimationFrame(this.refs.visibilityFrameRef.current);
			this.refs.visibilityFrameRef.current = null;
		}

		this.refs.visibilityObserverRef.current?.disconnect();
		this.refs.visibilityObserverRef.current = null;
		this.refs.visibleMessageIdsRef.current.clear();
		this.refs.visibilityStore.setSnapshot(EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE);
	}

	registerMessage: MessageScrollerRegisterMessage = (messageId, element, removedElement) => {
		if (element) {
			this.refs.messageElementsRef.current.set(messageId, element);
			this.refs.visibilityObserverRef.current?.observe(element);
			this.scheduleVisibilitySync();

			if (this.refs.pendingScrollToMessageRef.current?.messageId === messageId) {
				this.schedulePendingScrollToMessageFlush();
			}

			return;
		}

		if (
			removedElement &&
			this.refs.messageElementsRef.current.get(messageId) === removedElement
		) {
			this.refs.messageElementsRef.current.delete(messageId);
			this.refs.visibleMessageIdsRef.current.delete(messageId);
			this.refs.visibilityObserverRef.current?.unobserve(removedElement);
			this.scheduleVisibilitySync();
		}
	};

	userScrollIntent() {
		if (
			this.refs.modeRef.current === "following-bottom" ||
			this.refs.modeRef.current === "anchored-to-message" ||
			this.refs.modeRef.current === "settling-jump"
		) {
			// A deliberate gesture releases auto-follow, turn-anchoring, and an in-flight
			// programmatic jump so re-pinning (and re-arming) never fights the reader.
			this.refs.streamingTurnRef.current = null;
			this.refs.modeRef.current = "free-scrolling";
		}
	}

	mirrorStateAttributes() {
		this.writeStateAttributes(this.refs.stateStore.getSnapshot());
	}

	setRootElement(element: HTMLDivElement | null) {
		this.refs.rootRef.current = element;

		if (element) {
			this.mirrorStateAttributes();
		}
	}

	setViewportElement(element: HTMLDivElement | null) {
		this.refs.viewportRef.current = element;

		if (element) {
			this.mirrorStateAttributes();

			if (this.refs.visibilityStore.hasListeners()) {
				this.observeVisibility();
			}
		}
	}

	setContentElement(element: HTMLDivElement | null) {
		this.refs.contentRef.current = element;
	}

	setSpacerElement(element: HTMLDivElement | null) {
		this.refs.spacerRef.current = element;
		this.refs.spacerGapRef.current = getFlexGap(element?.parentElement ?? null);
	}

	syncAfterScroll() {
		this.commitScrollState();
		this.scheduleVisibilitySync();
		this.capturePrependAnchor();
	}
}

export function useMessageScroller() {
	const { scrollToEnd, scrollToMessage, scrollToStart } = MessageScrollerProviderState.get();

	return {
		scrollToEnd,
		scrollToMessage,
		scrollToStart,
	};
}

export function useMessageScrollerScrollable(): MessageScrollerScrollable {
	const { stateStore } = MessageScrollerProviderState.get();
	const initial = stateStore.getSnapshot();
	const snapshot = $state({
		start: initial.start,
		end: initial.end,
	});

	$effect.pre(() => {
		const sync = () => {
			const next = stateStore.getSnapshot();
			snapshot.start = next.start;
			snapshot.end = next.end;
		};

		sync();
		return stateStore.subscribe(sync);
	});

	return snapshot;
}

export function useMessageScrollerVisibility(): MessageScrollerVisibilityState {
	const { observeVisibility, unobserveVisibility, visibilityStore } =
		MessageScrollerProviderState.get();
	const initial = visibilityStore.getSnapshot();
	const snapshot = $state({
		currentAnchorId: initial.currentAnchorId,
		visibleMessageIds: initial.visibleMessageIds,
	});

	$effect.pre(() => {
		const sync = () => {
			const next = visibilityStore.getSnapshot();
			snapshot.currentAnchorId = next.currentAnchorId;
			snapshot.visibleMessageIds = next.visibleMessageIds;
		};

		sync();
		return visibilityStore.subscribe(sync, observeVisibility, unobserveVisibility);
	});

	return snapshot;
}

export function usePendingDefaultScroll() {
	const { pendingDefaultScrollStore } = MessageScrollerProviderState.get();
	let pending = $state(pendingDefaultScrollStore.getSnapshot());

	$effect.pre(() => {
		const sync = () => {
			pending = pendingDefaultScrollStore.getSnapshot();
		};

		sync();
		return pendingDefaultScrollStore.subscribe(sync);
	});

	return {
		get current() {
			return pending;
		},
	};
}
