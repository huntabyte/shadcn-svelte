import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { error } from "@sveltejs/kit";
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
	if (!doc || !metadata || !("default" in doc)) {
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
