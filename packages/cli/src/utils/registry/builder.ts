import { DEFAULT_CONFIG } from "../config/schema.js";
import { error } from "../errors.js";
import type { RawConfig } from "../config/schema.js";
import type { RegistryRequest } from "./fetcher.js";

const REGISTRY_PATTERN = /^(@[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?)\/(.+)$/;

export function buildRegistryRequest(
	name: string,
	config: Pick<RawConfig, "registries" | "style"> = {},
	env: NodeJS.ProcessEnv = process.env
): RegistryRequest | undefined {
	if (!name.startsWith("@")) return;

	const match = name.match(REGISTRY_PATTERN);
	if (!match) throw error(`Invalid registry item '${name}'. Use @namespace/name.`);
	const [, namespace, item] = match as [string, string, string];
	const entry = config.registries?.[namespace];
	if (!entry) {
		throw error(
			`Registry '${namespace}' is not configured. Add it to 'registries' in components.json.`
		);
	}

	const registry = typeof entry === "string" ? { url: entry } : entry;
	const values = [
		registry.url,
		...Object.values(registry.headers ?? {}),
		...Object.values(registry.params ?? {}),
	];
	const missing = new Set<string>();
	for (const value of values) {
		for (const match of value.matchAll(/\$\{(\w+)\}/g)) {
			if (!env[match[1]!]) missing.add(match[1]!);
		}
	}
	if (missing.size) {
		throw error(
			`Registry '${namespace}' requires environment variables: ${[...missing].join(", ")}. Set them in your environment or .env.local.`
		);
	}

	const interpolate = (value: string) =>
		value.replace(/\$\{(\w+)\}/g, (_, key: string) => env[key] ?? "");
	let url: URL;
	try {
		url = new URL(
			interpolate(registry.url)
				.replaceAll("{name}", () => item)
				.replaceAll("{style}", () => config.style ?? DEFAULT_CONFIG.style)
		);
		if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
		for (const [key, value] of Object.entries(registry.params ?? {})) {
			const resolved = interpolate(value);
			if (resolved) url.searchParams.append(key, resolved);
		}
	} catch {
		throw error(`Registry '${namespace}' must resolve to a valid HTTP or HTTPS URL.`);
	}

	const headers: Record<string, string> = {};
	for (const [key, value] of Object.entries(registry.headers ?? {})) {
		const resolved = interpolate(value);
		if (resolved.trim()) headers[key] = resolved;
	}

	return { url, headers, label: name };
}
