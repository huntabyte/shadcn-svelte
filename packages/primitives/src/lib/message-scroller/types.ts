import type { Snippet } from "svelte";
import type { WithChild, WithChildNoChildrenSnippetProps, Without } from "$lib/internal/types.js";
import type { PrimitiveButtonAttributes, PrimitiveDivAttributes } from "$lib/internal/attributes.js";

// Default scrollEdgeThreshold. Sub-pixel tolerance so edge detection does not
// flicker across engines that round scrollTop differently.
const DEFAULT_SCROLL_EDGE_THRESHOLD = 8;

// Default scrollPreviousItemPeek. Pixels of the previous item kept visible above
// a newly anchored row.
const DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK = 64;

// Default scrollMargin for scrollToMessage and programmatic targets.
const DEFAULT_SCROLL_MARGIN = 0;

// Two fractional scrollTop values within this range are treated as equal, to
// absorb zoom and HiDPI rounding drift.
const SCROLL_POSITION_EPSILON = 0.5;

// How long (ms) data-autoscrolling stays set during a programmatic smooth scroll
// before clearing.
const AUTOSCROLLING_CLEAR_DELAY = 180;

// Viewport keys that count as deliberate scroll intent and release follow-bottom.
const USER_SCROLL_KEYS = new Set([
	"ArrowDown",
	"ArrowUp",
	"End",
	"Home",
	"PageDown",
	"PageUp",
	" ", // Space key.
]);

// Internal scroll mode. Derived from intent and commands; decides how the
// viewport reacts to content and resize.
type MessageScrollerMode =
	| "following-bottom" // autoScroll on, pinned to the latest message.
	| "free-scrolling" // reader scrolled away; position left alone (prepends still preserved).
	| "anchored-to-message" // holding a turn at the reading line while it streams.
	| "settling-jump"; // a programmatic jump is animating; intent detection suppressed until it settles.

// Where a saved transcript opens on the first non-empty render.
type MessageScrollerDefaultScrollPosition = "start" | "end" | "last-anchor";

// Which transcript edge MessageScrollerButton scrolls toward.
type MessageScrollerButtonDirection = "start" | "end";

// Viewport alignment for scrollToMessage and programmatic jumps.
type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest";

// Options for scrollToMessage, scrollToEnd, and scrollToStart.
type MessageScrollerScrollOptions = {
	// Viewport edge or center to align the target to.
	align?: MessageScrollerScrollAlign;
	// Native scroll behavior.
	behavior?: ScrollBehavior;
	// Margin on the aligned edge, in pixels. Defaults to the provider scrollMargin.
	scrollMargin?: number;
};

// Scroll snapshot from useMessageScrollerScrollable: which edges the viewport can
// still scroll toward.
type MessageScrollerScrollable = {
	// The viewport can scroll toward the start (content is hidden above).
	start: boolean;
	// The viewport can scroll toward the end (content is hidden below).
	end: boolean;
};

// Visibility snapshot from useMessageScrollerVisibility.
type MessageScrollerVisibilityState = {
	// The anchored turn the reader is in, or null. Stays set after the anchor
	// scrolls above the viewport.
	currentAnchorId: string | null;
	// messageId values intersecting the viewport, in document order.
	visibleMessageIds: string[];
};

type MessageScrollerRef<T> = { current: T };

// Headless provider for a chat transcript scroller. Owns scroll behavior and
// state; renders no DOM.
type MessageScrollerProviderProps = {
	children?: Snippet;
	// Follow new content at the bottom while the viewport is already at the end.
	autoScroll?: boolean;
	// Opening position on the first non-empty render, applied once.
	defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
	// Distance from an edge that still counts as at-top/at-bottom. Defaults to 8.
	scrollEdgeThreshold?: number;
	// Extra top margin for a newly anchored row, added to scrollMargin. Defaults to 64.
	scrollPreviousItemPeek?: number;
	// Default margin on the aligned edge for commands and visibility. Defaults to 0.
	scrollMargin?: number;
};

type MessageScrollerRootPropsWithoutHTML = WithChild;
type MessageScrollerRootProps = MessageScrollerRootPropsWithoutHTML &
	Without<PrimitiveDivAttributes, MessageScrollerRootPropsWithoutHTML>;

type MessageScrollerViewportPropsWithoutHTML = WithChild<{
	// Keep the first visible messageId row stable on prepend. Defaults to true.
	preserveScrollOnPrepend?: boolean;
}>;
type MessageScrollerViewportProps = MessageScrollerViewportPropsWithoutHTML &
	Without<PrimitiveDivAttributes, MessageScrollerViewportPropsWithoutHTML>;

type MessageScrollerContentPropsWithoutHTML = WithChild<{
	// Class name for the internal tail spacer used when anchoring turns near the top.
	spacerClassName?: string;
}>;
type MessageScrollerContentProps = MessageScrollerContentPropsWithoutHTML &
	Without<PrimitiveDivAttributes, MessageScrollerContentPropsWithoutHTML>;

type MessageScrollerItemPropsWithoutHTML = WithChild<{
	// Stable row id for scrollToMessage, visibility, and prepend preservation.
	messageId?: string;
	// Marks a turn boundary that newly appended anchors and last-anchor restore use.
	scrollAnchor?: boolean;
}>;
type MessageScrollerItemProps = MessageScrollerItemPropsWithoutHTML &
	Without<PrimitiveDivAttributes, MessageScrollerItemPropsWithoutHTML>;

// State passed to MessageScrollerButton's child snippet.
type MessageScrollerButtonRenderState = {
	// Whether overflow exists toward this button's direction.
	active: boolean;
	direction: MessageScrollerButtonDirection;
};

type MessageScrollerButtonPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		// Native scroll behavior when clicked. Defaults to "smooth".
		behavior?: ScrollBehavior;
		// Transcript edge to scroll toward. Defaults to "end".
		direction?: MessageScrollerButtonDirection;
	},
	MessageScrollerButtonRenderState
>;
type MessageScrollerButtonProps = MessageScrollerButtonPropsWithoutHTML &
	Without<PrimitiveButtonAttributes, MessageScrollerButtonPropsWithoutHTML>;

// Minimal external store backing useMessageScrollerScrollable.
type MessageScrollerStore<T> = {
	getSnapshot: () => T;
	setSnapshot: (nextSnapshot: T) => void;
	subscribe: (listener: () => void) => () => void;
};

// External store backing useMessageScrollerVisibility. Adds reference-counting so
// tracking stays lazy.
type MessageScrollerVisibilityStore = {
	getSnapshot: () => MessageScrollerVisibilityState;
	hasListeners: () => boolean;
	setSnapshot: (nextSnapshot: MessageScrollerVisibilityState) => void;
	subscribe: (
		listener: () => void,
		onFirstSubscribe: () => void,
		onLastUnsubscribe: () => void
	) => () => void;
};

// Registers (or, with removedElement, unregisters) a MessageScrollerItem node by
// messageId.
type MessageScrollerRegisterMessage = (
	messageId: string,
	element: HTMLElement | null,
	removedElement?: HTMLElement | null
) => void;

type MessageScrollerContextValue = {
	handleContentChange: () => void;
	handleResize: () => void;
	observeVisibility: () => void;
	preserveScrollOnPrependRef: MessageScrollerRef<boolean>;
	scrollToEnd: (options?: MessageScrollerScrollOptions) => boolean;
	scrollToMessage: (messageId: string, options?: MessageScrollerScrollOptions) => boolean;
	scrollToStart: (options?: MessageScrollerScrollOptions) => boolean;
	setContentElement: (element: HTMLDivElement | null) => void;
	setRootElement: (element: HTMLDivElement | null) => void;
	setSpacerElement: (element: HTMLDivElement | null) => void;
	setViewportElement: (element: HTMLDivElement | null) => void;
	pendingDefaultScrollStore: MessageScrollerStore<boolean>;
	stateStore: MessageScrollerStore<MessageScrollerScrollable>;
	syncAfterScroll: () => void;
	unobserveVisibility: () => void;
	userScrollIntent: () => void;
	viewportRef: MessageScrollerRef<HTMLDivElement | null>;
	visibilityStore: MessageScrollerVisibilityStore;
};

// Initial MessageScrollerScrollable before measurement. Stable reference for the
// server and first-render snapshot.
const EMPTY_MESSAGE_SCROLLER_SCROLLABLE: MessageScrollerScrollable = {
	start: false,
	end: false,
};

// Shared empty array so empty visibility snapshots stay referentially stable.
const EMPTY_VISIBLE_MESSAGE_IDS: string[] = [];

// Initial MessageScrollerVisibilityState. Nothing tracked, no current anchor.
const EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE: MessageScrollerVisibilityState = {
	currentAnchorId: null,
	visibleMessageIds: EMPTY_VISIBLE_MESSAGE_IDS,
};

export {
	AUTOSCROLLING_CLEAR_DELAY,
	DEFAULT_SCROLL_EDGE_THRESHOLD,
	DEFAULT_SCROLL_MARGIN,
	DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
	EMPTY_MESSAGE_SCROLLER_SCROLLABLE,
	EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE,
	EMPTY_VISIBLE_MESSAGE_IDS,
	SCROLL_POSITION_EPSILON,
	USER_SCROLL_KEYS,
};

export type {
	MessageScrollerButtonDirection,
	MessageScrollerButtonProps,
	MessageScrollerButtonRenderState,
	MessageScrollerContentProps,
	MessageScrollerContextValue,
	MessageScrollerDefaultScrollPosition,
	MessageScrollerItemProps,
	MessageScrollerMode,
	MessageScrollerProviderProps,
	MessageScrollerRef,
	MessageScrollerRegisterMessage,
	MessageScrollerRootProps,
	MessageScrollerScrollAlign,
	MessageScrollerScrollOptions,
	MessageScrollerScrollable,
	MessageScrollerStore,
	MessageScrollerViewportProps,
	MessageScrollerVisibilityState,
	MessageScrollerVisibilityStore,
};
