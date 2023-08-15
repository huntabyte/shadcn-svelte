import Root from "./form.svelte";
import Description from "./form-description.svelte";
import Field from "./form-field.svelte";
import Label from "./form-label.svelte";
import Message from "./form-message.svelte";
import { setContext } from "svelte";
import type { FormFieldName, Form, FormValidation } from "./types";
import { formFieldProxy } from "sveltekit-superforms/client";

export function createField<T extends FormValidation>(
	form: Form<T>,
	name: FormFieldName<T>
) {
	const id = Math.random().toString(36).slice(2);
	const contextObj = {
		formItemId: id,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		name
	};
	setContext("FormField", contextObj);

	return {
		stores: formFieldProxy(form.form, name),
		context: contextObj
	};
}

export {
	Root,
	Description,
	Field,
	Label,
	Message,
	//
	Root as Form,
	Description as FormDescription,
	Field as FormField,
	Label as FormLabel,
	Message as FormMessage
};
