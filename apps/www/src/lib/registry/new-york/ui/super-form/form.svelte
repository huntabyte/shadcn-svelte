<script lang="ts" context="module">
	import { superForm, type FormOptions } from "sveltekit-superforms/client";

	import type {
		UnwrapEffects,
		Validators,
		ZodValidation
	} from "sveltekit-superforms";
	import type { AnyZodObject } from "zod";

	type Validation = ZodValidation<AnyZodObject>;
	type Options<T, M> = FormOptions<UnwrapEffects<T>, M>;
</script>

<script lang="ts" generics="T extends Validation = Validation, M = any">
	import { setContext } from "svelte";
	import type { SuperValidated } from "sveltekit-superforms";

	export let schema: T;
	export let data: SuperValidated<T, M>;
	export let options: Options<typeof data, M> = {
		validators: schema,
		taintedMessage: null
	};
	const form = superForm(data, options);
	setContext("Form", form);

	const { form: formStore } = form;
</script>

<slot form={$formStore} />
