import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { LayoutServerLoad } from "./$types.js";

import { formSchema } from "$lib/registry/default/example/form-demo.svelte";
import { formSchema as checkboxSingleSchema } from "$lib/registry/default/example/checkbox-form-single.svelte";
import { formSchema as radioGroupSchema } from "$lib/registry/default/example/radio-group-form.svelte";
import { formSchema as selectSchema } from "$lib/registry/default/example/select-form.svelte";
import { formSchema as switchSchema } from "$lib/registry/default/example/switch-form.svelte";
import { formSchema as textareaSchema } from "$lib/registry/default/example/textarea-form.svelte";
import { formSchema as comboboxFormSchema } from "$lib/registry/default/example/combobox-form.svelte";
import { formSchema as datePickerFormSchema } from "$lib/registry/default/example/date-picker-form.svelte";
import { formSchema as checkboxMultipleSchema } from "$lib/registry/default/example/checkbox-form-multiple.svelte";

export const load: LayoutServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
		checkboxSingle: await superValidate(zod(checkboxSingleSchema)),
		checkboxMultiple: await superValidate(zod(checkboxMultipleSchema)),
		radioGroup: await superValidate(zod(radioGroupSchema)),
		select: await superValidate(zod(selectSchema)),
		switch: await superValidate(zod(switchSchema)),
		textarea: await superValidate(zod(textareaSchema)),
		combobox: await superValidate(zod(comboboxFormSchema)),
		datePicker: await superValidate(zod(datePickerFormSchema)),
	};
};

export const prerender = true;
