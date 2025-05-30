import { getDoc } from "$lib/docs.js";

export async function load({ params }) {
	return await getDoc(params.slug);
}
