<script lang="ts">
	import { isBrowser } from "@/utils";

	import type { FormFieldCtx } from ".";

	import { getContext, onMount, setContext, tick } from "svelte";
	import { derived } from "svelte/store";
	import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";
	import type { z, AnyZodObject } from "zod";
	import type { ZodValidation, FormPathLeaves } from "sveltekit-superforms";

	type T = $$Generic<AnyZodObject>;

	const form = getContext<SuperForm<ZodValidation<T>, unknown>>("Form");
	export let name: FormPathLeaves<z.infer<T>>;

	const { value, errors, constraints } = formFieldProxy(form, name);
	const id = Math.random().toString(36).slice(2);

	const field = derived(
		[value, errors, constraints],
		([$value, $errors, $constraints]) => ({
			id: `${id}-form-item`,
			name,
			value: $value,
			errors: $errors,
			constraints: $constraints,
			"aria-invalid": $errors ? true : undefined
		})
	);

	$: fieldWithListeners = () => {
		if (isBrowser) {
			tick().then(() => {
				const el = document.getElementById(`${id}-form-item`);
				if (!el) return;
				const cb = (e: Event) => {
					const target = e.target as HTMLInputElement;
					value.set(target.value as any);
				};
				el.addEventListener("keydown", cb);
				el.addEventListener("keyup", cb);
				el.addEventListener("change", cb);
			});
		}
		return {
			...$field,
			value: $value
		};
	};

	setContext<FormFieldCtx>("FormField", {
		name,
		formItemId: `${id}-form-item`,
		formMessageId: `${id}-form-item-message`,
		formDescriptionId: `${id}-form-item-description`,
		errors
	});
</script>

<slot field={fieldWithListeners} />
