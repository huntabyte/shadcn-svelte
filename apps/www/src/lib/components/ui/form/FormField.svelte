<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

	import type { SuperForm } from "sveltekit-superforms/client";
	import type { AnyZodObject } from "zod";
	import type { SuperFormPath } from ".";
	import { cn } from "$lib/utils";
	import { superFormField, superFormFieldProxy } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<T>;
	export let name: SuperFormPath<T>;
	export let id: string | null | undefined = String(name);
	export let tag = "div";

	const { value, errors, constraints } = superFormFieldProxy(form, name);

	$: field = superFormField({
		id,
		name,
		errors: $errors,
		constraints: $constraints,
		value
	});
</script>

<svelte:element this={tag} class={cn("grid gap-2", className)} {...$$restProps}>
	<slot {...$$restProps} {field} />
</svelte:element>
