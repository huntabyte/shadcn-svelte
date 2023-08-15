<script lang="ts" context="module">
	type Validation = ZodValidation<AnyZodObject>;
</script>

<script lang="ts" generics="T extends Validation">
	import { cn } from "@/utils";
	import { setContext } from "svelte";
	import type {
		FormPathLeaves,
		UnwrapEffects,
		ZodValidation
	} from "sveltekit-superforms";
	import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";
	import type { AnyZodObject, z } from "zod";
	let className: string | undefined | null = undefined;
	export { className as class };

	const id = Math.random().toString(36).slice(2);
	type FormField = {
		schema: T;
		form: SuperForm<T, unknown>;
	};

	export let form: FormField;
	export let name: FormPathLeaves<z.infer<UnwrapEffects<T>>>;

	const { path, value, errors } = formFieldProxy(form.form, name);

	const contextObj = {
		formItemId: id,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		name
	};
	setContext("FormField", contextObj);

	type InputEvent = Event & {
		currentTarget: HTMLInputElement;
	};

	$: field = {
		attrs: {
			"aria-invalid": errors ? true : undefined,
			"aria-describedby": !errors
				? `${contextObj.formDescriptionId}`
				: `${contextObj.formDescriptionId} ${contextObj.formMessageId}`,
			name,
			id,
			value: $value
		},
		valueStore: value,
		update: (next: typeof $value) => {
			value.set(next);
		}
	};
</script>

<div class={cn("space-y-2", className)}>
	<slot {field} />
</div>
