import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "../$types";
import { notificationsFormSchema } from "./notifications-form.svelte";
import { fail, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(notificationsFormSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(notificationsFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		return {
			form,
		};
	},
};
