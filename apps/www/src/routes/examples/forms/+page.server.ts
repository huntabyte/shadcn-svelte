import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { registerSchema } from "./schemas";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(registerSchema)
	};
};

export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, registerSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		console.log("Success!");

		return {
			status: 200
		};
	}
};
