import { flushSync, mount, unmount } from "svelte";
import { afterEach, expect, test } from "vitest";

import DocsVirtualizer from "./message-scroller-docs-virtualizer.svelte";

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

function settle(frames = 6) {
	return new Promise<void>((resolve) => {
		let remaining = frames;
		const tick = () => (remaining-- <= 0 ? resolve() : requestAnimationFrame(tick));
		requestAnimationFrame(tick);
	});
}

test("documented virtualizer snippet renders a window of rows", async () => {
	container = document.createElement("div");
	document.body.appendChild(container);

	const messages = Array.from({ length: 200 }, (_, index) => ({
		id: `m${index}`,
		text: `Message ${index}`,
	}));

	app = mount(DocsVirtualizer, {
		target: container,
		props: { messages },
	});
	flushSync();
	await settle();

	const viewport = document.querySelector('[aria-label="viewport"]') as HTMLElement;
	const rows = [...viewport.querySelectorAll("[data-message-id]")];

	expect(viewport).toBeTruthy();
	expect(rows.length).toBeGreaterThan(0);
	expect(rows.length).toBeLessThan(messages.length);

	viewport.scrollTop = 0;
	viewport.dispatchEvent(new Event("scroll"));
	flushSync();
	await settle();

	const startRows = [...viewport.querySelectorAll("[data-message-id]")];
	expect(startRows[0]?.getAttribute("data-message-id")).toBe("m0");

	viewport.scrollTop = viewport.scrollHeight;
	viewport.dispatchEvent(new Event("scroll"));
	flushSync();
	await settle();

	const scrolledRows = [...viewport.querySelectorAll("[data-message-id]")];
	expect(scrolledRows.some((row) => row.getAttribute("data-message-id") === "m199")).toBe(true);
	expect(scrolledRows.some((row) => row.getAttribute("data-message-id") === "m0")).toBe(false);
});
