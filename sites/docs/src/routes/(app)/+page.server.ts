import { fail } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms";
import type { AnyZodObject } from "zod";
import type { Actions, PageServerLoad, RequestEvent } from "./$types.js";

import { formSchema } from "$lib/registry/example/form-demo.svelte";
import { formSchema as checkboxSingleSchema } from "$lib/registry/example/checkbox-form-single.svelte";
import { formSchema as radioGroupSchema } from "$lib/registry/example/radio-group-form.svelte";
import { formSchema as selectSchema } from "$lib/registry/example/select-form.svelte";
import { formSchema as switchSchema } from "$lib/registry/example/switch-form.svelte";
import { formSchema as textareaSchema } from "$lib/registry/example/textarea-form.svelte";
import { formSchema as comboboxFormSchema } from "$lib/registry/example/combobox-form.svelte";
import { formSchema as datePickerFormSchema } from "$lib/registry/example/date-picker-form.svelte";
import { formSchema as checkboxMultipleSchema } from "$lib/registry/example/checkbox-form-multiple.svelte";
import { formSchema as inputOtpSchema } from "$lib/registry/example/input-otp-form.svelte";

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
	const layoutCookie = event.cookies.get("PaneForge:layout");
	const collapsedCookie = event.cookies.get("PaneForge:collapsed");

	let layout: number[] | undefined;
	let collapsed: boolean | undefined;

	if (layoutCookie) layout = JSON.parse(layoutCookie);
	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);

	return { layout, collapsed };
};
