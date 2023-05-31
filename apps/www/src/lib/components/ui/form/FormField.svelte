<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { StringPathLeaves, UnwrapEffects } from "sveltekit-superforms";
	import type { SuperForm } from "sveltekit-superforms/client";
	import type { AnyZodObject, boolean, z } from "zod";
	import { getContext, setContext } from "svelte/internal";
	import { writable } from "svelte/store";
	import { formFieldProxy } from "sveltekit-superforms/client";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<UnwrapEffects<T>, unknown> = getContext("form");
	export let name: string & StringPathLeaves<z.infer<T>>;
	export let id: string | null | undefined = String(name);
	export let checkbox: boolean = false;

	setContext("id", id);

	const { path, value, errors, constraints } = formFieldProxy(form, name);

	type FormField = {
		id: string | undefined | null;
		"aria-describedby": string | undefined | null;
		"aria-invalid": boolean;
		constraints: typeof $constraints;
		errors: typeof $errors;
		name: string & StringPathLeaves<z.infer<T>>;
		value?: typeof $value;
		checked?: boolean;
	};

	let field: FormField = {
		id,
		"aria-describedby": !errors ? name : `${String(path)} ${errors}`,
		"aria-invalid": !!errors,
		constraints: $constraints,
		errors: $errors,
		name
	};

	let boolVal: Writable<boolean>;

	$: if (checkbox) {
		boolVal = value as Writable<boolean>;

		field = {
			...field,
			checked: $boolVal
		};
	} else {
		field = {
			...field,
			value: $value
		};
	}
</script>

<div class={cn("grid gap-2", className)} {...$$restProps}>
	<slot {...$$restProps} {field} />
</div>
