import Root from "./form.svelte";
import Description from "./form-description.svelte";
import Field from "./form-field.svelte";
import Label from "./form-label.svelte";
import Message from "./form-message.svelte";
import type { Writable } from "svelte/store";

export type FormFieldContext = {
	name: string;
	formItemId: string;
	formDescriptionId: string;
	formMessageId: string;
	errors: Writable<string[] | undefined>;
};

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
