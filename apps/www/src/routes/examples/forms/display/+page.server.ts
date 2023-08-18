import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "../$types";
import { displayFormSchema } from "./display-form.svelte";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(displayFormSchema)
	};
};
