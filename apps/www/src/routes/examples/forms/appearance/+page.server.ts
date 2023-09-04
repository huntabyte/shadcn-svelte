import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "../$types";
import { appearanceFormSchema } from "./appearance-form.svelte";
import { fail, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(appearanceFormSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, appearanceFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
