import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "../$types";
import { notificationsFormSchema } from "./notifications-form.svelte";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(notificationsFormSchema)
	};
};
