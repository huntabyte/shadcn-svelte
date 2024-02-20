import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { accountFormSchema } from "./account-form.svelte";
import { fail, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(accountFormSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(accountFormSchema));
		if (!form.valid) {
			console.log(form);
			return fail(400, {
				form,
			});
		}
		return {
			form,
		};
	},
};
