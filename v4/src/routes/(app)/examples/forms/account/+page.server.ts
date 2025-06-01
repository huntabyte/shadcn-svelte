import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type Actions, fail } from "@sveltejs/kit";
import { accountFormSchema } from "./account-form.svelte";

export async function load() {
	return {
		form: await superValidate(zod(accountFormSchema)),
	};
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(accountFormSchema));
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
