import type {
	MessageScrollerDefaultScrollPosition,
	MessageScrollerScrollOptions,
	MessageScrollerScrollable,
	MessageScrollerVisibilityState,
} from "./types.js";

export type TestMessage = {
	height?: number;
	id: string;
	key?: string;
	registerMessage?: boolean;
	role?: string;
	scrollAnchor?: boolean;
};

export type TestScrollerOptions = {
	autoScroll?: boolean;
	contentAriaBusy?: boolean | "true" | "false";
	contentAriaRelevant?: string;
	contentPaddingEnd?: number;
	contentPaddingStart?: number;
	contentRole?: string;
	defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
	messages: TestMessage[];
	observeVisibility?: boolean;
	preserveScrollOnPrepend?: boolean;
	restoreMessageId?: string;
	restoreMessageOptions?: MessageScrollerScrollOptions;
	scrollMargin?: number;
};

export type TestScrollerApi = {
	scrollToEnd: (options?: MessageScrollerScrollOptions) => boolean;
	scrollToMessage: (messageId: string, options?: MessageScrollerScrollOptions) => boolean;
	scrollToStart: (options?: MessageScrollerScrollOptions) => boolean;
};

export type TestRef<T> = { current: T | null };

export type TestScrollerRefs = {
	apiRef: TestRef<TestScrollerApi>;
	stateRef: TestRef<MessageScrollerScrollable>;
	stateRenderCountRef: TestRef<number>;
	visibilityRef: TestRef<MessageScrollerVisibilityState>;
};

export type PendingScrollTreeProps = {
	defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
	items?: string[];
	scrollAnchor?: boolean;
	suppressHydrationWarning?: boolean;
	testIds?: boolean;
};
