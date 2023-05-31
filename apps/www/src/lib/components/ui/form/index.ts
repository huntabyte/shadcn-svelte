import type { Writable } from "svelte/store";
import type { SuperForm } from "sveltekit-superforms/client";
import type { StringPathType } from "sveltekit-superforms/dist/stringPath";
import type {
	InputConstraint,
	StringPathLeaves,
	UnwrapEffects,
	ZodValidation
} from "sveltekit-superforms/index";
import type { AnyZodObject, z } from "zod";
import { setContext } from "svelte";
import { formFieldProxy } from "sveltekit-superforms/client";

export { default as Form } from "./Form.svelte";
export { default as FormField } from "./FormField.svelte";
export { default as FormLabel } from "./FormLabel.svelte";
export { default as FormMessage } from "./FormMessage.svelte";
export { default as FormInput } from "./FormInput.svelte";

type SuperFormField<
	T extends ZodValidation<AnyZodObject>,
	Path extends string & StringPathLeaves<z.infer<UnwrapEffects<T>>>
> = {
	id: string | undefined | null;
	"aria-describedby": string | undefined | null;
	"aria-invalid": boolean;
	"aria-required": boolean;
	constraints: InputConstraint | undefined;
	errors: string[] | undefined;
	name: string & StringPathLeaves<z.infer<T>>;
	value?: Writable<StringPathType<z.infer<UnwrapEffects<T>>, Path>>;
	checked?: Writable<boolean>;
};

type SuperFormFieldParams<T extends ZodValidation<AnyZodObject>> = {
	id: string | undefined | null;
	constraints: InputConstraint | undefined;
	errors: string[] | undefined;
	name: string & StringPathLeaves<z.infer<T>>;
	value?: StringPathType<
		z.TypeOf<UnwrapEffects<UnwrapEffects<T>>>,
		string & StringPathLeaves<z.TypeOf<T>>
	>;
	checkbox?: boolean;
};

export type ErrorsContext = Writable<string[] | undefined>;

export type SuperFormUnwrap<T, U = unknown> = SuperForm<UnwrapEffects<T>, U>;

export type SuperFormPath<T extends AnyZodObject> = string &
	StringPathLeaves<z.infer<T>>;

export function superFormFieldProxy<
	T extends ZodValidation<AnyZodObject>,
	Path extends string & StringPathLeaves<z.infer<UnwrapEffects<T>>>
>(form: SuperForm<T, unknown>, name: Path) {
	const { value, errors, constraints, path } = formFieldProxy(form, name);
	setContext("errors", errors);

	return {
		value,
		errors,
		constraints,
		path
	};
}

export function superFormField(
	opts: SuperFormFieldParams<AnyZodObject>
): SuperFormField<AnyZodObject, (typeof opts)["name"]> {
	const { id, constraints, errors, name, value } = opts;
	setContext("id", id);

	return {
		id,
		"aria-describedby": !errors ? name : `${name} ${errors}`,
		"aria-invalid": !!errors,
		"aria-required": !!constraints?.required,
		constraints,
		errors,
		name,
		value
	};
}
