import type { StringPathType } from "sveltekit-superforms/dist/stringPath";
import type {
	InputConstraint,
	StringPathLeaves,
	UnwrapEffects,
	ZodValidation
} from "sveltekit-superforms/index";
import type { AnyZodObject, z } from "zod";
import { setContext } from "svelte";

export { default as Form } from "./Form.svelte";
export { default as FormField } from "./FormField.svelte";
export { default as FormLabel } from "./FormLabel.svelte";

type SuperFormField<T extends ZodValidation<AnyZodObject>> = {
	id: string | undefined | null;
	"aria-describedby": string | undefined | null;
	"aria-invalid": boolean;
	"aria-required": boolean;
	constraints: InputConstraint | undefined;
	errors: string[] | undefined;
	name: string & StringPathLeaves<z.infer<T>>;
	value?: StringPathType<
		z.TypeOf<UnwrapEffects<UnwrapEffects<T>>>,
		string & StringPathLeaves<z.TypeOf<T>>
	>;
	checked?: boolean;
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

export function superFormField(
	opts: SuperFormFieldParams<AnyZodObject>
): SuperFormField<AnyZodObject> {
	const { id, constraints, errors, name, value, checkbox } = opts;

	setContext("id", id);

	let superField: SuperFormField<AnyZodObject> = {
		id,
		"aria-describedby": !errors ? name : `${name} ${errors}`,
		"aria-invalid": !!errors,
		"aria-required": !!constraints?.required,
		constraints,
		errors,
		name
	};

	if (checkbox) {
		return {
			...superField,
			checked: value as boolean
		};
	}
	return {
		...superField,
		value
	};
}
