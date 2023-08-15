import Root from "./form.svelte";
import Description from "./form-description.svelte";
import Field from "./form-field.svelte";
import Label from "./form-label.svelte";
import Message from "./form-message.svelte";

import { setContext } from "svelte";
import type { FieldAttrs, Form, FormFieldContext, FormStores } from "./types";
import { formFieldProxy } from "sveltekit-superforms/client";
import type { AnyZodObject, z } from "zod";

import type {
	FormPathLeaves,
	UnwrapEffects,
	ZodValidation
} from "sveltekit-superforms";

export const FORM_CONTROL_CONTEXT = "FormFieldControl";
export const FORM_FIELD_CONTEXT = "FormField";

export function createFormField<
	T extends ZodValidation<AnyZodObject>,
	Path extends FormPathLeaves<z.infer<UnwrapEffects<T>>>
>(
	form: Form<T>,
	name: Path
): {
	stores: FormStores<T, Path>;
	getFieldAttrs: <T>(val: T, errors: string[] | undefined) => FieldAttrs<T>;
} {
	const id = Math.random().toString(36).slice(2);
	const stores = formFieldProxy<T, Path>(form.form, name);
	const { errors } = stores;

	const context: FormFieldContext = {
		formItemId: id,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		name,
		errors
	};
	setContext(FORM_FIELD_CONTEXT, context);

	function getFieldAttrs<T>(val: T, errors: string[] | undefined) {
		return {
			"aria-invalid": errors ? true : undefined,
			"aria-describedby": !errors
				? context.formDescriptionId
				: `${context.formDescriptionId} ${context.formMessageId}`,
			"data-invalid": errors ? true : undefined,
			"data-valid": errors ? undefined : true,
			name,
			id: context.formItemId,
			value: val
		};
	}

	return {
		stores,
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
