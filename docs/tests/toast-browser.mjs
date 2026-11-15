// Real-browser smoke test for toast-browser-app.svelte. Serve it in a clean
// registry consumer, then run: node docs/tests/toast-browser.mjs <consumer-url>
// Uses the workspace's existing Playwright dependency; no mocked DOM APIs.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(new URL("../../packages/primitives/package.json", import.meta.url));
const { chromium } = require("playwright");
const browser = await chromium.launch({ headless: true });
const results = [];
try {
	const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	const url = process.argv[2] ?? "http://127.0.0.1:4181";
	const cards = page.locator("[data-slot=toast]");
	const viewport = page.locator("[data-slot=toast-viewport]");
	const activeSlot = () => page.evaluate(() => document.activeElement?.getAttribute("data-slot"));
	const waitCount = async (count) => {
		await page.waitForFunction(
			(expected) => document.querySelectorAll("[data-slot=toast]").length === expected,
			count
		);
	};
	const reset = async () => {
		await page.goto(url);
		await page.locator("#add").waitFor();
	};
	const add = async (count = 1) => {
		for (let i = 0; i < count; i++) await page.locator("#add").click();
		await page.waitForTimeout(550);
	};
	await reset();
	await add(4);
	assert.equal(await cards.count(), 4);
	assert.equal(await page.locator("[data-slot=toast][inert]").count(), 1);
	assert.ok(await cards.first().evaluate((el) => el.offsetHeight > 0));
	assert.ok(await viewport.evaluate((el) => el.parentElement.parentElement === document.body));
	await page.keyboard.press("F6");
	assert.equal(await activeSlot(), "toast-viewport");
	await page.keyboard.press("Tab");
	assert.equal(await activeSlot(), "toast");
	await page.keyboard.press("Tab");
	assert.equal(await activeSlot(), "toast-action");
	await page.keyboard.press("Enter");
	assert.equal(await page.evaluate(() => document.body.dataset.action), "done");
	assert.equal(await cards.count(), 4);
	await page.keyboard.press("F6");
	assert.equal(await page.evaluate(() => document.activeElement.id), "add");
	await page.keyboard.press("F6");
	await page.keyboard.press("Shift+Tab");
	assert.equal(await page.evaluate(() => document.activeElement.id), "add");
	results.push(
		"stack measurements, inert limit, F6 round-trip, Shift+Tab, action without dismissal"
	);

	await reset();
	await page.locator("#limit").click();
	await add(2);
	await page.keyboard.press("F6");
	await page.keyboard.press("Tab");
	await page.keyboard.press("Escape");
	await waitCount(1);
	assert.equal(await activeSlot(), "toast");
	assert.equal(await cards.first().evaluate((el) => el.inert), false);
	await page.keyboard.press("Escape");
	await waitCount(0);
	assert.equal(await page.evaluate(() => document.activeElement.id), "add");
	results.push("keyboard dismissal focuses newly revealed inert toast and restores external focus");

	await reset();
	await add();
	assert.equal(await viewport.getAttribute("aria-live"), "polite");
	assert.equal(await cards.first().getAttribute("role"), "dialog");
	const titleId = await cards.first().getAttribute("aria-labelledby");
	assert.equal(await page.locator(`[id="${titleId}"]`).textContent(), "Event 1");
	await page.locator("#urgent").click();
	assert.match(await page.getByRole("alert").textContent(), /Urgent event.*Immediate attention/s);
	assert.equal(await cards.first().getAttribute("aria-hidden"), "true");
	await page.keyboard.press("F6");
	assert.equal(await cards.first().getAttribute("aria-hidden"), null);
	assert.equal(await page.getByRole("alert").count(), 0);
	await page.keyboard.press("F6");
	results.push(
		"polite live region, linked title, assertive announcement and focused accessibility tree"
	);

	await reset();
	await page.locator("#loading").click();
	assert.match(await cards.first().textContent(), /Loading event/);
	await page.waitForFunction(
		() => document.querySelector("[data-slot=toast]")?.getAttribute("data-type") === "success"
	);
	assert.equal(await cards.count(), 1);
	assert.match(await cards.first().textContent(), /Success event/);
	results.push("promise updates one toast from loading to success");

	await reset();
	await add();
	let box = await cards.first().boundingBox();
	await page.mouse.move(box.x + 35, box.y + 30);
	await page.mouse.down();
	await page.mouse.move(box.x + 45, box.y + 30);
	await page.mouse.move(box.x + 120, box.y + 30, { steps: 5 });
	assert.equal(await cards.first().getAttribute("data-swipe-direction"), "right");
	await page.mouse.up();
	assert.equal(await cards.first().getAttribute("data-ending-style"), "");
	await waitCount(0);
	results.push("native mouse drag dismisses after actual exit transition");

	await reset();
	await page.locator("#timed").click();
	await page.waitForTimeout(550);
	await cards.first().hover();
	await page.waitForTimeout(1400);
	assert.equal(await cards.count(), 1);
	await page.mouse.move(20, 20);
	await waitCount(0);
	results.push("hover pauses timer, leaving resumes expiry");

	await reset();
	await page.locator("#hover-removal").click();
	await page.waitForTimeout(550);
	await cards.first().hover();
	await waitCount(1);
	await page.mouse.move(20, 20);
	await waitCount(0);
	results.push("removing hovered toast then moving outside resumes remaining timer");

	await reset();
	await page.setViewportSize({ width: 390, height: 844 });
	const cdp = await page.context().newCDPSession(page);
	await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 1 });
	const touch = async (type, x, y) =>
		cdp.send("Input.dispatchTouchEvent", {
			type,
			touchPoints: type === "touchEnd" || type === "touchCancel" ? [] : [{ x, y, id: 1 }],
		});
	await add(2);
	box = await cards.first().boundingBox();
	let x = box.x + 40,
		y = box.y + 30;
	await touch("touchStart", x, y);
	await touch("touchEnd", x, y);
	assert.equal(await viewport.getAttribute("data-expanded"), "");
	await touch("touchStart", 20, 300);
	await touch("touchEnd", 20, 300);
	assert.equal(await viewport.getAttribute("data-expanded"), null);
	box = await cards.first().boundingBox();
	x = box.x + 40;
	y = box.y + 30;
	await touch("touchStart", x, y);
	await touch("touchMove", x + 10, y);
	await touch("touchMove", x + 90, y);
	assert.equal(await cards.first().getAttribute("data-swiping"), "");
	await touch("touchCancel", x + 90, y);
	await page.waitForTimeout(550);
	assert.equal(await cards.count(), 2);
	assert.equal(await cards.first().getAttribute("data-swiping"), null);
	box = await cards.first().boundingBox();
	x = box.x + 40;
	y = box.y + 30;
	await touch("touchStart", x, y);
	await touch("touchMove", x + 10, y);
	await touch("touchMove", x + 95, y);
	await touch("touchEnd", x + 95, y);
	await waitCount(1);
	await touch("touchStart", 20, 300);
	await touch("touchEnd", 20, 300);
	assert.equal(await viewport.getAttribute("data-expanded"), null);
	results.push(
		"native mobile touch expands, outside touch collapses, cancellation preserves toast, swipe dismisses"
	);
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.locator("#close").click();
	await waitCount(0);
	await add();
	assert.equal(await cards.first().evaluate((el) => getComputedStyle(el).transitionDuration), "0s");
	await page.locator("#close").click();
	await waitCount(0);
	results.push("reduced motion removes transitions and completes dismissal");
	assert.deepEqual(errors, []);
	console.log(JSON.stringify({ passed: results, pageErrors: errors }, null, 2));
} finally {
	await browser.close();
}
