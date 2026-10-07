import { mount, unmount, tick } from "svelte";
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Composition from "./fixtures/toast-composition.svelte";
import Toaster from "../src/lib/registry/ui/toast/toaster.svelte";
import { createToastManager } from "../src/lib/registry/ui/toast/toast-manager.js";
vi.mock("$lib/components/icon-placeholder/icon-placeholder.svelte", async () => ({
	default: (await import("./fixtures/toast-icon.svelte")).default,
}));
vi.mock("$lib/registry/ui/button/index.js", () => ({ buttonVariants: () => "" }));
const mounted: ReturnType<typeof mount>[] = [];
let frames: (() => void)[];
beforeEach(() => {
	frames = [];
	vi.stubGlobal("requestAnimationFrame", (callback: () => void) => {
		frames.push(callback);
		return frames.length;
	});
	vi.stubGlobal(
		"ResizeObserver",
		class {
			observe() {}
			disconnect() {}
		}
	);
	HTMLElement.prototype.getAnimations = () => [];
});
afterEach(async () => {
	for (const component of mounted.splice(0)) await unmount(component);
	document.body.innerHTML = "";
	vi.unstubAllGlobals();
});
async function flush() {
	await tick();
	for (const frame of frames.splice(0)) frame();
	await tick();
}
function setup(custom = false) {
	const manager = createToastManager();
	const target = document.createElement("div");
	document.body.append(target);
	mounted.push(
		custom
			? mount(Composition, { target, props: { manager } })
			: mount(Toaster, { target, props: { toastManager: manager } })
	);
	return manager;
}
describe("toast primitives DOM", () => {
	it("portals, links accessible labels, and runs an action without implicit dismissal", async () => {
		const manager = setup();
		await flush();
		const action = vi.fn();
		manager.add({
			title: "Event",
			description: "Details",
			actionProps: { children: "Undo", onclick: action },
			timeout: 0,
		});
		await flush();
		const root = document.querySelector<HTMLElement>("[data-slot=toast]")!;
		expect(root.closest("[data-slot=toast-portal]")?.parentElement).toBe(document.body);
		expect(root.getAttribute("role")).toBe("dialog");
		expect(document.getElementById(root.getAttribute("aria-labelledby")!)?.textContent).toBe(
			"Event"
		);
		expect(document.getElementById(root.getAttribute("aria-describedby")!)?.textContent).toBe(
			"Details"
		);
		document.querySelector<HTMLButtonElement>("[data-slot=toast-action]")!.click();
		await flush();
		expect(action).toHaveBeenCalledOnce();
		expect(document.querySelector("[data-slot=toast]")).not.toBeNull();
	});
	it("renders arbitrary types and high priority through a separate assertive announcement", async () => {
		const manager = setup();
		await flush();
		manager.add({ type: "custom", title: "Urgent", priority: "high", timeout: 0 });
		await flush();
		const root = document.querySelector("[data-slot=toast]")!;
		expect(root.getAttribute("data-type")).toBe("custom");
		expect(root.getAttribute("role")).toBe("alertdialog");
		expect(root.getAttribute("aria-hidden")).toBe("true");
		expect(document.querySelector("[role=alert]")?.textContent).toContain("Urgent");
	});
	it("retains limited toasts as inert and hides them with the canonical attribute", async () => {
		const manager = setup();
		await flush();
		for (let index = 0; index < 4; index++) manager.add({ title: String(index), timeout: 0 });
		await flush();
		expect(document.querySelectorAll("[data-slot=toast]").length).toBe(4);
		expect(document.querySelector("[data-limited]")?.hasAttribute("inert")).toBe(true);
	});
	it("focuses with F6, expands, returns with Shift+Tab and restores focus on close-all", async () => {
		const manager = setup(true);
		await flush();
		const trigger = document.getElementById("trigger")!;
		trigger.focus();
		manager.add({ title: "Event", timeout: 0 });
		await flush();
		window.dispatchEvent(
			new KeyboardEvent("keydown", { key: "F6", bubbles: true, cancelable: true })
		);
		await flush();
		const viewport = document.querySelector<HTMLElement>("[data-slot=toast-viewport]")!;
		expect(document.activeElement).toBe(viewport);
		expect(viewport.hasAttribute("data-expanded")).toBe(true);
		viewport.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true, cancelable: true })
		);
		await flush();
		expect(document.activeElement).toBe(trigger);
		window.dispatchEvent(
			new KeyboardEvent("keydown", { key: "F6", bubbles: true, cancelable: true })
		);
		await flush();
		// jsdom does not update :focus-visible in response to keyboard events.
		vi.spyOn(viewport, "matches").mockImplementation((selector) => selector === ":focus-visible");
		manager.close();
		await flush();
		expect(document.activeElement).toBe(trigger);
	});
	it("works through custom root snippets, supports Escape, and unregisters portal on teardown", async () => {
		const manager = setup(true);
		await flush();
		manager.add({ title: "Custom", timeout: 0 });
		await flush();
		const root = document.querySelector<HTMLElement>("section[data-slot=toast]")!;
		expect(root).not.toBeNull();
		root.focus();
		root.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
		await flush();
		expect(document.querySelector("[data-slot=toast]")).toBeNull();
	});
	it("waits for the actual exit transition before invoking onRemove", async () => {
		const manager = setup();
		await flush();
		const onRemove = vi.fn();
		const id = manager.add({ title: "Exit", onRemove, timeout: 0 });
		await flush();
		let finish!: () => void;
		const finished = new Promise<void>((resolve) => {
			finish = resolve;
		});
		const root = document.querySelector<HTMLElement>("[data-slot=toast]")!;
		let ended = false;
		root.getAnimations = () => (ended ? [] : [{ finished } as unknown as Animation]);
		manager.close(id);
		await flush();
		expect(onRemove).not.toHaveBeenCalled();
		expect(root.hasAttribute("data-ending-style")).toBe(true);
		ended = true;
		finish();
		await flush();
		expect(onRemove).toHaveBeenCalledOnce();
		expect(document.querySelector("[data-slot=toast]")).toBeNull();
	});
});
