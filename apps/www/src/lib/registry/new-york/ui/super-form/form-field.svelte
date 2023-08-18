<script lang="ts">
	import { createFormField } from ".";
	import type { Form, FormFieldName } from "./types";
	import type { AnyZodObject } from "zod";
	import { cn } from "@/utils";
	let className: string | undefined | null = undefined;
	export { className as class };

	type T = $$Generic<AnyZodObject>;
	type Path = $$Generic<FormFieldName<T>>;

	export let form: Form<T>;
	export let name: Path;

	const {
		stores: { errors, value },
		getFieldAttrs
	} = createFormField<T, Path>(form, name);

	$: field = {
		attrs: getFieldAttrs($value, $errors),
		updateValue: (v: unknown) => {
			//@ts-expect-error - do we leave this as is, or do we want to force the type to match the schema?
			// Pros: we don't have to deal with type coercion in the form, and since we're runtime validating with
			// zod anyway, we aren't _really_ losing type safety.
			value.set(v);
		},
		handleInput: (
			e: Event & {
				currentTarget:
					| HTMLInputElement
					| HTMLTextAreaElement
					| HTMLSelectElement;
			}
		) => {
			field.updateValue(e.currentTarget.value);
		}
	};
</script>

<div class={cn("space-y-2", className)} {...$$restProps}>
	<slot {field} />
</div>
