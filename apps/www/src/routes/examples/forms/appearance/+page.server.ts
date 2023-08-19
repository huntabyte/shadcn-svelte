import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "../$types";
import { appearanceFormSchema } from "./appearance-form.svelte";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(appearanceFormSchema)
	};
};
