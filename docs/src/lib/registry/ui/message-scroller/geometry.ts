import {
	EMPTY_MESSAGE_SCROLLER_SCROLLABLE,
	EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE,
	SCROLL_POSITION_EPSILON,
} from "./types.js";
import type {
	MessageScrollerScrollAlign,
	MessageScrollerScrollable,
	MessageScrollerVisibilityState,
} from "./types.js";

export function getMessageScrollerScrollable({
	content,
	scrollEdgeThreshold,
	spacer,
	viewport,
}: {
	content: HTMLElement | null;
	scrollEdgeThreshold: number;
	spacer: HTMLElement | null;
	viewport: HTMLElement | null;
}): MessageScrollerScrollable {
	if (!viewport || !content) return EMPTY_MESSAGE_SCROLLER_SCROLLABLE;

	const contentBottom = getContentBottom({ content, spacer, viewport });

	return {
		start: viewport.scrollTop > scrollEdgeThreshold,
		end: contentBottom - viewport.scrollTop - viewport.clientHeight > scrollEdgeThreshold,
	};
}

export function getMessageScrollerVisibilityState({
	content,
	scrollMargin,
	scrollPreviousItemPeek,
	spacer,
	viewport,
	visibleMessageIds,
}: {
	content: HTMLElement | null;
	scrollMargin: number;
	scrollPreviousItemPeek: number;
	spacer: HTMLElement | null;
	viewport: HTMLElement | null;
	visibleMessageIds: Set<string>;
}): MessageScrollerVisibilityState {
	if (!content || !viewport) return EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE;

	const viewportBounds = viewport.getBoundingClientRect();
	const readingLine = viewportBounds.top + scrollMargin + scrollPreviousItemPeek;
	const tracksByLayout = typeof IntersectionObserver === "undefined";
	const visibleMessageIdsInDocumentOrder: string[] = [];
	let currentAnchorId: string | null = null;

	for (const item of getMessageScrollerItems(content, spacer)) {
		const messageId = item.dataset.messageId;
		if (!messageId) continue;

		const isAnchor = item.dataset.scrollAnchor === "true";
		const itemBounds = isAnchor || tracksByLayout ? item.getBoundingClientRect() : null;
		const isVisible =
			tracksByLayout && itemBounds
				? itemBounds.bottom > readingLine && itemBounds.top < viewportBounds.bottom
				: visibleMessageIds.has(messageId);

		if (isVisible) visibleMessageIdsInDocumentOrder.push(messageId);
		if (isAnchor && itemBounds && itemBounds.top <= readingLine + SCROLL_POSITION_EPSILON) {
			currentAnchorId = messageId;
		}
	}

	if (visibleMessageIdsInDocumentOrder.length === 0 && currentAnchorId === null) {
		return EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE;
	}

	return {
		currentAnchorId,
		visibleMessageIds: visibleMessageIdsInDocumentOrder,
	};
}

export function getMessageScrollerItems(content: HTMLElement, spacer: HTMLElement | null) {
	return Array.from(content.children).filter(
		(child): child is HTMLElement => child instanceof HTMLElement && child !== spacer
	);
}

export function getNewScrollAnchor(items: HTMLElement[], previousItemCount: number) {
	for (let index = previousItemCount; index < items.length; index++) {
		const item = items[index];
		if (item?.dataset.scrollAnchor === "true") return item;
	}

	return null;
}

export function getUnanchoredScrollAnchor(
	items: HTMLElement[],
	handledAnchors: { has(element: HTMLElement): boolean }
) {
	return (
		items.find((item) => item.dataset.scrollAnchor === "true" && !handledAnchors.has(item)) ??
		null
	);
}

export function hasMultipleNewScrollAnchors(items: HTMLElement[], previousItemCount: number) {
	let anchorCount = 0;

	for (let index = previousItemCount; index < items.length; index++) {
		if (items[index]?.dataset.scrollAnchor !== "true") continue;
		anchorCount += 1;
		if (anchorCount > 1) return true;
	}

	return false;
}

export function getLastScrollAnchor(items: HTMLElement[]) {
	return items.findLast((item) => item.dataset.scrollAnchor === "true") ?? null;
}

export function getFirstVisibleMessageItem({
	content,
	spacer,
	viewport,
}: {
	content: HTMLElement;
	spacer: HTMLElement | null;
	viewport: HTMLElement;
}) {
	const viewportBounds = viewport.getBoundingClientRect();

	return (
		getMessageScrollerItems(content, spacer).find((item) => {
			if (!item.dataset.messageId) return false;
			const itemBounds = item.getBoundingClientRect();
			return itemBounds.bottom > viewportBounds.top && itemBounds.top < viewportBounds.bottom;
		}) ?? null
	);
}

export function getElementScrollTop({
	align,
	element,
	scrollMargin,
	spacer,
	viewport,
}: {
	align: MessageScrollerScrollAlign;
	element: HTMLElement;
	scrollMargin: number;
	spacer: HTMLElement | null;
	viewport: HTMLElement;
}) {
	const elementTop = getElementTop(element, viewport);
	const elementHeight = element.getBoundingClientRect().height;
	const contentPadding = getContentBlockPadding(spacer);

	if (align === "center") {
		const visibleHeight = Math.max(
			0,
			viewport.clientHeight - contentPadding.start - contentPadding.end
		);
		return (
			elementTop - contentPadding.start - (visibleHeight - elementHeight) / 2 - scrollMargin
		);
	}

	if (align === "end") {
		return (
			elementTop - viewport.clientHeight + elementHeight + contentPadding.end + scrollMargin
		);
	}

	if (align !== "nearest") return elementTop - contentPadding.start - scrollMargin;

	const elementBottom = elementTop + elementHeight;
	const viewportTop = viewport.scrollTop + contentPadding.start;
	const viewportBottom = viewport.scrollTop + viewport.clientHeight - contentPadding.end;

	if (elementTop >= viewportTop && elementBottom <= viewportBottom) return viewport.scrollTop;
	if (elementTop < viewportTop) return elementTop - contentPadding.start - scrollMargin;

	return elementBottom - viewport.clientHeight + contentPadding.end + scrollMargin;
}

export function getElementViewportTop(element: HTMLElement, viewport: HTMLElement) {
	return element.getBoundingClientRect().top - viewport.getBoundingClientRect().top;
}

export function getTailSpacerHeight({
	content,
	scrollTop,
	spacer,
	viewport,
}: {
	content: HTMLElement;
	scrollTop: number;
	spacer: HTMLElement | null;
	viewport: HTMLElement;
}) {
	return scrollTop + viewport.clientHeight - getContentBottom({ content, spacer, viewport });
}

export function getMaxScrollTop(viewport: HTMLElement) {
	return Math.max(0, viewport.scrollHeight - viewport.clientHeight);
}

export function getFlexGap(element: HTMLElement | null) {
	if (!element) return 0;

	const computedStyle = window.getComputedStyle(element);
	const gap = computedStyle.rowGap === "normal" ? computedStyle.gap : computedStyle.rowGap;
	return readCSSPixel(gap);
}

export function getElementTop(element: HTMLElement, viewport: HTMLElement) {
	const elementBounds = element.getBoundingClientRect();
	const viewportBounds = viewport.getBoundingClientRect();
	return elementBounds.top - viewportBounds.top + viewport.scrollTop;
}

export function getContentBottom({
	content,
	spacer,
	viewport,
}: {
	content: HTMLElement;
	spacer: HTMLElement | null;
	viewport: HTMLElement;
}) {
	const contentPadding = getBlockPadding(content);
	const viewportBounds = viewport.getBoundingClientRect();
	let contentBottom = contentPadding.start + contentPadding.end;

	for (const item of getMessageScrollerItems(content, spacer)) {
		const itemBounds = item.getBoundingClientRect();
		contentBottom = Math.max(
			contentBottom,
			itemBounds.bottom - viewportBounds.top + viewport.scrollTop + contentPadding.end
		);
	}

	return contentBottom;
}

function getContentBlockPadding(spacer: HTMLElement | null) {
	const content = spacer?.parentElement;
	return content ? getBlockPadding(content) : { end: 0, start: 0 };
}

function getBlockPadding(element: HTMLElement) {
	const computedStyle = window.getComputedStyle(element);
	return {
		end: readCSSPixel(computedStyle.paddingBlockEnd || computedStyle.paddingBottom),
		start: readCSSPixel(computedStyle.paddingBlockStart || computedStyle.paddingTop),
	};
}

function readCSSPixel(value: string | undefined) {
	if (!value) return 0;

	const pixelValue = Number.parseFloat(value);
	return Number.isFinite(pixelValue) ? pixelValue : 0;
}
