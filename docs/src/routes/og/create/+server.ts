import { redirect } from "@sveltejs/kit";
import { OG_IMAGE_BASE_URL } from "../og.js";

export function GET({ url }) {
	const destination = new URL("/create/og", OG_IMAGE_BASE_URL);
	// append the query params to the destination
	const destinationWithParams = new URL(destination);
	destinationWithParams.search = url.search;
	redirect(302, destinationWithParams.toString());
}
