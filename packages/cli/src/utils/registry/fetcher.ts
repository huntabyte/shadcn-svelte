import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import { CLIError, error } from "../errors.js";
import { getEnvProxy } from "../get-env-proxy.js";

export type RegistryRequest = {
	url: URL;
	headers: Record<string, string>;
	/** Use the item reference in errors so credentials in the URL are never printed. */
	label: string;
};

const MAX_REDIRECTS = 5;
const SAFE_REDIRECT_HEADERS = new Set(["accept", "user-agent"]);

async function fetchRegistryRequest(
	request: RegistryRequest,
	proxy: Partial<ReturnType<typeof createProxy>>
) {
	const origin = request.url.origin;
	let url = request.url;
	for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects++) {
		const headers =
			url.origin === origin
				? request.headers
				: Object.fromEntries(
						Object.entries(request.headers).filter(([name]) =>
							SAFE_REDIRECT_HEADERS.has(name.toLowerCase())
						)
					);
		const response = await fetch(url, { ...proxy, headers, redirect: "manual" });
		const location = response.headers.get("location");
		if (![301, 302, 303, 307, 308].includes(response.status) || !location) return response;
		url = new URL(location, url);
		if (url.protocol !== "http:" && url.protocol !== "https:") {
			throw error(`Invalid redirect while fetching ${request.label}.`);
		}
	}
	throw error(`Too many redirects while fetching ${request.label}.`);
}

export async function fetchRegistry(
	requests: Array<URL | string | RegistryRequest>
): Promise<unknown[]> {
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};

	const loaders = requests.map(async (request) => {
		const named = typeof request === "object" && "url" in request ? request : undefined;
		const label = named?.label ?? request;
		try {
			const response = named
				? await fetchRegistryRequest(named, proxy)
				: await fetch(request as URL | string, { ...proxy });
			if (!response.ok) {
				if (named) {
					const hint =
						response.status === 401 || response.status === 403
							? " Check your registry credentials and access permissions."
							: "";
					throw error(`Failed to fetch registry item ${label}: ${response.status}.${hint}`);
				}
				throw error(
					`Failed to fetch registry from ${label}: ${response.status} ${response.statusText}`
				);
			}

			try {
				return await response.json();
			} catch (e) {
				if (named) throw error(`Error parsing JSON response for ${label}.`);
				throw error(`Error parsing json response from ${label}: Error ${e}`);
			}
		} catch (e) {
			if (e instanceof CLIError) throw e;
			if (named) throw error(`Failed to fetch registry item ${label}.`);
			throw error("Failed to fetch registry.", e);
		}
	});

	return await Promise.all(loaders);
}
