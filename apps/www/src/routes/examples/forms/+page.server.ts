import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const registerSchema = z.object({
	name: z.string().min(1).max(64),
	email: z.string().email(),
	password: z.string().min(8).max(64),
	passwordConfirm: z.string().min(8).max(64)
});

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
