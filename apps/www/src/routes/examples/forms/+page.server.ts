import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { profileSchema } from "./schemas";

export const load: PageServerLoad = async () => {
	const defaultValues = {
		bio: "I like to code",
		urls: ["https://shadcn-svelte.com", "https://twitter.com/huntabyte"]
	};
	return {
		form: superValidate(defaultValues, profileSchema)
	};
};

export const actions: Actions = {
	updateProfile: async (event) => {
		const form = await superValidate(event, profileSchema);

		console.log(form);

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
