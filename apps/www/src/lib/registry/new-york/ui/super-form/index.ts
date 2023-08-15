import Root from "./form.svelte";
import Description from "./form-description.svelte";
import Field from "./form-field.svelte";
import Label from "./form-label.svelte";
import Message from "./form-message.svelte";
import { setContext } from "svelte";
import type { FormFieldName, Form, FormFieldContext } from "./types";
import { formFieldProxy } from "sveltekit-superforms/client";
import type { AnyZodObject, z } from "zod";
import type { StoresValues, Writable } from "svelte/store";

// function createValueWithType<T extends AnyZodObject, U extends keyof z.infer<T>>(schema: T, name: U): Writable<z.infer<T>[U]> {
//     return schema[name]
// }

type ValueWithType<
	T extends AnyZodObject,
	U extends keyof z.infer<T>
> = Writable<z.infer<T>[U]>;

export function createFormField<T extends AnyZodObject>(
	form: Form<T>,
	name: FormFieldName<T>
) {
	type ValueType = ValueWithType<T, typeof name>;

	const id = Math.random().toString(36).slice(2);
	const stores = formFieldProxy(form.form, name);
	const { errors, value } = stores;

	const context: FormFieldContext = {
		formItemId: id,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		name,
		errors
	};
	setContext("FormField", context);

	function getFieldAttrs(
		val: StoresValues<typeof stores.value>,
		errors: string[] | undefined
	) {
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
		value: value as ValueType,
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
