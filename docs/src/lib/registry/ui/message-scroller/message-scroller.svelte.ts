import { getContext } from "svelte";
import { SvelteMap } from "svelte/reactivity";

export type ScrollDirection = "start" | "end";
export type MessageScrollerDefaultScrollPosition = "start" | "end" | "last-anchor";
export type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest";
export type MessageScrollerScrollOptions = {
	align?: MessageScrollerScrollAlign;
	behavior?: ScrollBehavior;
	scrollMargin?: number;
};
export type MessageScrollerScrollable = { start: boolean; end: boolean };
export type MessageScrollerVisibilityState = {
	currentAnchorId: string | null;
	visibleMessageIds: string[];
};
export type MessageScrollerVisibility = MessageScrollerVisibilityState;

type Mode = "following-bottom" | "free-scrolling" | "anchored-to-message" | "settling-jump";
type PrependAnchor = { element: HTMLElement; viewportTop: number };
type PendingScroll = { messageId: string; options?: MessageScrollerScrollOptions };

const POSITION_EPSILON = 0.5;
const AUTOSCROLLING_CLEAR_DELAY = 180;
export const MESSAGE_SCROLLER_USER_SCROLL_KEYS: readonly string[] = [
	"ArrowDown",
	"ArrowUp",
	"End",
	"Home",
	"PageDown",
	"PageUp",
	" ",
];

export class MessageScrollerController {
	viewport: HTMLElement | null = null;
	content: HTMLElement | null = null;
	root: HTMLElement | null = null;
	spacer: HTMLElement | null = null;
	items = new SvelteMap<string, HTMLElement>();

	scrollable = $state<MessageScrollerScrollable>({ start: false, end: false });
	visibility = $state<MessageScrollerVisibilityState>({
		currentAnchorId: null,
		visibleMessageIds: [],
	});
	autoscrolling = $state(false);

	autoScroll = false;
	defaultScrollPosition: MessageScrollerDefaultScrollPosition = "end";
	scrollEdgeThreshold = 8;
	scrollPreviousItemPeek = 64;
	scrollMargin = 0;
	preserveScrollOnPrepend = true;

	private mode: Mode = "free-scrolling";
	private defaultApplied = false;
	private itemCount = 0;
	private firstItem: HTMLElement | null = null;
	private lastScrollTop = 0;
	private streamingTurn: HTMLElement | null = null;
	private prependAnchor: PrependAnchor | null = null;
	private pendingScroll: PendingScroll | null = null;
	private handledAnchors = new WeakSet<HTMLElement>();
	private spacerGap = 0;
	private spacerHeight = 0;
	private stateFrame: number | null = null;
	private visibilityFrame: number | null = null;
	private pendingScrollFrame: number | null = null;
	private autoscrollingTimeout: number | null = null;

	configure(options: {
		autoScroll?: boolean;
		defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
		scrollEdgeThreshold?: number;
		scrollPreviousItemPeek?: number;
		scrollMargin?: number;
	}) {
		const nextDefault = options.defaultScrollPosition ?? "end";
		if (this.defaultScrollPosition !== nextDefault) this.defaultApplied = false;
		this.defaultScrollPosition = nextDefault;
		this.autoScroll = options.autoScroll ?? false;
		this.scrollEdgeThreshold = options.scrollEdgeThreshold ?? 8;
		this.scrollPreviousItemPeek = options.scrollPreviousItemPeek ?? 64;
		this.scrollMargin = options.scrollMargin ?? 0;

		if (!this.autoScroll && this.mode === "following-bottom") {
			this.mode = "free-scrolling";
		}
		this.commitScrollState();
	}

	setRoot(element: HTMLElement | null) {
		this.root = element;
		this.writeStateAttributes();
	}

	setViewport(element: HTMLElement | null) {
		this.viewport = element;
		this.lastScrollTop = element?.scrollTop ?? 0;
		this.writeStateAttributes();
		if (element) {
			this.scheduleStateCommit();
			this.scheduleVisibilitySync();
		}
	}

	setContent(element: HTMLElement | null) {
		this.content = element;
	}

	setSpacer(element: HTMLElement | null) {
		this.spacer = element;
		this.spacerGap = this.getFlexGap(element?.parentElement ?? null);
	}

	registerItem(
		messageId: string,
		element: HTMLElement | null,
		removedElement?: HTMLElement | null
	) {
		if (element) {
			this.items.set(messageId, element);
			this.scheduleVisibilitySync();
			if (this.pendingScroll?.messageId === messageId && this.pendingScrollFrame === null) {
				this.pendingScrollFrame = window.requestAnimationFrame(() => {
					this.pendingScrollFrame = null;
					if (this.flushPendingScroll()) this.capturePrependAnchor();
				});
			}
			return;
		}
		if (removedElement && this.items.get(messageId) === removedElement) {
			this.items.delete(messageId);
			this.scheduleVisibilitySync();
		}
	}

	handleContentChange() {
		const content = this.content;
		if (!content) return;

		const items = this.getItems();
		const previousCount = this.itemCount;
		const previousFirst = this.firstItem;
		this.itemCount = items.length;
		this.firstItem = items[0] ?? null;

		if (this.flushPendingScroll()) {
			this.capturePrependAnchor();
			return;
		}

		if (previousCount === 0) {
			if (!this.applyDefaultScrollPosition() && items.length > 0 && this.autoScroll) {
				this.scrollToEnd({ behavior: "auto" });
			} else {
				this.commitScrollState();
				this.scheduleVisibilitySync();
			}
			this.capturePrependAnchor();
			return;
		}

		const previousFirstIndex = previousFirst ? items.indexOf(previousFirst) : -1;
		if (this.preserveScrollOnPrepend && previousFirstIndex > 0) {
			this.restorePrependedAnchor();
			this.capturePrependAnchor();
			return;
		}

		if (items.length > previousCount) {
			const newAnchors = items
				.slice(previousCount)
				.filter((item) => item.dataset.scrollAnchor === "true");
			const anchor = newAnchors[0];
			if (anchor) {
				if (this.autoScroll && this.mode === "following-bottom" && newAnchors.length > 1) {
					this.scrollToEnd({ behavior: "auto" });
				} else {
					this.scrollToElement(anchor, { align: "start" }, true);
					this.handledAnchors.add(anchor);
				}
				this.capturePrependAnchor();
				return;
			}
		}

		if (items.length === previousCount) {
			const anchor = items.find(
				(item) => item.dataset.scrollAnchor === "true" && !this.handledAnchors.has(item)
			);
			if (anchor) {
				this.scrollToElement(anchor, { align: "start" }, true);
				this.handledAnchors.add(anchor);
				this.capturePrependAnchor();
				return;
			}
		}

		if (this.mode === "following-bottom" && this.autoScroll) {
			this.scrollToEnd({ behavior: "auto" });
		} else {
			this.commitScrollState();
			this.scheduleVisibilitySync();
		}
		this.capturePrependAnchor();
	}

	handleResize() {
		if (this.mode === "following-bottom" && this.autoScroll) {
			this.scrollToEnd({ behavior: "auto" });
			return;
		}

		const previousSpacerHeight = this.spacerHeight;
		if (this.reanchorToStreamingTurn()) {
			if (this.autoScroll && previousSpacerHeight > 0 && this.spacerHeight === 0) {
				this.scrollToEnd({ behavior: "auto" });
			}
			return;
		}
		this.scheduleStateCommit();
		this.scheduleVisibilitySync();
	}

	syncAfterScroll() {
		this.commitScrollState();
		this.scheduleVisibilitySync();
		this.capturePrependAnchor();
	}

	userScrollIntent() {
		if (this.mode !== "free-scrolling") {
			this.streamingTurn = null;
			this.mode = "free-scrolling";
		}
	}

	scrollToStart(options: MessageScrollerScrollOptions = {}) {
		if (!this.viewport) return false;
		this.setTailSpacerHeight(0);
		this.streamingTurn = null;
		this.mode = "free-scrolling";
		this.scrollToPosition(0, options.behavior ?? "auto");
		this.scheduleVisibilitySync();
		return true;
	}

	scrollToEnd(options: MessageScrollerScrollOptions = {}) {
		const viewport = this.viewport;
		if (!viewport) return false;
		this.setTailSpacerHeight(0);
		this.streamingTurn = null;
		this.mode = this.autoScroll ? "following-bottom" : "free-scrolling";
		this.scrollToPosition(
			Math.max(0, viewport.scrollHeight - viewport.clientHeight),
			options.behavior ?? "auto",
			true
		);
		this.scheduleVisibilitySync();
		return true;
	}

	scrollToMessage(messageId: string, options?: MessageScrollerScrollOptions) {
		const element = this.items.get(messageId);
		if (!element) {
			if (this.itemCount === 0) {
				this.pendingScroll = { messageId, options };
				this.defaultApplied = true;
				return true;
			}
			return false;
		}
		this.defaultApplied = true;
		if (this.scrollToElement(element, options)) {
			this.pendingScroll = null;
			return true;
		}
		this.pendingScroll = { messageId, options };
		return true;
	}

	destroy() {
		if (this.stateFrame !== null) window.cancelAnimationFrame(this.stateFrame);
		if (this.visibilityFrame !== null) window.cancelAnimationFrame(this.visibilityFrame);
		if (this.pendingScrollFrame !== null) window.cancelAnimationFrame(this.pendingScrollFrame);
		if (this.autoscrollingTimeout !== null) window.clearTimeout(this.autoscrollingTimeout);
	}

	private applyDefaultScrollPosition() {
		if (this.defaultApplied || this.itemCount === 0) return false;
		let handled: boolean;
		if (this.defaultScrollPosition === "last-anchor") {
			const anchor = this.getItems()
				.filter((item) => item.dataset.scrollAnchor === "true")
				.at(-1);
			if (!anchor || !this.viewport || !this.content) {
				handled = this.scrollToEnd({ behavior: "auto" });
			} else {
				const lastTurnFits =
					this.getContentBottom() - this.getElementTop(anchor) <= this.viewport.clientHeight;
				handled = lastTurnFits
					? this.scrollToEnd({ behavior: "auto" })
					: this.scrollToElement(anchor, { align: "start" }, true);
			}
		} else {
			handled =
				this.defaultScrollPosition === "start"
					? this.scrollToStart({ behavior: "auto" })
					: this.scrollToEnd({ behavior: "auto" });
		}
		if (handled) this.defaultApplied = true;
		return handled;
	}

	private flushPendingScroll() {
		const pending = this.pendingScroll;
		if (!pending) return false;
		const element = this.items.get(pending.messageId);
		if (!element || !this.scrollToElement(element, pending.options)) return false;
		this.pendingScroll = null;
		this.defaultApplied = true;
		return true;
	}

	private scrollToElement(
		element: HTMLElement,
		options: MessageScrollerScrollOptions = {},
		keepPreviousPeek = false
	) {
		const viewport = this.viewport;
		const content = this.content;
		if (!viewport || !content || !content.contains(element)) return false;

		const align = options.align ?? "start";
		const margin =
			(options.scrollMargin ?? this.scrollMargin) +
			(keepPreviousPeek ? this.scrollPreviousItemPeek : 0);
		const scrollTop = this.getElementScrollTop(element, align, margin);
		this.setTailSpacerHeight(scrollTop + viewport.clientHeight - this.getContentBottom());
		this.prependAnchor = { element, viewportTop: this.getElementViewportTop(element) };
		this.mode = keepPreviousPeek ? "anchored-to-message" : "settling-jump";
		this.streamingTurn = keepPreviousPeek ? element : null;
		this.scrollToPosition(scrollTop, options.behavior ?? "auto");
		this.scheduleVisibilitySync();
		return true;
	}

	private reanchorToStreamingTurn() {
		const element = this.streamingTurn;
		if (!element?.isConnected || this.mode !== "anchored-to-message") return false;
		return this.scrollToElement(element, { align: "start" }, true);
	}

	private scrollToPosition(scrollTop: number, behavior: ScrollBehavior, autoscrolling = false) {
		const viewport = this.viewport;
		if (!viewport) return;
		const next = Math.max(0, scrollTop);
		if (Math.abs(viewport.scrollTop - next) <= POSITION_EPSILON) {
			viewport.scrollTop = next;
			this.commitScrollState();
			return;
		}
		if (autoscrolling) this.setAutoscrolling(true);
		viewport.scrollTo({ top: next, behavior });
		this.scheduleStateCommit();
	}

	private setAutoscrolling(value: boolean) {
		if (this.autoscrollingTimeout !== null) window.clearTimeout(this.autoscrollingTimeout);
		this.autoscrolling = value;
		this.writeStateAttributes();
		if (value) {
			this.autoscrollingTimeout = window.setTimeout(() => {
				this.autoscrollingTimeout = null;
				this.autoscrolling = false;
				this.commitScrollState();
			}, AUTOSCROLLING_CLEAR_DELAY);
		}
	}

	private setTailSpacerHeight(height: number) {
		if (!this.spacer) return;
		const next = Math.max(0, Math.ceil(height));
		if (next === this.spacerHeight) return;
		this.spacerHeight = next;
		this.spacer.hidden = next === 0;
		this.spacer.style.height = `${next}px`;
		this.spacer.style.marginTop = next > 0 ? `${-this.spacerGap}px` : "";
	}

	private commitScrollState() {
		const viewport = this.viewport;
		const content = this.content;
		if (!viewport || !content) {
			this.updateScrollable(false, false);
			return;
		}
		const start = viewport.scrollTop > this.scrollEdgeThreshold;
		const end =
			this.getContentBottom() - viewport.scrollTop - viewport.clientHeight >
			this.scrollEdgeThreshold;
		const scrolledUp = viewport.scrollTop < this.lastScrollTop - POSITION_EPSILON;
		this.lastScrollTop = viewport.scrollTop;

		if (
			this.autoScroll &&
			!end &&
			this.mode !== "settling-jump" &&
			this.mode !== "anchored-to-message"
		) {
			this.mode = "following-bottom";
		} else if (this.mode === "following-bottom" && end && scrolledUp && !this.autoscrolling) {
			this.mode = "free-scrolling";
		}
		this.updateScrollable(start, this.mode === "following-bottom" ? false : end);
	}

	private updateScrollable(start: boolean, end: boolean) {
		if (this.scrollable.start !== start) this.scrollable.start = start;
		if (this.scrollable.end !== end) this.scrollable.end = end;
		this.writeStateAttributes();
	}

	private writeStateAttributes() {
		const scrollable = [this.scrollable.start && "start", this.scrollable.end && "end"]
			.filter(Boolean)
			.join(" ");
		for (const element of [this.root, this.viewport]) {
			if (!element) continue;
			if (scrollable) element.setAttribute("data-scrollable", scrollable);
			else element.removeAttribute("data-scrollable");
			element.toggleAttribute("data-autoscrolling", this.autoscrolling);
		}
	}

	private scheduleStateCommit() {
		if (this.stateFrame !== null) return;
		this.stateFrame = window.requestAnimationFrame(() => {
			this.stateFrame = null;
			this.commitScrollState();
		});
	}

	private scheduleVisibilitySync() {
		if (this.visibilityFrame !== null) return;
		this.visibilityFrame = window.requestAnimationFrame(() => {
			this.visibilityFrame = null;
			this.syncVisibility();
		});
	}

	private syncVisibility() {
		const viewport = this.viewport;
		if (!viewport) return;
		const viewportRect = viewport.getBoundingClientRect();
		const lineTop = viewportRect.top + this.scrollMargin + this.scrollPreviousItemPeek;
		const visible: string[] = [];
		let currentAnchorId: string | null = null;
		for (const item of this.getItems()) {
			const messageId = item.dataset.messageId;
			if (!messageId) continue;
			const rect = item.getBoundingClientRect();
			if (rect.bottom > lineTop && rect.top < viewportRect.bottom) visible.push(messageId);
			if (item.dataset.scrollAnchor === "true" && rect.top <= lineTop + POSITION_EPSILON) {
				currentAnchorId = messageId;
			}
		}
		if (this.visibility.currentAnchorId !== currentAnchorId) {
			this.visibility.currentAnchorId = currentAnchorId;
		}
		if (
			this.visibility.visibleMessageIds.length !== visible.length ||
			this.visibility.visibleMessageIds.some((id, index) => id !== visible[index])
		) {
			this.visibility.visibleMessageIds = visible;
		}
	}

	private capturePrependAnchor() {
		const viewport = this.viewport;
		if (!viewport) {
			this.prependAnchor = null;
			return;
		}
		const bounds = viewport.getBoundingClientRect();
		const element = this.getItems().find((item) => {
			if (!item.dataset.messageId) return false;
			const rect = item.getBoundingClientRect();
			return rect.bottom > bounds.top && rect.top < bounds.bottom;
		});
		this.prependAnchor = element
			? { element, viewportTop: this.getElementViewportTop(element) }
			: null;
	}

	private restorePrependedAnchor() {
		const viewport = this.viewport;
		const anchor = this.prependAnchor;
		if (!viewport || !anchor?.element.isConnected) return false;
		const nextTop = this.getElementViewportTop(anchor.element);
		const delta = nextTop - anchor.viewportTop;
		if (Math.abs(delta) <= POSITION_EPSILON) return false;
		viewport.scrollTop += delta;
		anchor.viewportTop = this.getElementViewportTop(anchor.element);
		this.scheduleStateCommit();
		this.scheduleVisibilitySync();
		return true;
	}

	private getItems() {
		if (!this.content) return [];
		return Array.from(this.content.children).filter(
			(child): child is HTMLElement => child instanceof HTMLElement && child !== this.spacer
		);
	}

	private getContentBottom() {
		const content = this.content;
		const viewport = this.viewport;
		if (!content || !viewport) return 0;
		const style = window.getComputedStyle(content);
		const paddingStart = this.readPixel(style.paddingBlockStart || style.paddingTop);
		const paddingEnd = this.readPixel(style.paddingBlockEnd || style.paddingBottom);
		const viewportRect = viewport.getBoundingClientRect();
		let bottom = paddingStart + paddingEnd;
		for (const item of this.getItems()) {
			bottom = Math.max(
				bottom,
				item.getBoundingClientRect().bottom - viewportRect.top + viewport.scrollTop + paddingEnd
			);
		}
		return bottom;
	}

	private getElementScrollTop(
		element: HTMLElement,
		align: MessageScrollerScrollAlign,
		margin: number
	) {
		const viewport = this.viewport!;
		const top = this.getElementTop(element);
		const height = element.getBoundingClientRect().height;
		const content = this.content;
		const style = content ? window.getComputedStyle(content) : null;
		const paddingStart = this.readPixel(style?.paddingBlockStart || style?.paddingTop);
		const paddingEnd = this.readPixel(style?.paddingBlockEnd || style?.paddingBottom);
		if (align === "center") {
			const availableHeight = Math.max(
				0,
				viewport.clientHeight - paddingStart - paddingEnd - height
			);
			return top - paddingStart - availableHeight / 2 - margin;
		}
		if (align === "end") return top - viewport.clientHeight + height + paddingEnd + margin;
		if (align === "nearest") {
			const bottom = top + height;
			const viewportTop = viewport.scrollTop + paddingStart;
			const viewportBottom = viewport.scrollTop + viewport.clientHeight - paddingEnd;
			if (top >= viewportTop && bottom <= viewportBottom) return viewport.scrollTop;
			return top < viewportTop
				? top - paddingStart - margin
				: bottom - viewport.clientHeight + paddingEnd + margin;
		}
		return top - paddingStart - margin;
	}

	private getElementTop(element: HTMLElement) {
		const viewport = this.viewport!;
		return (
			element.getBoundingClientRect().top -
			viewport.getBoundingClientRect().top +
			viewport.scrollTop
		);
	}

	private getElementViewportTop(element: HTMLElement) {
		return element.getBoundingClientRect().top - this.viewport!.getBoundingClientRect().top;
	}

	private getFlexGap(element: HTMLElement | null) {
		if (!element) return 0;
		const style = window.getComputedStyle(element);
		return this.readPixel(style.rowGap === "normal" ? style.gap : style.rowGap);
	}

	private readPixel(value?: string) {
		const number = Number.parseFloat(value ?? "");
		return Number.isFinite(number) ? number : 0;
	}
}

export type MessageScrollerContext = MessageScrollerController;
export const MESSAGE_SCROLLER_CONTEXT = Symbol("shadcn-svelte.message-scroller");

export function useMessageScrollerController(): MessageScrollerController {
	const context = getContext<MessageScrollerController>(MESSAGE_SCROLLER_CONTEXT);
	if (!context) throw new Error("useMessageScroller must be used within MessageScroller.Provider.");
	return context;
}

export function useMessageScroller() {
	const context = useMessageScrollerController();
	return {
		scrollToStart: (options?: MessageScrollerScrollOptions) => context.scrollToStart(options),
		scrollToEnd: (options?: MessageScrollerScrollOptions) => context.scrollToEnd(options),
		scrollToMessage: (messageId: string, options?: MessageScrollerScrollOptions) =>
			context.scrollToMessage(messageId, options),
	};
}

export function useMessageScrollerScrollable() {
	const context = useMessageScrollerController();
	return {
		get start() {
			return context.scrollable.start;
		},
		get end() {
			return context.scrollable.end;
		},
	};
}

export function useMessageScrollerVisibility() {
	const context = useMessageScrollerController();
	return {
		get visibleMessageIds() {
			return context.visibility.visibleMessageIds;
		},
		get currentAnchorId() {
			return context.visibility.currentAnchorId;
		},
	};
}
