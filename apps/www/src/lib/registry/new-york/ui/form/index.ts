import Root from "./form.svelte";
import Description from "./form-description.svelte";
import Field from "./form-field.svelte";
import Item from "./form-item.svelte";
import Label from "./form-label.svelte";
import Message from "./form-message.svelte";

import type { Readable, Writable } from "svelte/store";
import type { AnyZodObject } from "zod";
import type { InputConstraints } from "sveltekit-superforms";

export type FieldStore<T extends AnyZodObject> = Readable<{
	name: string;
	value: unknown;
	errors: string[];
	constraints: InputConstraints<T>;
}>;

export type FormFieldCtx = {
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
	Item,
	Label,
	Message,
	//
	Root as Form,
	Description as FormDescription,
	Field as FormField,
	Item as FormItem,
	Label as FormLabel,
	Message as FormMessage
};
