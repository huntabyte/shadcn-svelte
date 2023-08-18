import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";
import { accountFormSchema } from "./account-form.svelte";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(accountFormSchema)
	};
};
