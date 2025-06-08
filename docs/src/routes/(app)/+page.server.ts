import { fail } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms";
import type { AnyZodObject } from "zod";
import type { Actions, PageServerLoad, RequestEvent } from "./$types.js";

import { formSchema } from "$lib/registry/examples/form-demo.svelte";
import { formSchema as checkboxSingleSchema } from "$lib/registry/examples/checkbox-form-single.svelte";
import { formSchema as radioGroupSchema } from "$lib/registry/examples/radio-group-form.svelte";
import { formSchema as selectSchema } from "$lib/registry/examples/select-form.svelte";
import { formSchema as switchSchema } from "$lib/registry/examples/switch-form.svelte";
import { formSchema as textareaSchema } from "$lib/registry/examples/textarea-form.svelte";
import { formSchema as comboboxFormSchema } from "$lib/registry/examples/combobox-form.svelte";
import { formSchema as datePickerFormSchema } from "$lib/registry/examples/date-picker-form.svelte";
import { formSchema as checkboxMultipleSchema } from "$lib/registry/examples/checkbox-form-multiple.svelte";
import { formSchema as inputOtpSchema } from "$lib/registry/examples/input-otp-form.svelte";

export const actions: Actions = {
	username: async (e) => handleForm(e, formSchema),
	checkboxSingle: async (e) => handleForm(e, checkboxSingleSchema),
	checkboxMultiple: async (e) => handleForm(e, checkboxMultipleSchema),
	radioGroup: async (e) => handleForm(e, radioGroupSchema),
	select: async (e) => handleForm(e, selectSchema),
	switch: async (e) => handleForm(e, switchSchema),
	textarea: async (e) => handleForm(e, textareaSchema),
	combobox: async (e) => handleForm(e, comboboxFormSchema),
	datePicker: async (e) => handleForm(e, datePickerFormSchema),
	inputOtp: async (e) => handleForm(e, inputOtpSchema),
	layout: async ({ request, cookies }) => {
		const layout = (await request.formData()).get("layout");
		if (layout) cookies.set("layout", layout.toString(), { path: "/" });
		else cookies.set("layout", "full", { path: "/" });

		return layout;
	},
};

async function handleForm(event: RequestEvent, schema: AnyZodObject) {
	const form = await superValidate(event, zod(schema));
	if (!form.valid) {
		return fail(400, {
			form,
		});
	}
	return {
		form,
	};
}

export const load: PageServerLoad = async (event) => {
	const collapsedCookie = event.cookies.get("PaneForge:collapsed");

	let collapsed: boolean | undefined;

	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);

	return { collapsed };
};
