import { flushSync, mount, unmount } from "svelte";
import { afterEach, expect, test } from "vitest";

import BrowserHost, {
	type ThreadProps,
} from "./message-scroller-browser-host.svelte";
import MemoTree from "./message-scroller-browser-memo-tree.svelte";

const ITEM_HEIGHT = 80;

let app: Record<string, unknown> | null = null;
let container: HTMLDivElement | null = null;

afterEach(() => {
	if (app) {
		unmount(app);
	}
	container?.remove();
	app = null;
	container = null;
});

function settle(frames = 4) {
	return new Promise<void>((resolve) => {
		let remaining = frames;
		const tick = () => (remaining-- <= 0 ? resolve() : requestAnimationFrame(tick));
		requestAnimationFrame(tick);
	});
}

function viewportOffsetOf(messageId: string, viewport: HTMLElement) {
	const item = document.querySelector(`[data-message-id="${messageId}"]`) as HTMLElement;
	return Math.round(item.getBoundingClientRect().top - viewport.getBoundingClientRect().top);
}

function getViewport() {
	return document.querySelector('[aria-label="viewport"]') as HTMLElement;
}

function getDistanceToBottom(viewport: HTMLElement) {
	return Math.round(viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight);
}

function getScrollTop(viewport: HTMLElement) {
	return Math.round(viewport.scrollTop);
}

function getCurrentAnchor() {
	return document.querySelector('[data-testid="visibility"]')!.getAttribute("data-current-anchor");
}

function getVisibleIds() {
	const value =
		document.querySelector('[data-testid="visibility"]')!.getAttribute("data-visible") ?? "";
	return value ? value.split(",") : [];
}

async function renderThread(props: ThreadProps) {
	container = document.createElement("div");
	document.body.appendChild(container);
	app = mount(BrowserHost, {
		target: container,
		props: { initial: props },
	});
	flushSync();
	await settle();
}

function updateThread(props: ThreadProps) {
	(app as { setProps: (next: ThreadProps) => void }).setProps(props);
	flushSync();
}

function createItems(count: number) {
	return Array.from({ length: count }, (_, index) => ({
		id: `m${index}`,
	}));
}

test("keeps the visible message in place when older messages are prepended", async () => {
	const initial = createItems(8);

	await renderThread({ items: initial });

	const viewport = getViewport();

	viewport.scrollTop = 3 * ITEM_HEIGHT;
	await settle();

	const offsetBefore = viewportOffsetOf("m3", viewport);

	updateThread({ items: [{ id: "o0" }, { id: "o1" }, { id: "o2" }, ...initial] });
	await settle();

	const offsetAfter = viewportOffsetOf("m3", viewport);

	expect(Math.abs(offsetAfter - offsetBefore)).toBeLessThanOrEqual(1);
});

test("opens at the bottom by default", async () => {
	await renderThread({ items: createItems(8) });

	expect(getDistanceToBottom(getViewport())).toBeLessThanOrEqual(1);
});

test("keeps auto-scroll pinned when the final message grows", async () => {
	const initial = createItems(6);

	await renderThread({ autoScroll: true, items: initial });

	const viewport = getViewport();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({
		autoScroll: true,
		items: initial.map((item, index) =>
			index === initial.length - 1 ? { ...item, height: 240 } : item
		),
	});
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);
});

test("follows a single unanchored append while autoScroll is following", async () => {
	const initial = createItems(6);

	await renderThread({ autoScroll: true, items: initial });

	const viewport = getViewport();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({
		autoScroll: true,
		items: [...initial, { id: "assistant" }],
	});
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);
});

test("holds a new scrollAnchor at the reading line, then follows once the reply fills the viewport", async () => {
	const initial = createItems(6);

	await renderThread({ autoScroll: true, items: initial });

	const viewport = getViewport();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({
		autoScroll: true,
		items: [...initial, { id: "user", height: 20, scrollAnchor: true }],
	});
	await settle();

	// The tail spacer fills the rest of the viewport so this still reads as
	// "at the end", but the new user turn is held at the reading line.
	expect(viewportOffsetOf("user", viewport)).toBe(64);

	updateThread({
		autoScroll: true,
		items: [
			...initial,
			{ id: "user", height: 20, scrollAnchor: true },
			{ id: "assistant", height: 8 },
		],
	});
	await settle();

	expect(viewportOffsetOf("user", viewport)).toBe(64);

	updateThread({
		autoScroll: true,
		items: [
			...initial,
			{ id: "user", height: 20, scrollAnchor: true },
			{ id: "assistant", height: 80 },
		],
	});
	await settle();

	expect(viewportOffsetOf("user", viewport)).toBe(64);

	updateThread({
		autoScroll: true,
		items: [
			...initial,
			{ id: "user", height: 20, scrollAnchor: true },
			{ id: "assistant", height: 160 },
		],
	});
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);
	expect(viewportOffsetOf("user", viewport)).toBeLessThan(64);
});

test("follows in-place growth of an unanchored row while autoScroll is following", async () => {
	const initial = createItems(6);

	await renderThread({ autoScroll: true, items: initial });

	const viewport = getViewport();

	updateThread({
		autoScroll: true,
		items: [...initial, { id: "assistant", height: 24 }],
	});
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({
		autoScroll: true,
		items: [...initial, { id: "assistant", height: 240 }],
	});
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);
});

const STYLED_ITEM_CLASS =
	"min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]";

test("follows streamed growth on styled items with content-visibility", async () => {
	const initial = createItems(6);

	await renderThread({ autoScroll: true, itemClass: STYLED_ITEM_CLASS, items: initial });

	const viewport = getViewport();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({
		autoScroll: true,
		itemClass: STYLED_ITEM_CLASS,
		items: [...initial, { id: "assistant", height: 24 }],
	});
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({
		autoScroll: true,
		itemClass: STYLED_ITEM_CLASS,
		items: [...initial, { id: "assistant", height: 240 }],
	});
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);
});

test("keeps the end pinned when bulk appending anchored turns with autoScroll", async () => {
	const initial = createItems(6);

	await renderThread({ autoScroll: true, items: initial });

	const viewport = getViewport();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({
		autoScroll: true,
		items: [
			...initial,
			{ id: "new-user-1", scrollAnchor: true },
			{ id: "new-assistant-1" },
			{ id: "new-user-2", scrollAnchor: true },
			{ id: "new-assistant-2" },
		],
	});
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);
});

test("does not keep the end pinned when appending after the default bottom open", async () => {
	const initial = createItems(6);

	await renderThread({ items: initial });

	const viewport = getViewport();
	const scrollTop = getScrollTop(viewport);

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({ items: [...initial, { id: "new" }] });
	await settle();

	expect(getScrollTop(viewport)).toBe(scrollTop);
	expect(getDistanceToBottom(viewport)).toBeGreaterThan(0);
});

test("scroll button moves the viewport to the end", async () => {
	await renderThread({
		defaultScrollPosition: "start",
		items: createItems(8),
		showButton: true,
	});

	const viewport = getViewport();

	expect(getScrollTop(viewport)).toBe(0);
	expect(getDistanceToBottom(viewport)).toBeGreaterThan(0);

	const button = document.querySelector("button") as HTMLButtonElement;

	button.click();
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);
});

test("restores the last scroll anchor when the final turn overflows", async () => {
	await renderThread({
		defaultScrollPosition: "last-anchor",
		items: [
			{ id: "m0" },
			{ id: "m1" },
			{ id: "last-user", scrollAnchor: true },
			{ id: "last-assistant", height: 360 },
		],
		scrollPreviousItemPeek: 0,
	});

	const viewport = getViewport();

	expect(viewportOffsetOf("last-user", viewport)).toBeLessThanOrEqual(1);
	expect(getDistanceToBottom(viewport)).toBeGreaterThan(0);
});

test("falls back to the end when the last anchored turn fits", async () => {
	await renderThread({
		defaultScrollPosition: "last-anchor",
		items: [...createItems(5), { id: "last-user", scrollAnchor: true }, { id: "last-assistant" }],
		scrollPreviousItemPeek: 0,
	});

	expect(getDistanceToBottom(getViewport())).toBeLessThanOrEqual(1);
});

test("scrolls to a mounted message by id", async () => {
	await renderThread({
		defaultScrollPosition: "start",
		items: createItems(8),
		showJumpButton: true,
	});

	const viewport = getViewport();

	const button = document.querySelector("button") as HTMLButtonElement;

	button.click();
	await settle();

	expect(viewportOffsetOf("m5", viewport)).toBeLessThanOrEqual(1);
});

test("preserves a scrolled-to turn across a prepend (command-path anchor)", async () => {
	const initial = createItems(12);

	await renderThread({
		defaultScrollPosition: "start",
		items: initial,
		showJumpButton: true,
	});

	const viewport = getViewport();

	(document.querySelector("button") as HTMLButtonElement).click();
	await settle();

	const offsetBefore = viewportOffsetOf("m5", viewport);
	expect(offsetBefore).toBeLessThanOrEqual(1);

	updateThread({
		defaultScrollPosition: "start",
		items: [{ id: "o0" }, { id: "o1" }, { id: "o2" }, ...initial],
		showJumpButton: true,
	});
	await settle();

	expect(Math.abs(viewportOffsetOf("m5", viewport) - offsetBefore)).toBeLessThanOrEqual(1);
});

test("user scroll intent cancels follow-bottom", async () => {
	const initial = createItems(8);

	await renderThread({ autoScroll: true, items: initial });

	const viewport = getViewport();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	viewport.dispatchEvent(new WheelEvent("wheel", { bubbles: true, deltaY: -ITEM_HEIGHT }));
	viewport.scrollTop = 0;
	viewport.dispatchEvent(new Event("scroll", { bubbles: true }));
	await settle();

	expect(getScrollTop(viewport)).toBe(0);

	updateThread({ autoScroll: true, items: [...initial, { id: "new" }] });
	await settle();

	expect(getScrollTop(viewport)).toBe(0);
	expect(getDistanceToBottom(viewport)).toBeGreaterThan(0);
});

test("tracks the current anchor as it scrolls above the viewport", async () => {
	const items = Array.from({ length: 30 }, (_, index) => ({
		id: `m${index}`,
		scrollAnchor: index % 10 === 0,
	}));

	await renderThread({
		defaultScrollPosition: "start",
		items,
		showVisibility: true,
	});

	const viewport = getViewport();

	expect(getCurrentAnchor()).toBe("m0");

	viewport.scrollTop = 900;
	await settle();

	expect(getCurrentAnchor()).toBe("m10");
	expect(getVisibleIds()).not.toContain("m10");

	viewport.scrollTop = 1700;
	await settle();

	expect(getCurrentAnchor()).toBe("m20");
});

test("keeps the anchor at the reading line current over lower visible anchors", async () => {
	const items = Array.from({ length: 12 }, (_, index) => ({
		id: `m${index}`,
		scrollAnchor: true,
	}));

	await renderThread({
		defaultScrollPosition: "start",
		items,
		showVisibility: true,
	});

	const viewport = getViewport();

	viewport.scrollTop = 5 * ITEM_HEIGHT;
	await settle();

	expect(getCurrentAnchor()).toBe("m5");
	expect(getVisibleIds()).toContain("m6");
});

test("visibility populates under StrictMode (frame ref + lifecycle survive remount)", async () => {
	const ids = Array.from({ length: 8 }, (_, index) => `m${index}`);

	container = document.createElement("div");
	document.body.appendChild(container);
	app = mount(MemoTree, { target: container, props: { ids } });
	flushSync();
	await settle();

	unmount(app);
	app = mount(MemoTree, { target: container, props: { ids } });
	flushSync();
	await settle();

	getViewport().scrollTop = 0;
	getViewport().dispatchEvent(new Event("scroll", { bubbles: true }));
	await settle();

	expect(getCurrentAnchor()).toBe("m0");
	expect(getVisibleIds().length).toBeGreaterThan(0);
});

test("tracks visibility through memoized item components", async () => {
	const ids = Array.from({ length: 8 }, (_, index) => `m${index}`);

	container = document.createElement("div");
	document.body.appendChild(container);
	app = mount(MemoTree, { target: container, props: { ids } });
	flushSync();
	await settle();

	expect(getCurrentAnchor()).toBe("m0");
	expect(getVisibleIds().length).toBeGreaterThan(0);
	expect(getVisibleIds()).toContain("m0");
});

test("an anchored turn holds at the top when content below it collapses", async () => {
	const peek = 32;
	const base = [
		{ id: "m0", height: 300 },
		{ id: "m1", height: 300 },
		{ id: "m2", height: 300 },
	];

	await renderThread({ items: base, scrollPreviousItemPeek: peek });

	updateThread({
		scrollPreviousItemPeek: peek,
		items: [...base, { id: "turn", height: 80, scrollAnchor: true }, { id: "marker", height: 100 }],
	});
	await settle();

	expect(viewportOffsetOf("turn", getViewport())).toBeLessThanOrEqual(peek + 4);

	updateThread({
		scrollPreviousItemPeek: peek,
		items: [...base, { id: "turn", height: 80, scrollAnchor: true }, { id: "reply", height: 0 }],
	});
	await settle();
	await settle();

	expect(viewportOffsetOf("turn", getViewport())).toBeLessThanOrEqual(peek + 4);
});

test("auto-scroll and content updates survive a StrictMode remount", async () => {
	const items = createItems(6);

	await renderThread({ autoScroll: true, items, showVisibility: true });
	await settle();

	if (app) {
		unmount(app);
	}
	app = mount(BrowserHost, {
		target: container!,
		props: { initial: { autoScroll: true, items, showVisibility: true } },
	});
	flushSync();
	await settle();

	const viewport = getViewport();
	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);

	updateThread({ autoScroll: true, items: [...items, { id: "new" }], showVisibility: true });
	await settle();

	expect(getDistanceToBottom(viewport)).toBeLessThanOrEqual(1);
	expect(getVisibleIds().length).toBeGreaterThan(0);
});
