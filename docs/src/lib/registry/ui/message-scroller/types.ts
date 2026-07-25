export const DEFAULT_SCROLL_EDGE_THRESHOLD = 8;
export const DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK = 64;
export const DEFAULT_SCROLL_MARGIN = 0;
export const SCROLL_POSITION_EPSILON = 0.5;
export const AUTOSCROLLING_CLEAR_DELAY = 180;

export const USER_SCROLL_KEYS = new Set([
	"ArrowDown",
	"ArrowUp",
	"End",
	"Home",
	"PageDown",
	"PageUp",
	" ",
]);

export type MessageScrollerMode =
	| "following-bottom"
	| "free-scrolling"
	| "anchored-to-message"
	| "settling-jump";

export type MessageScrollerDefaultScrollPosition = "start" | "end" | "last-anchor";
export type MessageScrollerButtonDirection = "start" | "end";
export type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest";

export type MessageScrollerScrollOptions = {
	align?: MessageScrollerScrollAlign;
	behavior?: ScrollBehavior;
	scrollMargin?: number;
};

export type MessageScrollerScrollable = {
	start: boolean;
	end: boolean;
};

export type MessageScrollerVisibilityState = {
	currentAnchorId: string | null;
	visibleMessageIds: string[];
};

export type MessageScrollerProviderProps = {
	autoScroll?: boolean;
	defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
	scrollEdgeThreshold?: number;
	scrollPreviousItemPeek?: number;
	scrollMargin?: number;
};

export const EMPTY_MESSAGE_SCROLLER_SCROLLABLE: MessageScrollerScrollable = {
	start: false,
	end: false,
};

export const EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE: MessageScrollerVisibilityState = {
	currentAnchorId: null,
	visibleMessageIds: [],
};
