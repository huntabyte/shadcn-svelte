import type { StoreValue } from "@melt-ui/svelte";
import { nanoid } from "nanoid/non-secure";
import type { Writable } from "svelte/store";
import type { Builder } from "./types";
import type { ActionReturn } from "svelte/action";

export function noop() {
	// do nothing
}

export function generateId() {
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

type BuilderActionsParams = {
	builders: Builder[];
};

type BuilderActionsReturn = {
	destroy: () => void;
};

export function builderActions(
	node: HTMLElement,
	params: BuilderActionsParams
): BuilderActionsReturn {
	const unsubs: ActionReturn[] = [];
	params.builders.forEach((builder) => {
		const act = builder.action(node);
		if (act) {
			unsubs.push(act);
		}
	});
	return {
		destroy: () => {
			unsubs.forEach((unsub) => {
				if (unsub.destroy) {
					unsub.destroy();
				}
			});
		}
	};
}

export function getAttrs(builders: Builder[]) {
	const attrs: Record<string, unknown | undefined> = {};
	builders.forEach((builder) => {
		Object.keys(builder).forEach((key) => {
			if (key !== "action") {
				attrs[key] = builder[key];
			}
		});
	});
	return attrs;
}
