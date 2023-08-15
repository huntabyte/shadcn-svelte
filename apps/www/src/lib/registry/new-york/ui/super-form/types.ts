import type { Writable } from "svelte/store";
import type {
	FormPathLeaves,
	UnwrapEffects,
	ZodValidation
} from "sveltekit-superforms";
import type { SuperForm } from "sveltekit-superforms/client";
import type { AnyZodObject, z } from "zod";

export type Expand<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: O[K] }
		: never
	: T;

export type ExpandDeep<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: ExpandDeep<O[K]> }
		: never
	: T;

export type Form<T extends AnyZodObject> = {
	schema: T;
	form: SuperForm<T, unknown>;
};

export type FormValidation = ZodValidation<AnyZodObject>;
export type FormFieldName<T> = FormPathLeaves<z.infer<UnwrapEffects<T>>>;

export type FormFieldContext = {
	name: string;
	formItemId: string;
	formDescriptionId: string;
	formMessageId: string;
	errors: Writable<string[] | undefined>;
};
