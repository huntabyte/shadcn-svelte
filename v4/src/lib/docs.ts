import {
	components,
	darkMode,
	gettingStarted,
	installation,
	migration,
	registry,
} from "$content/index.js";
import { error } from "@sveltejs/kit";
import type { Component } from "svelte";

const allDocs = [
	...gettingStarted,
	...migration,
	...components,
	...installation,
	...darkMode,
	...registry,
];

type DocResolver = () => Promise<{ default: Component; metadata: components }>;
type DocMetadata = (typeof allDocs)[number];

function transformPath(path: string) {
	return path.replace("/content/", "").replace(".md", "").replace("/index", "");
}

function getDocMetadata(slug: string): DocMetadata | undefined {
	return allDocs.find((doc) => doc.path === slug);
}

export async function getDoc(slug: string) {
	const modules = import.meta.glob("/content/**/*.md");

	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (transformPath(path) === slug) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}

	const doc = await match?.resolver?.();
	const metadata = getDocMetadata(slug);

	if (!doc || !metadata) {
		error(404, "Could not find the documentation page.");
	}

	return {
		component: doc.default,
		metadata,
	};
}
