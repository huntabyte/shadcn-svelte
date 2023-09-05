import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad, RequestEvent } from "./$types";
import { formSchema } from "@/registry/default/example/form-demo.svelte";
import { formSchema as checkboxSingleSchema } from "@/registry/default/example/checkbox-form-single.svelte";
import { formSchema as radioGroupSchema } from "@/registry/default/example/radio-group-form.svelte";
import { formSchema as selectSchema } from "@/registry/default/example/select-form.svelte";
import { formSchema as switchSchema } from "@/registry/default/example/switch-form.svelte";
import { formSchema as textareaSchema } from "@/registry/default/example/textarea-form.svelte";

import { fail } from "@sveltejs/kit";
import type { AnyZodObject } from "zod";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(formSchema),
		checkboxSingle: superValidate(checkboxSingleSchema),
		radioGroup: superValidate(radioGroupSchema),
		select: superValidate(selectSchema),
		switch: superValidate(switchSchema),
		textarea: superValidate(textareaSchema)
	};
};

export const actions: Actions = {
	username: async (e) => handleForm(e, formSchema),
	checkboxSingle: async (e) => handleForm(e, checkboxSingleSchema),
	radioGroup: async (e) => handleForm(e, radioGroupSchema),
	select: async (e) => handleForm(e, selectSchema),
	switch: async (e) => handleForm(e, switchSchema),
	textarea: async (e) => handleForm(e, textareaSchema)
};

async function handleForm(event: RequestEvent, schema: AnyZodObject) {
	const form = await superValidate(event, schema);
	if (!form.valid) {
		return fail(400, {
			form
		});
	}
	return {
		form
	};
}
