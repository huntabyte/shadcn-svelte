<script lang="ts">
	import type { StringPathLeaves, UnwrapEffects } from "sveltekit-superforms";
	import type { SuperForm } from "sveltekit-superforms/client";
	import type { AnyZodObject, z } from "zod";
	import { getContext } from "svelte/internal";
	import { formFieldProxy } from "sveltekit-superforms/client";
	import { cn } from "$lib/utils";
	import { superFormField } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<UnwrapEffects<T>, unknown> = getContext("form");
	export let name: string & StringPathLeaves<z.infer<T>>;
	export let id: string | null | undefined = String(name);
	export let checkbox: boolean = false;

	const { value, errors, constraints } = formFieldProxy(form, name);

	$: field = superFormField({
		id,
		name,
		errors: $errors,
		constraints: $constraints,
		value: $value,
		checkbox
	});
</script>

<div class={cn("grid gap-2", className)} {...$$restProps}>
	<slot {...$$restProps} {field} />
</div>
