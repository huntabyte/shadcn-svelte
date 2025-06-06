import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { LayoutServerLoad } from "./$types.js";

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
		inputOtp: await superValidate(zod(inputOtpSchema)),
	};
};

export const prerender = true;
