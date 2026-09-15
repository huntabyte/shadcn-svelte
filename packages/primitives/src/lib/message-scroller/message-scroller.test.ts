/** @vitest-environment jsdom */

import { flushSync, mount, tick, unmount } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import TestHost from "./message-scroller-test-host.svelte";
import PendingScrollTree from "./message-scroller-test-pending.svelte";
import type {
	PendingScrollTreeProps,
	TestMessage,
	TestRef,
	TestScrollerApi,
	TestScrollerOptions,
} from "./message-scroller-test-types.js";
import type {
	MessageScrollerScrollable,
	MessageScrollerScrollOptions,
	MessageScrollerVisibilityState,
} from "./types.js";

type RenderedTestScroller = {
	api: () => TestScrollerApi;
	button: () => HTMLButtonElement;
	container: HTMLDivElement;
	content: () => HTMLDivElement;
	message: (messageId: string) => HTMLDivElement;
	rerender: (
		messages: TestMessage[],
		options?: Partial<Omit<TestScrollerOptions, "messages">>
	) => Promise<void>;
	scroller: () => HTMLDivElement;
	state: () => MessageScrollerScrollable;
	stateRenderCount: () => number;
	visibility: () => MessageScrollerVisibilityState;
	viewport: () => HTMLDivElement;
};

const viewportHeight = 100;

let containers: HTMLDivElement[] = [];
let apps: Array<Record<string, unknown>> = [];
let originalGetBoundingClientRect: typeof HTMLElement.prototype.getBoundingClientRect;
let originalGetComputedStyle: typeof window.getComputedStyle;
let originalScrollTo: typeof HTMLElement.prototype.scrollTo;
let animationFrameTime = 0;
let intersectionObservers: TestIntersectionObserver[] = [];
let resizeObservers: TestResizeObserver[] = [];

class TestResizeObserver {
	private callback: ResizeObserverCallback;
	private elements = new Set<Element>();

	constructor(callback: ResizeObserverCallback) {
		this.callback = callback;
		resizeObservers.push(this);
	}

	disconnect() {
		this.elements.clear();
		resizeObservers = resizeObservers.filter((observer) => observer !== this);
	}

	has(element: Element) {
		return this.elements.has(element);
	}

	observe(element: Element) {
		this.elements.add(element);
		window.requestAnimationFrame(() => this.trigger());
	}

	trigger() {
		this.callback([], this as unknown as ResizeObserver);
	}

	unobserve(element: Element) {
		this.elements.delete(element);
	}
}

class TestIntersectionObserver {
	readonly root: Element | Document | null | undefined;
	private callback: IntersectionObserverCallback;
	private elements = new Set<Element>();

	constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
		this.callback = callback;
		this.root = options?.root;
		intersectionObservers.push(this);
	}

	disconnect() {
		this.elements.clear();
		intersectionObservers = intersectionObservers.filter((observer) => observer !== this);
	}

	observe(element: Element) {
		this.elements.add(element);
	}

	takeRecords() {
		return [];
	}

	trigger(entries: Array<Pick<IntersectionObserverEntry, "isIntersecting" | "target">>) {
		this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
	}

	unobserve(element: Element) {
		this.elements.delete(element);
	}
}

beforeEach(() => {
	animationFrameTime = 0;
	intersectionObservers = [];
	resizeObservers = [];
	vi.useFakeTimers();

	originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
	originalGetComputedStyle = window.getComputedStyle;
	originalScrollTo = HTMLElement.prototype.scrollTo;

	window.requestAnimationFrame = (callback) =>
		window.setTimeout(() => {
			animationFrameTime += 16;
			callback(animationFrameTime);
		}, 16);
	window.cancelAnimationFrame = (handle) => window.clearTimeout(handle);
	window.ResizeObserver = TestResizeObserver as unknown as typeof ResizeObserver;
	(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = undefined;

	Object.defineProperty(HTMLElement.prototype, "clientHeight", {
		configurable: true,
		get() {
			if (this instanceof HTMLElement && this.dataset.testHeight) {
				return Number(this.dataset.testHeight);
			}

			if (this instanceof HTMLElement && this.dataset.testid === "viewport") {
				return viewportHeight;
			}

			return 0;
		},
	});

	Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
		configurable: true,
		get() {
			if (
				this instanceof HTMLElement &&
				(this.dataset.testid === "viewport" || this.dataset.testid === "content")
			) {
				return getContentHeight(this);
			}

			return this.clientHeight;
		},
	});

	HTMLElement.prototype.scrollTo = function scrollTo(
		optionsOrX?: ScrollToOptions | number,
		y?: number
	) {
		const top = typeof optionsOrX === "number" ? y : optionsOrX?.top;

		if (typeof top === "number") {
			this.scrollTop = Math.max(0, top);
		}
	};

	HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
		if (!(this instanceof HTMLElement)) {
			return originalGetBoundingClientRect.call(this);
		}

		return getTestRect(this);
	};

	window.getComputedStyle = ((element: Element) => {
		const style = originalGetComputedStyle(element);

		if (element instanceof HTMLElement && element.dataset.testid === "content") {
			return {
				...style,
				gap: "0px",
				paddingBlockEnd: `${Number(element.dataset.paddingEnd ?? 0)}px`,
				paddingBlockStart: `${Number(element.dataset.paddingStart ?? 0)}px`,
				paddingBottom: `${Number(element.dataset.paddingEnd ?? 0)}px`,
				paddingTop: `${Number(element.dataset.paddingStart ?? 0)}px`,
				rowGap: "0px",
			} as CSSStyleDeclaration;
		}

		return style;
	}) as typeof window.getComputedStyle;
});

afterEach(() => {
	HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
	HTMLElement.prototype.scrollTo = originalScrollTo;
	window.getComputedStyle = originalGetComputedStyle;

	for (const app of apps) {
		unmount(app);
	}
	apps = [];

	containers.forEach((container) => {
		container.remove();
	});
	containers = [];

	vi.useRealTimers();
});

describe("MessageScroller", () => {
	it("exposes derived state, a labelled viewport, and button state", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "start",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().tabIndex).toBe(0);
		expect(rendered.viewport().getAttribute("role")).toBe("region");
		expect(rendered.viewport().getAttribute("aria-label")).toBe("Messages");
		expect(rendered.content().getAttribute("role")).toBe("log");
		expect(rendered.content().getAttribute("aria-relevant")).toBe("additions");
		expect(rendered.scroller().dataset.scrollable).toBe("end");
		expect(rendered.state()).toMatchObject({
			start: false,
			end: true,
		});
		expect(rendered.button().dataset.active).toBe("true");
		expect(rendered.button().hasAttribute("inert")).toBe(false);
		expect(rendered.button().hidden).toBe(false);
		expect(rendered.button().tabIndex).toBe(0);
	});

	it("allows content live-region semantics to be overridden", async () => {
		const rendered = await renderTestScroller({
			contentAriaBusy: true,
			contentAriaRelevant: "additions text",
			contentRole: "list",
			messages: [{ id: "message-1", height: 80 }],
		});

		expect(rendered.content().getAttribute("role")).toBe("list");
		expect(rendered.content().getAttribute("aria-busy")).toBe("true");
		expect(rendered.content().getAttribute("aria-relevant")).toBe("additions text");
	});

	it("opens at the end by default", async () => {
		const rendered = await renderTestScroller({
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: false,
		});
		expect(rendered.button().dataset.active).toBe("false");
		expect(rendered.button().hidden).toBe(false);
		expect(rendered.viewport().hasAttribute("data-pending-scroll")).toBe(false);
		expect(rendered.scroller().hasAttribute("data-pending-scroll")).toBe(false);
	});

	it("emits data-pending-scroll on the server when opening at the end", () => {
		const html = renderPendingScrollFirstPaint({ testIds: true });

		expect(html).toContain('data-pending-scroll=""');
	});

	it("emits data-pending-scroll on the server when opening at last-anchor", () => {
		const html = renderPendingScrollFirstPaint({
			defaultScrollPosition: "last-anchor",
			scrollAnchor: true,
		});

		expect(html).toContain('data-pending-scroll=""');
	});

	it("does not emit data-pending-scroll on the server when opening at the start", () => {
		const html = renderPendingScrollFirstPaint({ defaultScrollPosition: "start" });

		expect(html).not.toContain("data-pending-scroll");
	});

	it("drops data-pending-scroll when the transcript is empty", async () => {
		const rendered = await renderTestScroller({
			messages: [],
		});

		expect(rendered.viewport().hasAttribute("data-pending-scroll")).toBe(false);
		expect(rendered.scroller().hasAttribute("data-pending-scroll")).toBe(false);
	});

	it("clears data-pending-scroll on hydration without errors", async () => {
		const props: PendingScrollTreeProps = { items: ["One", "Two"], testIds: true };
		const mounted = renderPendingScrollToContainer(props);

		expect(mounted.scroller?.hasAttribute("data-pending-scroll")).toBe(true);
		expect(mounted.viewport?.hasAttribute("data-pending-scroll")).toBe(true);

		const consoleError = await mounted.hydrate();

		expect(mounted.scroller?.hasAttribute("data-pending-scroll")).toBe(false);
		expect(mounted.viewport?.hasAttribute("data-pending-scroll")).toBe(false);
		expect(consoleError).not.toHaveBeenCalled();
		consoleError.mockRestore();
	});

	it("converges after a pre-hydration script removes data-pending-scroll", async () => {
		const props: PendingScrollTreeProps = {
			items: ["One", "Two"],
			suppressHydrationWarning: true,
			testIds: true,
		};
		const mounted = renderPendingScrollToContainer(props);

		expect(mounted.scroller?.hasAttribute("data-pending-scroll")).toBe(true);
		expect(mounted.viewport?.hasAttribute("data-pending-scroll")).toBe(true);

		mounted.viewport?.removeAttribute("data-pending-scroll");

		const consoleError = await mounted.hydrate();

		expect(consoleError).not.toHaveBeenCalled();
		expect(mounted.scroller?.hasAttribute("data-pending-scroll")).toBe(false);
		expect(mounted.viewport?.hasAttribute("data-pending-scroll")).toBe(false);
		expect(document.body.contains(mounted.viewport)).toBe(true);
		consoleError.mockRestore();
	});

	it("opens at the end when autoScroll starts engaged", async () => {
		(window as unknown as { ResizeObserver: unknown }).ResizeObserver = undefined;

		const rendered = await renderTestScroller({
			autoScroll: true,
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: false,
		});
	});

	it("opens at the start with defaultScrollPosition", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "start",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(0);
		expect(rendered.state()).toMatchObject({
			start: false,
			end: true,
		});
	});

	it("does not follow later appends while resting at the end without autoScroll", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
			{ id: "message-4", height: 80 },
		]);

		expect(rendered.viewport().scrollTop).toBe(140);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: true,
		});
	});

	it("follows later appends while resting at the end with autoScroll", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		await rendered.rerender(
			[
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 80 },
			],
			{ autoScroll: true }
		);

		expect(rendered.viewport().scrollTop).toBe(220);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: false,
		});
	});

	it("places bulk appended anchors near the top without autoScroll", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
			{ id: "message-4", height: 80, scrollAnchor: true },
			{ id: "message-5", height: 80 },
			{ id: "message-6", height: 80, scrollAnchor: true },
			{ id: "message-7", height: 80 },
		]);

		expect(rendered.viewport().scrollTop).toBe(176);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: true,
		});
	});

	it("holds a newly appended anchor at the reading line while the reply streams with autoScroll", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		await rendered.rerender(
			[
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 40, scrollAnchor: true },
			],
			{ autoScroll: true }
		);

		expect(rendered.viewport().scrollTop).toBe(176);
		expect(rendered.message("message-4").getBoundingClientRect().top).toBe(64);

		rendered.message("message-4").dataset.testHeight = "160";
		await triggerResize(rendered.content());

		expect(rendered.message("message-4").getBoundingClientRect().top).toBe(64);
	});

	it("hands off from the anchor hold to following once the streamed reply fills the viewport", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		await rendered.rerender(
			[
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 20, scrollAnchor: true },
			],
			{ autoScroll: true }
		);

		expect(rendered.viewport().scrollTop).toBe(176);
		expect(rendered.message("message-4").getBoundingClientRect().top).toBe(64);

		await rendered.rerender(
			[
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 20, scrollAnchor: true },
				{ id: "message-5", height: 8 },
			],
			{ autoScroll: true }
		);
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(176);
		expect(rendered.message("message-4").getBoundingClientRect().top).toBe(64);

		rendered.message("message-5").dataset.testHeight = "60";
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(220);
		expect(rendered.state().end).toBe(false);

		rendered.message("message-5").dataset.testHeight = "100";
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(260);
		expect(rendered.state().end).toBe(false);
	});

	it("from an empty autoScroll transcript, follows the assistant once it overflows the viewport", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			messages: [],
		});

		await rendered.rerender(
			[{ id: "user", height: 40, scrollAnchor: true }],
			{ autoScroll: true }
		);

		expect(rendered.viewport().scrollTop).toBe(0);

		await rendered.rerender(
			[
				{ id: "user", height: 40, scrollAnchor: true },
				{ id: "assistant", height: 20 },
			],
			{ autoScroll: true }
		);
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(0);

		rendered.message("assistant").dataset.testHeight = "140";
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(80);
		expect(rendered.state().end).toBe(false);
	});

	it("applies the default end target after async messages mount", async () => {
		const rendered = await renderTestScroller({
			messages: [],
		});

		expect(rendered.viewport().scrollTop).toBe(0);

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
		]);

		expect(rendered.viewport().scrollTop).toBe(140);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: false,
		});
	});

	it("follows content growth while autoScroll remains engaged", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		await rendered.rerender(
			[
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 140 },
			],
			{ autoScroll: true }
		);
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(200);
		expect(rendered.scroller().hasAttribute("data-autoscrolling")).toBe(true);
	});

	it("follows late content resize while autoScroll remains engaged", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		rendered.message("message-3").dataset.testHeight = "140";
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(200);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: false,
		});
	});

	it("does not follow viewport resize while resting at the end without autoScroll", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		rendered.viewport().dataset.testHeight = "60";
		await triggerResize(rendered.viewport());

		expect(rendered.viewport().scrollTop).toBe(140);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: true,
		});
	});

	it("releases autoScroll after user scroll intent", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		rendered.viewport().dispatchEvent(new WheelEvent("wheel", { bubbles: true }));
		rendered.viewport().scrollTop = 60;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		await rendered.rerender(
			[
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 80 },
			],
			{ autoScroll: true }
		);

		expect(rendered.viewport().scrollTop).toBe(60);
		expect(rendered.state().end).toBe(true);
	});

	it("does not follow appends after user scroll intent without autoScroll", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		rendered.viewport().dispatchEvent(new WheelEvent("wheel", { bubbles: true }));
		rendered.viewport().scrollTop = 60;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
			{ id: "message-4", height: 80 },
		]);

		expect(rendered.viewport().scrollTop).toBe(60);
		expect(rendered.state().end).toBe(true);
	});

	it("releases follow-bottom on a bare scroll-away so later appends do not snap back", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		await vi.advanceTimersByTimeAsync(300);
		flushSync();

		rendered.viewport().scrollTop = 0;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		expect(rendered.viewport().scrollTop).toBe(0);

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
			{ id: "message-4", height: 80 },
		]);

		expect(rendered.viewport().scrollTop).toBe(0);
	});

	it("releases follow-bottom on a bare scroll-away so later resizes do not snap back", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		await vi.advanceTimersByTimeAsync(300);
		flushSync();

		rendered.viewport().scrollTop = 0;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		expect(rendered.viewport().scrollTop).toBe(0);

		rendered.message("message-3").dataset.testHeight = "200";
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(0);
	});

	it("keeps following when a state commit sees growth before the coalesced resize handler", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);

		await vi.advanceTimersByTimeAsync(300);
		flushSync();

		rendered.message("message-3").dataset.testHeight = "160";
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		flushSync();

		expect(rendered.state().end).toBe(false);
		expect(rendered.button().dataset.active).toBe("false");

		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(220);
		expect(rendered.state().end).toBe(false);
	});

	it("places appended scroll anchors near the top with previous peek", async () => {
		const rendered = await renderTestScroller({
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
			{ id: "message-4", height: 40, scrollAnchor: true },
		]);

		expect(rendered.viewport().scrollTop).toBe(176);
	});

	it("anchors a replaced row when item count stays the same", async () => {
		const rendered = await renderTestScroller({
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "placeholder", height: 80, scrollAnchor: false },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(60);

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 40, scrollAnchor: true },
		]);

		expect(rendered.viewport().scrollTop).toBe(16);
	});

	it("does not reconcile scroll position when only the parent re-renders", async () => {
		const rendered = await renderTestScrollerWithParent({
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		const scrollTop = rendered.viewport().scrollTop;

		await rendered.bumpParent();

		expect(rendered.viewport().scrollTop).toBe(scrollTop);
	});

	it("does not show the end button for spacer-only overflow", async () => {
		const rendered = await renderTestScroller({
			messages: [
				{ id: "message-1", height: 60 },
				{ id: "message-2", height: 20 },
			],
		});

		await rendered.rerender([
			{ id: "message-1", height: 60 },
			{ id: "message-2", height: 20 },
			{ id: "message-3", height: 20, scrollAnchor: true },
		]);

		expect(rendered.viewport().scrollHeight).toBeGreaterThan(viewportHeight);
		expect(rendered.state().end).toBe(false);
		expect(rendered.button().dataset.active).toBe("false");
		expect(rendered.button().hidden).toBe(false);
	});

	it('opens "last-anchor" with the last overflowing anchor near the top', async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "last-anchor",
			messages: [
				{ id: "message-1", height: 100 },
				{ id: "message-2", height: 40, scrollAnchor: true },
				{ id: "message-3", height: 160 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(36);
		expect(rendered.message("message-2").getBoundingClientRect().top).toBe(64);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: true,
		});
	});

	it('falls back to the end for "last-anchor" when there is no anchor', async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "last-anchor",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(140);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: false,
		});
	});

	it('falls back to the end for "last-anchor" when the last turn fits', async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "last-anchor",
			messages: [
				{ id: "message-1", height: 100 },
				{ id: "message-2", height: 40, scrollAnchor: true },
				{ id: "message-3", height: 40 },
			],
		});
		const spacer = rendered.content().querySelector<HTMLElement>("[data-message-scroller-spacer]");

		expect(rendered.viewport().scrollTop).toBe(80);
		expect(rendered.state()).toMatchObject({
			start: true,
			end: false,
		});
		expect(spacer?.hidden).toBe(true);
	});

	it('applies "last-anchor" after async messages mount', async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "last-anchor",
			messages: [],
		});

		expect(rendered.viewport().scrollTop).toBe(0);

		await rendered.rerender([
			{ id: "message-1", height: 100 },
			{ id: "message-2", height: 40, scrollAnchor: true },
			{ id: "message-3", height: 160 },
		]);

		expect(rendered.viewport().scrollTop).toBe(36);
		expect(rendered.message("message-2").getBoundingClientRect().top).toBe(64);
	});

	it('keys "last-anchor" on the last scrollAnchor item', async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "last-anchor",
			messages: [
				{ id: "message-1", height: 60, scrollAnchor: true },
				{ id: "message-2", height: 60 },
				{ id: "message-3", height: 40, scrollAnchor: true },
				{ id: "message-4", height: 120, role: "user" },
				{ id: "message-5", height: 80, role: "user" },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(56);
		expect(rendered.message("message-3").getBoundingClientRect().top).toBe(64);
	});

	it('does not let "last-anchor" with autoScroll yank content to the bottom', async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "last-anchor",
			messages: [
				{ id: "message-1", height: 100 },
				{ id: "message-2", height: 40, scrollAnchor: true },
				{ id: "message-3", height: 160 },
			],
		});

		expect(rendered.viewport().scrollTop).toBe(36);
		expect(rendered.state().end).toBe(true);

		await rendered.rerender(
			[
				{ id: "message-1", height: 100 },
				{ id: "message-2", height: 40, scrollAnchor: true },
				{ id: "message-3", height: 220 },
			],
			{ autoScroll: true }
		);

		expect(rendered.viewport().scrollTop).toBe(36);
		expect(rendered.state().end).toBe(true);

		rendered.viewport().dispatchEvent(new WheelEvent("wheel", { bubbles: true }));
		rendered.viewport().scrollTop =
			rendered.viewport().scrollHeight - rendered.viewport().clientHeight;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		await rendered.rerender(
			[
				{ id: "message-1", height: 100 },
				{ id: "message-2", height: 40, scrollAnchor: true },
				{ id: "message-3", height: 260 },
			],
			{ autoScroll: true }
		);
		await triggerResize(rendered.content());

		expect(rendered.viewport().scrollTop).toBe(300);
		expect(rendered.state().end).toBe(false);
	});

	it("scrolls to mounted messages without re-arming autoScroll", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		await expect(scrollToMessage(rendered, "message-3")).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(160);
		expect(
			rendered.content().querySelector<HTMLElement>("[data-message-scroller-spacer]")?.style.height
		).toBe("20px");

		await rendered.rerender(
			[
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 80 },
			],
			{ autoScroll: true }
		);

		expect(rendered.viewport().scrollTop).toBe(160);
	});

	it("lets a user gesture during a programmatic jump re-arm follow-bottom at the bottom", async () => {
		const rendered = await renderTestScroller({
			autoScroll: true,
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		await expect(scrollToMessage(rendered, "message-1")).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(0);

		rendered.viewport().dispatchEvent(new WheelEvent("wheel", { bubbles: true }));
		rendered.viewport().scrollTop = 140;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
			{ id: "message-4", height: 80 },
		]);

		expect(rendered.viewport().scrollTop).toBe(220);
	});

	it("supports scrollToMessage alignment options", async () => {
		const rendered = await renderTestScroller({
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 80 },
			],
		});

		await expect(scrollToMessage(rendered, "message-3", { align: "start" })).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(160);

		await expect(scrollToMessage(rendered, "message-3", { align: "center" })).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(150);

		await expect(scrollToMessage(rendered, "message-3", { align: "end" })).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(140);

		await expect(scrollToMessage(rendered, "message-1", { align: "nearest" })).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(0);

		await expect(scrollToMessage(rendered, "message-2", { align: "nearest" })).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(60);
	});

	it("applies scrollMargin to scrollToMessage jumps", async () => {
		const rendered = await renderTestScroller({
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 80 },
			],
			scrollMargin: 12,
		});

		await expect(scrollToMessage(rendered, "message-3")).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(148);

		await expect(scrollToMessage(rendered, "message-3", { scrollMargin: 20 })).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(140);
	});

	it("keeps scrollToMessage targets inside content padding", async () => {
		const rendered = await renderTestScroller({
			contentPaddingEnd: 24,
			contentPaddingStart: 24,
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 80 },
			],
			scrollMargin: 12,
		});

		await expect(scrollToMessage(rendered, "message-3")).resolves.toBe(true);
		expect(rendered.viewport().scrollTop).toBe(148);
		expect(rendered.message("message-3").getBoundingClientRect().top).toBe(36);
	});

	it("lets an explicit mount restore win over defaultScrollPosition", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "end",
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
				{ id: "message-4", height: 80 },
			],
			restoreMessageId: "message-2",
		});

		expect(rendered.viewport().scrollTop).toBe(80);
		expect(rendered.message("message-2").getBoundingClientRect().top).toBe(0);
		expect(rendered.viewport().hasAttribute("data-pending-scroll")).toBe(false);
	});

	it("restores to a queued message target after async messages mount", async () => {
		const rendered = await renderTestScroller({
			messages: [],
			restoreMessageId: "message-2",
		});

		expect(rendered.viewport().scrollTop).toBe(0);

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
			{ id: "message-4", height: 80 },
		]);

		expect(rendered.viewport().scrollTop).toBe(80);
		expect(rendered.message("message-2").getBoundingClientRect().top).toBe(0);
		expect(rendered.viewport().hasAttribute("data-pending-scroll")).toBe(false);
	});

	it("returns false when scrollToMessage cannot find a mounted message", async () => {
		const rendered = await renderTestScroller({
			messages: [{ id: "message-1", height: 80 }],
		});

		expect(rendered.api().scrollToMessage("missing")).toBe(false);
	});

	it("keeps duplicate message ids identity-safe during unmount", async () => {
		const rendered = await renderTestScroller({
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "duplicate", key: "duplicate-a", height: 80 },
				{ id: "duplicate", key: "duplicate-b", height: 80 },
			],
		});

		await rendered.rerender([
			{ id: "message-1", height: 80 },
			{ id: "duplicate", key: "duplicate-b", height: 80 },
		]);

		expect(rendered.api().scrollToMessage("duplicate")).toBe(true);
	});

	it("preserves the first visible message when older messages are prepended", async () => {
		const rendered = await renderTestScroller({
			messages: [
				{ id: "message-1", height: 80 },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
		});

		rendered.viewport().scrollTop = 80;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		await rendered.rerender([
			{ id: "message-0", height: 40 },
			{ id: "message-1", height: 80 },
			{ id: "message-2", height: 80 },
			{ id: "message-3", height: 80 },
		]);

		expect(rendered.viewport().scrollTop).toBe(120);
	});

	it("exposes visible ids and the current anchor only when subscribed", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "start",
			messages: [
				{ id: "message-1", height: 80, scrollAnchor: true },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
			observeVisibility: true,
		});

		expect(rendered.visibility()).toEqual({
			currentAnchorId: "message-1",
			visibleMessageIds: ["message-1", "message-2"],
		});

		rendered.viewport().scrollTop = 90;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		expect(rendered.visibility()).toEqual({
			currentAnchorId: "message-1",
			visibleMessageIds: ["message-2", "message-3"],
		});
	});

	it("uses IntersectionObserver for subscribed visibility when available", async () => {
		installIntersectionObserver();

		const rendered = await renderTestScroller({
			defaultScrollPosition: "start",
			messages: [
				{ id: "message-1", height: 80, scrollAnchor: true },
				{ id: "message-2", height: 80 },
				{ id: "message-3", height: 80 },
			],
			observeVisibility: true,
		});
		const observer = intersectionObservers[0];

		expect(observer?.root).toBe(rendered.viewport());

		observer?.trigger([
			{ isIntersecting: true, target: rendered.message("message-1") },
			{ isIntersecting: true, target: rendered.message("message-2") },
		]);
		await flushUi();

		expect(rendered.visibility()).toEqual({
			currentAnchorId: "message-1",
			visibleMessageIds: ["message-1", "message-2"],
		});

		rendered.viewport().scrollTop = 90;
		observer?.trigger([
			{ isIntersecting: false, target: rendered.message("message-1") },
			{ isIntersecting: true, target: rendered.message("message-2") },
			{ isIntersecting: true, target: rendered.message("message-3") },
		]);
		await flushUi();

		expect(rendered.visibility()).toEqual({
			currentAnchorId: "message-1",
			visibleMessageIds: ["message-2", "message-3"],
		});
	});

	it("reports the anchor within the peek zone as current, not the one above it", async () => {
		const rendered = await renderTestScroller({
			defaultScrollPosition: "start",
			messages: [
				{ id: "m0", height: 80, scrollAnchor: true },
				{ id: "m1", height: 80, scrollAnchor: true },
				{ id: "m2", height: 80 },
				{ id: "m3", height: 80 },
			],
			observeVisibility: true,
		});

		rendered.viewport().scrollTop = 40;
		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		expect(rendered.visibility().currentAnchorId).toBe("m1");
	});

	it("does not rerender state subscribers when derived state is unchanged", async () => {
		const rendered = await renderTestScroller({
			messages: [{ id: "message-1", height: 40 }],
		});
		const renderCount = rendered.stateRenderCount();

		rendered.viewport().dispatchEvent(new Event("scroll", { bubbles: true }));
		await flushUi();

		expect(rendered.stateRenderCount()).toBe(renderCount);
	});
});

function renderPendingScrollFirstPaint(props: PendingScrollTreeProps) {
	const container = document.createElement("div");
	const app = mount(PendingScrollTree, { target: container, props });
	const html = container.innerHTML;
	unmount(app);
	return html;
}

function renderPendingScrollToContainer(props: PendingScrollTreeProps) {
	const container = document.createElement("div");

	containers.push(container);
	document.body.appendChild(container);

	const app = mount(PendingScrollTree, { target: container, props });
	apps.push(app);

	return {
		container,
		scroller: container.querySelector("[data-testid=scroller]"),
		viewport: container.querySelector("[data-testid=viewport]"),
		async hydrate() {
			const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
			await flushUi();
			return consoleError;
		},
	};
}

async function renderTestScroller(options: TestScrollerOptions) {
	return createRenderedScroller(options);
}

async function renderTestScrollerWithParent(
	options: TestScrollerOptions
): Promise<RenderedTestScroller & { bumpParent: () => Promise<void> }> {
	const rendered = await createRenderedScroller(options);

	return {
		...rendered,
		bumpParent: async () => {
			rendered.bumpParent();
			await flushUi();
		},
	};
}

async function createRenderedScroller(options: TestScrollerOptions) {
	const container = document.createElement("div");
	const apiRef: TestRef<TestScrollerApi> = { current: null };
	const stateRef: TestRef<MessageScrollerScrollable> = { current: null };
	const visibilityRef: TestRef<MessageScrollerVisibilityState> = { current: null };
	const stateRenderCountRef: TestRef<number> = { current: 0 };
	let currentOptions = options;

	containers.push(container);
	document.body.appendChild(container);

	const app = mount(TestHost, {
		target: container,
		props: {
			initial: currentOptions,
			apiRef,
			stateRef,
			stateRenderCountRef,
			visibilityRef,
		},
	});
	apps.push(app);
	await flushUi();

	return {
		api: () => {
			if (!apiRef.current) {
				throw new Error("MessageScroller API was not captured.");
			}

			return apiRef.current;
		},
		bumpParent: () => {
			app.bumpParent();
		},
		button: () => container.querySelector<HTMLButtonElement>("[data-testid=button]")!,
		container,
		content: () => container.querySelector<HTMLDivElement>("[data-testid=content]")!,
		message: (messageId: string) =>
			container.querySelector<HTMLDivElement>(`[data-message-id="${messageId}"]`)!,
		rerender: async (
			messages: TestMessage[],
			nextOptions: Partial<Omit<TestScrollerOptions, "messages">> = {}
		) => {
			currentOptions = {
				...currentOptions,
				...nextOptions,
				messages,
			};

			app.apply(currentOptions);
			await flushUi();
		},
		scroller: () => container.querySelector<HTMLDivElement>("[data-testid=scroller]")!,
		state: () => {
			if (!stateRef.current) {
				throw new Error("MessageScroller state was not captured.");
			}

			return stateRef.current;
		},
		stateRenderCount: () => stateRenderCountRef.current ?? 0,
		visibility: () => {
			if (!visibilityRef.current) {
				throw new Error("MessageScroller visibility was not captured.");
			}

			return visibilityRef.current;
		},
		viewport: () => container.querySelector<HTMLDivElement>("[data-testid=viewport]")!,
	} satisfies RenderedTestScroller & { bumpParent: () => void };
}

function installIntersectionObserver() {
	(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
		TestIntersectionObserver;
}

async function triggerResize(element: Element) {
	resizeObservers.forEach((observer) => {
		if (observer.has(element)) {
			observer.trigger();
		}
	});
	await flushUi();
}

async function scrollToMessage(
	rendered: RenderedTestScroller,
	messageId: string,
	options?: MessageScrollerScrollOptions
) {
	const handled = rendered.api().scrollToMessage(messageId, options);
	await flushUi();
	return handled;
}

async function flushUi() {
	flushSync();
	await tick();
	flushSync();
	await flushAnimationFrames();
	flushSync();
}

async function flushAnimationFrames(count = 4) {
	for (let index = 0; index < count; index++) {
		await vi.advanceTimersByTimeAsync(20);
	}
}

function getContentHeight(element: HTMLElement) {
	const content =
		element.dataset.testid === "content"
			? element
			: element.querySelector<HTMLElement>("[data-testid=content]");

	if (!content) {
		return 0;
	}

	const paddingStart = Number(content.dataset.paddingStart ?? 0);
	const paddingEnd = Number(content.dataset.paddingEnd ?? 0);
	const messagesHeight = getMessageElements(content).reduce(
		(height, message) => height + getElementHeight(message),
		0
	);
	const spacer = content.querySelector<HTMLElement>("[data-message-scroller-spacer]");
	const spacerHeight =
		spacer && !spacer.hidden ? Number.parseFloat(spacer.style.height) || 0 : 0;

	return paddingStart + messagesHeight + paddingEnd + spacerHeight;
}

function getTestRect(element: HTMLElement) {
	const viewport =
		element.dataset.testid === "viewport"
			? element
			: element
					.closest("[data-testid=scroller]")
					?.querySelector<HTMLElement>("[data-testid=viewport]");

	if (element.dataset.testid === "viewport") {
		return createRect(0, element.clientHeight);
	}

	if (!viewport) {
		return createRect(0, 0);
	}

	if (element.dataset.testid === "content") {
		const top = -viewport.scrollTop;

		return createRect(top, getContentHeight(element));
	}

	if (element.dataset.testid === "message") {
		const content = element.parentElement as HTMLElement;
		const top = getElementOffset(content, element) - viewport.scrollTop;

		return createRect(top, getElementHeight(element));
	}

	return createRect(0, 0);
}

function getElementOffset(content: HTMLElement, element: HTMLElement) {
	let offset = Number(content.dataset.paddingStart ?? 0);

	for (const message of getMessageElements(content)) {
		if (message === element) {
			return offset;
		}

		offset += getElementHeight(message);
	}

	return offset;
}

function getMessageElements(content: HTMLElement) {
	return Array.from(content.children).filter(
		(child): child is HTMLElement =>
			child instanceof HTMLElement && child.dataset.testid === "message"
	);
}

function getElementHeight(element: HTMLElement) {
	return Number(element.dataset.testHeight ?? 0);
}

function createRect(top: number, height: number) {
	return {
		bottom: top + height,
		height,
		left: 0,
		right: 0,
		top,
		width: 0,
		x: 0,
		y: top,
		toJSON() {
			return {};
		},
	} as DOMRect;
}
