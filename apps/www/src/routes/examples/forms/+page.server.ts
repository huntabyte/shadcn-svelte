import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { profileFormSchema } from "./profile-form.svelte";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(profileFormSchema)
	};
};
