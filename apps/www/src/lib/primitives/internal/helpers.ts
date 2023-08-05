import type { StoreValue } from "@melt-ui/svelte";
import { nanoid } from "nanoid/non-secure";
import type { Writable } from "svelte/store";

export function noop() {
	// do nothing
}

export function id() {
	return nanoid(10);
}

export function removeUndefined<T extends object>(obj: T): T {
	const result = {} as T;
	for (const key in obj) {
		const value = obj[key];
		if (value !== undefined) {
			result[key] = value;
		}
	}
	return result;
}

type Options = Record<string, Writable<unknown>>;

export function getOptionUpdater(options: Options) {
	return function <
		K extends keyof typeof options,
		V extends StoreValue<(typeof options)[keyof typeof options]>
	>(key: K, value: V | undefined) {
		if (value === undefined) return;
		const store = options[key];
		store.set(value as never);
	};
}
