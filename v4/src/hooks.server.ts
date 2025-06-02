import { dev } from "$app/environment";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	if (dev && event.url.pathname === "/.well-known/appspecific/com.chrome.devtools.json") {
		return new Response(undefined, { status: 404 });
	}
	return resolve(event);
};
