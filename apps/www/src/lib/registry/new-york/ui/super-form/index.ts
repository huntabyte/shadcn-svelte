import Root from "./form.svelte";
import Description from "./form-description.svelte";
import Field from "./form-field.svelte";
import Label from "./form-label.svelte";
import Message from "./form-message.svelte";
import { setContext } from "svelte";
import type {
	FormFieldName,
	Form,
	FormValidation,
	FormFieldContext
} from "./types";
import { formFieldProxy } from "sveltekit-superforms/client";
import type { z } from "zod";
import type { StoresValues } from "svelte/store";

export function createFormField<T extends FormValidation>(
	form: Form<T>,
	name: FormFieldName<T>
) {
	const id = Math.random().toString(36).slice(2);
	const stores = formFieldProxy(form.form, name);
	const { errors } = stores;

	const context: FormFieldContext = {
		formItemId: id,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		name,
		errors
	};
	setContext("FormField", context);

	type Schema = z.infer<typeof form.schema>;

	type FieldAttrs = {
		"aria-invalid"?: boolean;
		"aria-describedby"?: string;
		name: string;
		id: string;
		value: Schema[typeof name];
	};

	function getFieldAttrs(
		val: StoresValues<typeof stores.value>,
		errors: string[] | undefined
	): FieldAttrs {
		return {
			"aria-invalid": errors ? true : undefined,
			"aria-describedby": !errors
				? context.formDescriptionId
				: `${context.formDescriptionId} ${context.formMessageId}`,
			name,
			id: context.formItemId,
			value: val
		};
	}

	return {
		stores,
		context,
		getFieldAttrs
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
