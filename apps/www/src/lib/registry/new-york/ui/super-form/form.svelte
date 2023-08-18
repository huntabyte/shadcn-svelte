<script lang="ts" context="module">
	import type { UnwrapEffects, ZodValidation } from "sveltekit-superforms";
	import type { AnyZodObject } from "zod";

	type Validation = ZodValidation<AnyZodObject>;
	type T = Validation;
	type M = unknown;
</script>

<script lang="ts" generics="T extends Validation = Validation, M = any">
	import { superForm, type FormOptions } from "sveltekit-superforms/client";
	import type { HTMLFormAttributes } from "svelte/elements";

	import type { SuperValidated } from "sveltekit-superforms";

	type Options<T, M> = FormOptions<UnwrapEffects<T>, M>;
	type $$Props = HTMLFormAttributes & {
		schema: T;
		options?: Options<T, M>;
		data: SuperValidated<T, M>;
	};

	export let schema: T;
	export let data: SuperValidated<T, M>;
	export let options: Options<typeof data, M> = {
		validators: schema,
		taintedMessage: null
	};

	const form = superForm(data, options);
	const { enhance, form: formStore } = form;

	const field = {
		form,
		schema
	};
</script>

<form {...$$restProps} use:enhance>
	<slot form={field} formValues={$formStore} formStore={form.form} />
</form>
