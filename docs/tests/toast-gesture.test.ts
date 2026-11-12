// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { swipeToast, type SwipeDirection } from "../src/lib/registry/ui/toast/toast-gesture.js";
import { createToastStore } from "../src/lib/registry/ui/toast/toast-store.js";
beforeEach(() =>
	vi.stubGlobal(
		"DOMMatrix",
		class {
			m41 = 0;
			m42 = 0;
			m11 = 1;
			m12 = 0;
		}
	)
);
afterEach(() => {
	document.body.innerHTML = "";
	vi.unstubAllGlobals();
});
function pointer(target: EventTarget, type: string, x: number, y = 0, movementX = 0, id = 1) {
	const event = new MouseEvent(type, {
		clientX: x,
		clientY: y,
		button: 0,
		bubbles: true,
		cancelable: true,
	});
	for (const [key, value] of Object.entries({
		pointerId: id,
		pointerType: "touch",
		movementX,
		movementY: 0,
	}))
		Object.defineProperty(event, key, { value });
	target.dispatchEvent(event);
}
function setup(directions: SwipeDirection[] = ["down", "right"]) {
	const store = createToastStore();
	const id = store.add({ title: "Gesture", timeout: 0 });
	const node = document.createElement("div");
	document.body.append(node);
	const onChange = vi.fn();
	const gesture = swipeToast(node, { store, id, directions, onChange });
	return { store, node, onChange, gesture };
}
describe("Base UI swipe behavior", () => {
	it("dismisses past40px and reports the permitted direction", () => {
		const { store, node, onChange, gesture } = setup();
		pointer(node, "pointerdown", 0);
		pointer(node, "pointermove", 10);
		pointer(node, "pointermove", 60, 0, 50);
		pointer(document, "pointerup", 60);
		expect(store.toasts[0].transitionStatus).toBe("ending");
		expect(onChange.mock.calls.at(-1)?.[2]).toBe("right");
		gesture.destroy();
	});
	it("does not dismiss a short swipe and resets its offset", () => {
		const { store, node, onChange, gesture } = setup();
		pointer(node, "pointerdown", 0);
		pointer(node, "pointermove", 10);
		pointer(node, "pointermove", 40, 0, 30);
		pointer(document, "pointerup", 40);
		expect(store.toasts[0].transitionStatus).not.toBe("ending");
		expect(onChange).toHaveBeenLastCalledWith(0, 0);
		gesture.destroy();
	});
	it("damps a forbidden direction rather than dismissing", () => {
		const { store, node, onChange, gesture } = setup();
		pointer(node, "pointerdown", 100);
		pointer(node, "pointermove", 90);
		pointer(node, "pointermove", 10, 0, -80);
		expect(Math.abs(onChange.mock.calls.at(-1)?.[0])).toBeLessThan(10);
		pointer(document, "pointerup", 10);
		expect(store.toasts[0].transitionStatus).not.toBe("ending");
		gesture.destroy();
	});
	it("cancels after reversing intent or receiving pointercancel", () => {
		const { store, node, gesture } = setup();
		pointer(node, "pointerdown", 0);
		pointer(node, "pointermove", 10);
		pointer(node, "pointermove", 100, 0, 90);
		pointer(node, "pointermove", 80, 0, -20);
		pointer(document, "pointerup", 80);
		expect(store.toasts[0].transitionStatus).not.toBe("ending");
		pointer(node, "pointerdown", 0);
		pointer(node, "pointermove", 10);
		pointer(node, "pointermove", 100, 0, 90);
		pointer(document, "pointercancel", 100);
		expect(store.toasts[0].transitionStatus).not.toBe("ending");
		gesture.destroy();
	});
	it("ignores interactive controls and additional touches", () => {
		const { store, node, onChange, gesture } = setup();
		const button = document.createElement("button");
		node.append(button);
		pointer(button, "pointerdown", 0);
		pointer(node, "pointermove", 10);
		pointer(node, "pointermove", 100);
		pointer(document, "pointerup", 100);
		expect(onChange).not.toHaveBeenCalled();
		pointer(node, "pointerdown", 0);
		pointer(node, "pointerdown", 0, 0, 0, 2);
		pointer(node, "pointermove", 10, 0, 0, 2);
		pointer(node, "pointermove", 100, 0, 90, 2);
		pointer(document, "pointerup", 100, 0, 0, 2);
		expect(store.toasts[0].transitionStatus).not.toBe("ending");
		gesture.destroy();
	});
	it("supports explicitly enabled left/up dismissal", () => {
		for (const direction of ["left", "up"] as const) {
			const { store, node, gesture } = setup([direction]);
			pointer(node, "pointerdown", 100, 100);
			pointer(node, "pointermove", 90, 90);
			pointer(node, "pointermove", 10, 10, -80);
			pointer(document, "pointerup", 10, 10);
			expect(store.toasts[0].transitionStatus).toBe("ending");
			gesture.destroy();
		}
	});
});
