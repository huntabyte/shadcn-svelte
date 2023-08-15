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

export type Form<T extends ZodValidation<AnyZodObject>> = {
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

export type FormPathType<T, P extends string> = P extends keyof T
	? T[P]
	: P extends number
	? T
	: P extends `.${infer Rest}`
	? FormPathType<NonNullable<T>, Rest>
	: P extends `${number}]${infer Rest}`
	? NonNullable<T> extends (infer U)[]
		? FormPathType<U, Rest>
		: { invalid_path: P; Type: T }
	: P extends `${infer K}[${infer Rest}`
	? K extends keyof NonNullable<T>
		? FormPathType<NonNullable<T>[K], Rest>
		: FormPathType<T, Rest>
	: P extends `${infer K}.${infer Rest}`
	? K extends keyof NonNullable<T>
		? FormPathType<NonNullable<T>[K], Rest>
		: NonNullable<T> extends (infer U)[]
		? FormPathType<U, Rest>
		: { invalid_path: P; Type: T }
	: P extends `[${infer K}].${infer Rest}`
	? K extends number
		? T extends (infer U)[]
			? FormPathType<U, Rest>
			: { invalid_path: P; Type: T }
		: P extends `${number}`
		? NonNullable<T> extends (infer U)[]
			? U
			: { invalid_path: P; Type: T }
		: P extends keyof NonNullable<T>
		? NonNullable<T>[P]
		: P extends `${number}`
		? NonNullable<T> extends (infer U)[]
			? U
			: { invalid_path: P; Type: T }
		: { invalid_path: P; Type: T }
	: P extends ""
	? T
	: { invalid_path: P; Type: T };
