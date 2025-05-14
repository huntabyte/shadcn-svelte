import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { derived, get, writable } from "svelte/store";
import { twMerge } from "tailwind-merge";
import { error } from "@sveltejs/kit";
import { persisted } from "svelte-local-storage-store";
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLImgAttributes } from "svelte/elements";
import type { DocResolver } from "$lib/types/docs.js";
import { docs } from "$content/index.js";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const isBrowser = typeof document !== "undefined";

export function slugFromPath(path: string) {
	return path.replace("/src/content/", "").replace(".md", "");
}

export function hexToHsl(hex: string): [number, number, number] {
	if (hex) {
		const sanitizedHex = hex.replace("#", "");

		const red = Number.parseInt(sanitizedHex.substring(0, 2), 16);
		const green = Number.parseInt(sanitizedHex.substring(2, 4), 16);
		const blue = Number.parseInt(sanitizedHex.substring(4, 6), 16);

		const normalizedRed = red / 255;
		const normalizedGreen = green / 255;
		const normalizedBlue = blue / 255;

		const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
		const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

		let hue, saturation, lightness;

		if (max === min) {
			hue = 0;
		} else if (max === normalizedRed) {
			hue = ((normalizedGreen - normalizedBlue) / (max - min)) % 6;
		} else if (max === normalizedGreen) {
			hue = (normalizedBlue - normalizedRed) / (max - min) + 2;
		} else {
			hue = (normalizedRed - normalizedGreen) / (max - min) + 4;
		}

		hue = Math.round(hue * 60);

		if (hue < 0) {
			hue += 360;
		}

		lightness = (max + min) / 2;

		if (max === min) {
			saturation = 0;
		} else if (lightness <= 0.5) {
			saturation = (max - min) / (max + min);
		} else {
			saturation = (max - min) / (2 - max - min);
		}

		saturation = Math.round(saturation * 100);
		lightness = Math.round(lightness * 100);

		return [hue, saturation, lightness];
	}
	return [0, 0, 0];
}

export function hexToRgb(hex: string): [number, number, number] {
	if (hex) {
		const sanitizedHex = hex.replace("#", "");

		const red = Number.parseInt(sanitizedHex.substring(0, 2), 16);
		const green = Number.parseInt(sanitizedHex.substring(2, 4), 16);
		const blue = Number.parseInt(sanitizedHex.substring(4, 6), 16);

		return [red, green, blue];
	}
	return [0, 0, 0];
}

export function createCopyCodeButton() {
	const codeString = writable("");
	const copied = writable(false);
	let copyTimeout = 0;

	function copyCode() {
		if (!isBrowser) return;
		navigator.clipboard.writeText(get(codeString));
		copied.set(true);
		clearTimeout(copyTimeout);
		copyTimeout = window.setTimeout(() => {
			copied.set(false);
		}, 2500);
	}

	function setCodeString(node: HTMLElement) {
		codeString.set(node.innerText.trim() ?? "");
	}

	return {
		copied,
		copyCode,
		setCodeString,
		codeString,
	};
}

export function updateTheme(activeTheme: string, path: string) {
	if (!isBrowser) return;
	document.body.classList.forEach((className) => {
		if (className.match(/^theme.*/)) {
			document.body.classList.remove(className);
		}
	});

	const theme = path === "/themes" ? activeTheme : null;
	if (theme) {
		return document.body.classList.add(`theme-${theme}`);
	}
}

type Modules = Record<string, () => Promise<unknown>>;

function findMatch(slug: string, modules: Modules) {
	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}
	if (!match.path) {
		match = getIndexDocIfExists(slug, modules);
	}

	return match;
}

function getIndexDocIfExists(slug: string, modules: Modules) {
	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (path.includes(`/${slug}/index.md`)) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}

	return match;
}

export async function getDoc(slug: string) {
	const modules = import.meta.glob(`/src/content/**/*.md`);
	const match = findMatch(slug, modules);
	const doc = await match?.resolver?.();

	const metadata = docs.find((doc) => doc.path === slug);
	if (!doc || !metadata) {
		error(404);
	}

	return {
		component: doc.default,
		metadata,
		title: metadata.title,
	};
}

export function slugFromPathname(pathname: string) {
	return pathname.split("/").pop() ?? "";
}

const liftMode = persisted<string[]>("lift-mode", []);

export function getLiftMode(name: string) {
	function toggleLiftMode(name: string) {
		liftMode.update((prev) => {
			return prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
		});
	}

	const isLiftMode = derived(liftMode, ($configStore) => $configStore.includes(name));

	return {
		isLiftMode,
		toggleLiftMode,
	};
}

// Wrappers around svelte's `HTMLAttributes` types to add a `ref` prop can be bound to
// to get a reference to the underlying DOM element the component is rendering.
export type PrimitiveDivAttributes = WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type PrimitiveElementAttributes = WithElementRef<HTMLAttributes<HTMLElement>>;
export type PrimitiveAnchorAttributes = WithElementRef<HTMLAnchorAttributes>;
export type PrimitiveHeadingAttributes = WithElementRef<HTMLAttributes<HTMLHeadingElement>>;
export type PrimitiveTableSectionAttributes = WithElementRef<
	HTMLAttributes<HTMLTableSectionElement>
>;
export type PrimitiveImgAttributes = WithElementRef<HTMLImgAttributes>;
