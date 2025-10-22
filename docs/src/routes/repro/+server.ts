import { redirect } from "@sveltejs/kit";

export function GET() {
	redirect(303, "https://stackblitz.com/github/huntabyte/shadcn-svelte/tree/main/repro");
}
