import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";
import { defaultValues, profileFormSchema } from "./schema";

export const load: PageServerLoad = async () => {
	const form = await superValidate(defaultValues, profileFormSchema);

	return {
		form
	};
};
