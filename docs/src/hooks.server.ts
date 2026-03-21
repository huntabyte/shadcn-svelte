import type { Handle } from "@sveltejs/kit";
import { parseUserConfig } from "$lib/user-config.svelte.js";

function escapeHtmlAttribute(value: string): string {
	return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

export const handle: Handle = async ({ event, resolve }) => {
	const userConfig = parseUserConfig(event.request.headers.get("cookie") ?? "");

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace("%lang%", escapeHtmlAttribute(userConfig.languageTag))
				.replace("%dir%", userConfig.direction),
	});
};
