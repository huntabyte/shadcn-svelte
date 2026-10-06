import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const engine = vi.hoisted(() => ({ custom: vi.fn(), dismiss: vi.fn() }));
vi.mock("svelte-sonner", () => ({ toast: engine }));
vi.mock("../src/lib/registry/ui/toast/toast.svelte", () => ({ default: {} }));
import { createToastManager } from "../src/lib/registry/ui/toast/toast-manager.js";

beforeEach(() => {
	vi.clearAllMocks();
	vi.stubGlobal("window", {});
});
afterEach(() => vi.unstubAllGlobals());
const latest = () => engine.custom.mock.calls.at(-1)![1];

describe("toast manager adapter", () => {
	it("isolates matching public IDs and dismissal across managers", () => {
		const first = createToastManager();
		const second = createToastManager();
		first.add({ id: "same", title: "First" });
		const firstId = latest().id;
		second.add({ id: "same", title: "Second" });
		expect(latest().id).not.toBe(firstId);
		first.close();
		expect(engine.dismiss).toHaveBeenCalledExactlyOnceWith(firstId);
		expect(latest().toasterId).toBe(second.toasterId);
	});
	it("updates a stable ID, preserves omitted fields, and allows explicit clearing", () => {
		const manager = createToastManager();
		const id = manager.add({ title: "First", description: "Details", timeout: 0 });
		const engineId = latest().id;
		manager.update(id, { title: "Updated", description: undefined });
		expect(latest()).toMatchObject({
			id: engineId,
			duration: Infinity,
			componentProps: { item: { title: "Updated", timeout: 0 } },
		});
		expect(latest().componentProps.item.description).toBeUndefined();
		manager.add({ id, title: "Updated again" });
		expect(latest().id).toBe(engineId);
	});
	it("notifies exactly once across manual and engine dismissal", () => {
		const manager = createToastManager();
		const onClose = vi.fn();
		const id = manager.add({ title: "Close", onClose });
		const callback = latest().onDismiss;
		manager.close(id);
		callback();
		manager.close(id);
		expect(onClose).toHaveBeenCalledOnce();
		manager.update(id, { title: "Cannot resurrect" });
		expect(engine.custom).toHaveBeenCalledOnce();
	});
	it("handles expiration once and protects a reused ID from stale callbacks", () => {
		const manager = createToastManager();
		const oldClose = vi.fn();
		manager.add({ id: "reuse", title: "Old", onClose: oldClose });
		const stale = latest().onAutoClose;
		stale();
		const newClose = vi.fn();
		manager.add({ id: "reuse", title: "New", onClose: newClose });
		stale();
		expect(oldClose).toHaveBeenCalledOnce();
		expect(newClose).not.toHaveBeenCalled();
		manager.close("reuse");
		expect(newClose).toHaveBeenCalledOnce();
	});
	it("settles promises without retaining loading-only fields", async () => {
		const manager = createToastManager();
		const pending = manager.promise(Promise.resolve(42), {
			loading: {
				title: "Loading",
				description: "Temporary",
				timeout: 0,
				actionProps: { children: "Wait" },
			},
			success: (value) => `Saved ${value}`,
			error: "Failed",
		});
		expect(latest().duration).toBe(Infinity);
		await expect(pending).resolves.toBe(42);
		expect(latest().duration).toBeUndefined();
		expect(latest().componentProps.item).toMatchObject({ title: "Saved 42", type: "success" });
		expect(latest().componentProps.item.description).toBeUndefined();
		expect(latest().componentProps.item.actionProps).toBeUndefined();
	});
	it("renders errors and propagates rejection", async () => {
		const manager = createToastManager();
		const error = new Error("Failed task");
		await expect(
			manager.promise(() => Promise.reject(error), {
				loading: "Loading",
				success: "Done",
				error: (reason) => ({ title: "Failed", description: String(reason) }),
			})
		).rejects.toBe(error);
		expect(latest().componentProps.item).toMatchObject({
			type: "error",
			title: "Failed",
			description: "Error: Failed task",
		});
	});
	it("does not resurrect a promise dismissed while pending", async () => {
		const manager = createToastManager();
		let resolve!: (value: string) => void;
		const task = new Promise<string>((done) => {
			resolve = done;
		});
		const pending = manager.promise(task, { loading: "Loading", success: "Done", error: "Failed" });
		manager.close();
		resolve("Result");
		await pending;
		expect(engine.custom).toHaveBeenCalledOnce();
	});
	it("does not publish or retain server notifications", () => {
		vi.stubGlobal("window", undefined);
		const manager = createToastManager();
		const id = manager.add({ title: "Server" });
		vi.stubGlobal("window", {});
		manager.update(id, { title: "Client" });
		manager.close();
		expect(engine.custom).not.toHaveBeenCalled();
		expect(engine.dismiss).not.toHaveBeenCalled();
	});
});
