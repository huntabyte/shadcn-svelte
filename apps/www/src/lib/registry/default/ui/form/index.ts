import type { Writable } from "svelte/store";
import Description from "./form-description.svelte";
import Field from "./form-field.svelte";
import Label from "./form-label.svelte";
import Message from "./form-message.svelte";

export type FormFieldContext = {
	name: string;
	formItemId: string;
	formDescriptionId: string;
	formMessageId: string;
	errors: Writable<string[] | undefined>;
};

export {
	Field,
	Description,
	Label,
	Message,
	//
	Field as FormField,
	Description as FormDescription,
	Label as FormLabel,
	Message as FormMessage
};
