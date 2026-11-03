import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createToastManager } from "../src/lib/registry/ui/toast/toast-manager.js";
import { createToastStore } from "../src/lib/registry/ui/toast/toast-store.js";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());
function setup(timeout = 5000, limit = 3) {
	const manager = createToastManager();
	const store = createToastStore();
	store.configure(timeout, limit);
	const detach = store.attach(manager);
	return { manager, store, detach };
}
describe("Base UI toast lifecycle", () => {
	it("does not retain notifications before a provider subscribes", () => {
		const manager = createToastManager();
		const id = manager.add({ title: "No provider" });
		const store = createToastStore();
		store.attach(manager);
		manager.update(id, { title: "Cannot resurrect" });
		expect(store.toasts).toEqual([]);
	});
	it("isolates providers and matching explicit IDs", () => {
		const first = setup(),
			second = setup();
		first.manager.add({ id: "same", title: "First" });
		second.manager.add({ id: "same", title: "Second" });
		first.manager.close();
		expect(first.store.toasts[0].transitionStatus).toBe("ending");
		expect(second.store.toasts[0].transitionStatus).toBe("starting");
	});
	it("upserts an ID in place, increments updateKey, and resets the timer", () => {
		const { manager, store } = setup();
		manager.add({ id: "old", title: "First" });
		manager.add({ id: "new", title: "New" });
		vi.advanceTimersByTime(4000);
		manager.add({ id: "old", title: "Updated" });
		expect(store.toasts.map((item) => item.id)).toEqual(["new", "old"]);
		expect(store.toasts[1].updateKey).toBe(1);
		vi.advanceTimersByTime(1000);
		expect(store.toasts[0].transitionStatus).toBe("ending");
		expect(store.toasts[1].transitionStatus).not.toBe("ending");
		vi.advanceTimersByTime(4000);
		expect(store.toasts[1].transitionStatus).toBe("ending");
	});
	it("supports functional updates, custom types/data and explicit clearing", () => {
		const { manager, store } = setup();
		const id = manager.add({ title: "First", description: "Details", data: { count: 1 } });
		manager.update(id, (previous) => ({
			title: `${previous.title} updated`,
			description: undefined,
			type: "custom",
			data: { count: Number((previous.data as { count: number })?.count) + 1 },
		}));
		expect(store.toasts[0]).toMatchObject({
			id,
			title: "First updated",
			type: "custom",
			data: { count: 2 },
		});
		expect(store.toasts[0].description).toBeUndefined();
	});
	it("keeps limited toasts and recomputes visibility when the limit changes or a toast closes", () => {
		const { manager, store } = setup(0, 2);
		for (const id of ["1", "2", "3", "4"]) manager.add({ id });
		expect(store.toasts.map((item) => item.limited)).toEqual([false, false, true, true]);
		manager.close("4");
		expect(store.toasts.find((item) => item.id === "2")?.limited).toBe(false);
		store.configure(0, 1);
		expect(store.toasts.find((item) => item.id === "2")?.limited).toBe(true);
	});
	it("separates once-only close and animation-complete remove callbacks", () => {
		const { manager, store } = setup();
		const onClose = vi.fn(),
			onRemove = vi.fn();
		const id = manager.add({ onClose, onRemove });
		manager.close(id);
		manager.close(id);
		expect(onClose).toHaveBeenCalledOnce();
		expect(onRemove).not.toHaveBeenCalled();
		store.remove(id);
		store.remove(id);
		expect(onRemove).toHaveBeenCalledOnce();
		expect(store.toasts).toEqual([]);
	});
	it("ignores updates to closing toasts, including updater side effects", () => {
		const { manager, store } = setup();
		const id = manager.add({ title: "First" });
		manager.close(id);
		const updater = vi.fn(() => ({ title: "Resurrect" }));
		manager.update(id, updater);
		expect(updater).not.toHaveBeenCalled();
		expect(store.toasts[0].title).toBe("First");
	});
	it("re-adding a closing ID starts a fresh lifecycle and protects it from stale removal", () => {
		const { manager, store } = setup();
		const onRemove = vi.fn();
		manager.add({ id: "same", onRemove });
		manager.close("same");
		const ending = store.toasts[0];
		manager.add({ id: "same", title: "Fresh" });
		store.remove("same", ending);
		expect(onRemove).not.toHaveBeenCalled();
		expect(store.toasts[0].title).toBe("Fresh");
	});
	it("does not reset the timer for ordinary updates but resets an explicitly supplied timeout", () => {
		const { manager, store } = setup();
		const id = manager.add({ title: "First" });
		vi.advanceTimersByTime(4000);
		manager.update(id, { title: "Updated" });
		vi.advanceTimersByTime(1000);
		expect(store.toasts[0].transitionStatus).toBe("ending");
		manager.add({ id });
		vi.advanceTimersByTime(4000);
		manager.update(id, { timeout: 5000 });
		vi.advanceTimersByTime(1000);
		expect(store.toasts[0].transitionStatus).not.toBe("ending");
	});
	it("preserves the remaining timeout across repeated hover and keyboard pauses", () => {
		const { manager, store } = setup();
		manager.add({ title: "Timer" });
		vi.advanceTimersByTime(1000);
		store.setHovering(true);
		vi.advanceTimersByTime(10000);
		store.setHovering(false);
		vi.advanceTimersByTime(1000);
		store.setFocused(true);
		vi.advanceTimersByTime(10000);
		store.setFocused(false);
		vi.advanceTimersByTime(2999);
		expect(store.toasts[0].transitionStatus).not.toBe("ending");
		vi.advanceTimersByTime(1);
		expect(store.toasts[0].transitionStatus).toBe("ending");
	});
	it("does not start newly added timers while the window is unfocused", () => {
		const { manager, store } = setup();
		store.setWindowFocused(false);
		manager.add({});
		vi.advanceTimersByTime(10000);
		expect(store.toasts[0].transitionStatus).not.toBe("ending");
		store.setWindowFocused(true);
		vi.advanceTimersByTime(5000);
		expect(store.toasts[0].transitionStatus).toBe("ending");
	});
	it("never expires loading toasts or zero-timeout toasts", () => {
		const { manager, store } = setup();
		manager.add({ type: "loading" });
		manager.add({ timeout: 0 });
		vi.advanceTimersByTime(60000);
		expect(store.toasts.every((item) => item.transitionStatus !== "ending")).toBe(true);
	});
	it("settles promises on the same ID and restores the provider timeout", async () => {
		const { manager, store } = setup();
		const pending = manager.promise(Promise.resolve(42), {
			loading: { title: "Loading", description: "Retained like Base UI", timeout: 0 },
			success: (value) => `Saved ${value}`,
			error: "Failed",
		});
		const id = store.toasts[0].id;
		expect(store.toasts[0].type).toBe("loading");
		await expect(pending).resolves.toBe(42);
		expect(store.toasts[0]).toMatchObject({
			id,
			title: "Saved 42",
			type: "success",
			description: "Retained like Base UI",
		});
		vi.advanceTimersByTime(5000);
		expect(store.toasts[0].transitionStatus).toBe("ending");
	});
	it("renders errors and propagates rejection", async () => {
		const { manager, store } = setup();
		const error = new Error("Failed task");
		await expect(
			manager.promise(Promise.reject(error), {
				loading: "Loading",
				success: "Done",
				error: (reason) => ({ title: "Failed", description: String(reason) }),
			})
		).rejects.toBe(error);
		expect(store.toasts[0]).toMatchObject({
			type: "error",
			title: "Failed",
			description: "Error: Failed task",
		});
	});
	it("does not resurrect a dismissed promise", async () => {
		const { manager, store } = setup();
		let resolve!: (value: string) => void;
		const pending = manager.promise(
			new Promise<string>((done) => {
				resolve = done;
			}),
			{ loading: "Loading", success: "Done", error: "Failed" }
		);
		manager.close();
		resolve("Result");
		await pending;
		expect(store.toasts[0]).toMatchObject({ title: "Loading", transitionStatus: "ending" });
	});
	it("clears timers on provider disposal", () => {
		const { manager, store, detach } = setup();
		const onClose = vi.fn();
		manager.add({ onClose });
		detach();
		store.dispose();
		vi.advanceTimersByTime(10000);
		expect(onClose).not.toHaveBeenCalled();
	});
});
