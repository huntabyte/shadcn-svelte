// Source: https://github.com/joshnuss/svelte-local-storage-store
// https://github.com/joshnuss/svelte-local-storage-store/blob/master/index.ts
// Represents version v0.4.0 (2023-01-18)
import type { Writable } from "svelte/store";
import { BROWSER } from "esm-env";
import { get, writable as internal } from "svelte/store";

declare type Updater<T> = (value: T) => T;
declare type StoreDict<T> = { [key: string]: Writable<T> };

/* eslint-disable @typescript-eslint/no-explicit-any */
const stores: StoreDict<any> = {};

interface Serializer<T> {
	parse(text: string): T;
	stringify(object: T): string;
}

type StorageType = "local" | "session";

interface Options<T> {
	serializer?: Serializer<T>;
	storage?: StorageType;
}

function getStorage(type: StorageType) {
	return type === "local" ? localStorage : sessionStorage;
}

export function localStorageStore<T>(
	key: string,
	initialValue: T,
	options?: Options<T>
): Writable<T> {
	const serializer = options?.serializer ?? JSON;
	const storageType = options?.storage ?? "local";

	function updateStorage(key: string, value: T) {
		if (!BROWSER) return;

		getStorage(storageType).setItem(key, serializer.stringify(value));
	}

	if (!stores[key]) {
		const store = internal(initialValue, (set) => {
			const json = BROWSER ? getStorage(storageType).getItem(key) : null;

			if (json) {
				set(<T>serializer.parse(json));
			}

			if (BROWSER) {
				const handleStorage = (event: StorageEvent) => {
					if (event.key === key)
						set(
							event.newValue
								? serializer.parse(event.newValue)
								: null
						);
				};

				window.addEventListener("storage", handleStorage);

				return () =>
					window.removeEventListener("storage", handleStorage);
			}
		});

		const { subscribe, set } = store;

		stores[key] = {
			set(value: T) {
				updateStorage(key, value);
				set(value);
			},
			update(updater: Updater<T>) {
				const value = updater(get(store));

				updateStorage(key, value);
				set(value);
			},
			subscribe
		};
	}

	return stores[key];
}
